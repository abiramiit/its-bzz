import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export default function Car3D({ onLoaded }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // 1. Scene Setup
        const scene = new THREE.Scene();

        const width = mountRef.current.clientWidth || 550;
        const height = mountRef.current.clientHeight || 220;
        const aspect = (height > 0 && width > 0) ? (width / height) : (16 / 9);

        // Camera positioned to view the car clearly from side-front
        const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
        camera.position.set(5.5, 1.6, 6.5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;
        mountRef.current.appendChild(renderer.domElement);

        // 2. Clear Lighting so car is clearly visible against black/dark road
        const ambient = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambient);

        // Main spotlight from top-right
        const dirLight = new THREE.DirectionalLight(0xffffff, 3.0);
        dirLight.position.set(5, 7, 5);
        dirLight.castShadow = true;
        scene.add(dirLight);

        // Front fill light directly illuminating the visible side of the car
        const fillLight = new THREE.DirectionalLight(0xffffff, 2.0);
        fillLight.position.set(0, 2, 7);
        scene.add(fillLight);

        // Rear rim light
        const rimLight = new THREE.DirectionalLight(0x88bbff, 1.5);
        rimLight.position.set(-6, 3, -2);
        scene.add(rimLight);

        // 3. Car Loading with local DRACO decoder
        const carGroup = new THREE.Group();
        scene.add(carGroup);

        let wheels = [];
        let bodyMtls = [];

        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(
            '/models/car.glb?v=2',
            (gltf) => {
                const model = gltf.scene;

                // Create a premium metallic silver/grey material that catches the light beautifully
                const bodyMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0x999999, // Lighter silver for better visibility against black
                    metalness: 0.9,
                    roughness: 0.2,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.1
                });

                const glassMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0x000000,
                    metalness: 0.9,
                    roughness: 0.1,
                    transmission: 0.9,
                    transparent: true
                });

                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;

                        const name = child.name.toLowerCase();

                        // Customizing materials based on Ferrari GLB structure
                        if (child.material) {
                            const matName = child.material.name.toLowerCase();
                            if (matName.includes('body')) child.material = bodyMaterial;
                            else if (matName.includes('glass')) child.material = glassMaterial;
                            else child.material.needsUpdate = true;
                        }

                        // Capture wheels for rotation
                        if (name.includes('wheel') || name.includes('rim') || name.includes('tire')) {
                            if (!wheels.includes(child)) {
                                wheels.push(child);
                            }
                        }
                    }
                });

                // Auto-center and normalize scale so it fits the viewport perfectly
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());

                const maxDim = Math.max(size.x, size.y, size.z);
                const idealScale = 4.0 / maxDim; // normalized size
                model.scale.setScalar(idealScale);

                model.position.sub(center.multiplyScalar(idealScale)); // Center at origin

                // Keep ground at y=0
                const groundedBox = new THREE.Box3().setFromObject(model);
                model.position.y -= groundedBox.min.y;

                // Original Ferrari GLB faces Z, rotate to face Right (X axis)
                model.rotation.y = -Math.PI / 2;

                const wrapperGroup = new THREE.Group();
                wrapperGroup.add(model);
                wrapperGroup.position.y = -0.2; // Centered vertically in viewport

                carGroup.add(wrapperGroup);

                if (typeof onLoaded === 'function') {
                    onLoaded();
                }
            },
            undefined,
            (error) => {
                console.error("[DEBUG Car3D] Could not load Ferrari GLTF model:", error);
            }
        );

        // 4. Animation Loop & Physics with Zero Layout Reflows
        let animationId;
        let smoothVelocity = 0;
        let lastX = 0;
        const clock = new THREE.Clock();

        const animate = () => {
            const dt = Math.min(clock.getDelta(), 0.1);

            // Access GSAP transform directly from DOM node memory without getBoundingClientRect
            const proxy = mountRef.current?.closest('.car-container');
            const currentX = proxy?._gsap?.x ? parseFloat(proxy._gsap.x) : 0;
            const targetVelocity = dt > 0.001 ? (currentX - lastX) / (dt * 60) : 0;
            lastX = currentX;

            // Exponential smoothing for silky wheel rolling
            smoothVelocity = THREE.MathUtils.lerp(smoothVelocity, targetVelocity, 0.15);

            // Wheel Rotation
            if (Math.abs(smoothVelocity) > 0.001) {
                wheels.forEach(w => {
                    w.rotation.x -= smoothVelocity * 0.12;
                });
            }

            // Subtle aerodynamic suspension pitch (without jerky vertical bobbing)
            const subtlePitch = THREE.MathUtils.clamp(-smoothVelocity * 0.015, -0.03, 0.03);
            carGroup.rotation.z = THREE.MathUtils.lerp(carGroup.rotation.z, subtlePitch, 0.1);
            carGroup.position.y = 0; // Solidly grounded on road

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };

        animate();

        // 5. Cleanup
        let resizeObserver = new ResizeObserver(() => {
            if (!mountRef.current) return;
            const w = mountRef.current.clientWidth;
            const h = mountRef.current.clientHeight;
            if (w > 0 && h > 0) {
                renderer.setSize(w, h);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            }
        });
        resizeObserver.observe(mountRef.current);

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            scene.clear();
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full pointer-events-none" />;
}
