import React, { useRef, useEffect } from 'react';
import Car3D from './Car3D';

const RoadLayer = () => {
    const canvasRef = useRef(null);

    // Canvas particle system for cinematic volumetric smoke
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        let lastCarPos = { x: 0, y: 0 };

        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor(x, y, dx, dy, carWidth) {
                this.x = x;
                this.y = y;
                // Add soft random turbulence to velocity
                this.dx = dx * 0.8 + (Math.random() - 0.5) * 5;
                this.dy = dy * 0.5 + (Math.random() - 0.2) * 2 - 1; // rise naturally
                this.life = 1.0;
                this.maxLife = Math.random() * 0.5 + 0.5; // varied lifespans

                // Base size scales with the proxy car size
                const baseSize = carWidth * 0.25;
                this.size = Math.random() * baseSize + baseSize * 0.5;
                this.growthRate = Math.random() * 2.0 + 1.5;

                // Add a subtle rotation or alpha variance
                this.alphaMultiplier = Math.random() * 0.3 + 0.15; // low opacity smoke
            }
            update() {
                this.x += this.dx;
                this.y -= this.dy; // move up slightly
                this.size += this.growthRate;

                // Drag / air friction
                this.dx *= 0.96;
                this.dy *= 0.98;

                this.life -= 0.008; // smooth slow fade
            }
            draw(ctx) {
                if (this.life <= 0) return;
                ctx.save();

                // Ease out opacity curve
                const progress = this.life / this.maxLife;
                const easeAlpha = progress * progress * progress; // ease out cubic

                ctx.globalAlpha = Math.max(0, easeAlpha * this.alphaMultiplier);
                ctx.globalCompositeOperation = 'screen';

                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
                gradient.addColorStop(0, 'rgba(200, 220, 255, 0.6)');
                gradient.addColorStop(0.5, 'rgba(150, 180, 220, 0.2)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        const render = () => {
            // Slight clear to allow trailing but mostly clean buffer
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const car = document.querySelector('.safari-car');
            if (car) {
                const containerRect = canvas.parentElement.getBoundingClientRect();
                const carRect = car.getBoundingClientRect();

                // Smoke emitted from the rear-lower portion of the tires
                const emitX = carRect.left - containerRect.left + carRect.width * 0.1;
                const emitY = carRect.top - containerRect.top + carRect.height * 0.8;

                const dist = Math.hypot(emitX - lastCarPos.x, emitY - lastCarPos.y);
                if (dist > 2) {
                    // Velocity opposite to movement
                    const vx = -((emitX - lastCarPos.x) * 0.3);
                    const vy = -((emitY - lastCarPos.y) * 0.3);

                    // High density particles for volumetric feel
                    const amount = Math.min(Math.floor(dist * 0.8) + 2, 12);
                    for (let i = 0; i < amount; i++) {
                        particles.push(new Particle(emitX, emitY, vx, vy, carRect.width));
                    }
                    lastCarPos = { x: emitX, y: emitY };
                }
            }

            particles = particles.filter(p => p.life > 0);
            particles.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        }
    }, []);

    return (
        <div className="w-full h-full relative pointer-events-none isolate">
            {/* CANVAS FOR REAL-TIME SMOKE PARTICLES */}
            <canvas ref={canvasRef} className="absolute inset-0 z-40 w-full h-full pointer-events-none mix-blend-screen opacity-90" />

            {/* THE CAR PROXY - 3D CANVAS INJECTED WITHIN */}
            <div
                className="safari-car absolute top-1/2 -translate-y-1/2 left-0 w-[450px] md:w-[650px] h-[220px] md:h-[350px] z-50 pointer-events-none"
            >
                {/* Main 3D render layer */}
                <div className="w-full h-full relative z-10 pointer-events-none">
                    <Car3D />
                </div>

                {/* Refined grounded contact shadow mapping exactly below wheels */}
                <div className="absolute left-1/2 bottom-[10%] w-[75%] h-[20px] bg-black blur-[12px] -translate-x-1/2 rounded-[100%]" />

                {/* Fake floor reflection beneath the car */}
                <div className="absolute left-1/2 bottom-[-15%] w-[85%] h-[40px] bg-gradient-to-t from-transparent to-[rgba(255,255,255,0.02)] blur-[8px] -translate-x-1/2 rounded-[100%]" />

                {/* Cinematic Headlight glows */}
                <div className="absolute right-[-5%] top-[45%] w-[120px] h-[25%] bg-[#eef6ff] rounded-full blur-[35px] opacity-40 mix-blend-screen" />

                {/* Volumetric Headlight beams */}
                <div className="absolute left-[90%] top-[45%] w-[800px] h-[80px] bg-gradient-to-r from-[rgba(200,230,255,0.15)] via-[rgba(200,230,255,0.05)] to-transparent blur-[20px] transform -translate-y-1/2 rotate-3 origin-left mix-blend-screen" />
            </div>

            {/* Optional atmospheric grading plane covering the very bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />
        </div>
    );
};

export default RoadLayer;
