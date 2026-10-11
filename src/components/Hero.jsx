import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Car3D from './Car3D';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const roadRef = useRef(null);
    const carRef = useRef(null);
    const trailRef = useRef(null);
    const valueTextRef = useRef(null);

    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);
    const box4Ref = useRef(null);

    const timelineRef = useRef(null);

    const headlineText = "WELCOME ITZFIZZ";

    const initAnimation = useCallback(() => {
        if (!sectionRef.current || !carRef.current || !trailRef.current || !valueTextRef.current) return;

        // Clean up previous timeline if exists
        if (timelineRef.current) {
            timelineRef.current.kill();
            if (timelineRef.current.scrollTrigger) {
                timelineRef.current.scrollTrigger.kill();
            }
        }

        const car = carRef.current;
        const trail = trailRef.current;
        const valueAdd = valueTextRef.current;
        const letters = gsap.utils.toArray('.value-letter', valueAdd);

        const roadWidth = roadRef.current.clientWidth || window.innerWidth;
        const carWidth = car.clientWidth || 550;
        // Keep full car visible near the right edge without clipping
        const endX = Math.max(roadWidth - carWidth, 100);

        // Precompute letter offsets relative to road container
        const baseLeft = valueAdd.offsetLeft;
        const letterPositions = letters.map((letter) => baseLeft + letter.offsetLeft);

        const box1 = box1Ref.current;
        const box2 = box2Ref.current;
        const box3 = box3Ref.current;
        const box4 = box4Ref.current;

        // Reset elements initial state
        gsap.set(car, { x: 0 });
        gsap.set(trail, { width: 0 });
        letters.forEach((l) => (l.style.opacity = '0'));
        if (box1) gsap.set(box1, { opacity: 0, y: 30 });
        if (box2) gsap.set(box2, { opacity: 0, y: -30 });
        if (box3) gsap.set(box3, { opacity: 0, y: 30 });
        if (box4) gsap.set(box4, { opacity: 0, y: -30 });

        // Single GSAP ScrollTrigger timeline with scrub: 1 over pinned 2500px scroll range
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=2500',
                scrub: 1,
                pin: trackRef.current,
                pinSpacing: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const currentX = gsap.getProperty(car, 'x') || 0;
                    // Reveal letters as the front/center of the car reaches them
                    const carRevealX = currentX + carWidth * 0.45;

                    letters.forEach((letter, i) => {
                        letter.style.opacity = carRevealX >= letterPositions[i] ? '1' : '0';
                    });
                },
            },
        });

        // 1. Synchronized Car and Trail movement in lockstep on the exact same frame
        tl.to(car, {
            x: endX,
            ease: 'none',
            duration: 1,
        }, 0);

        tl.to(trail, {
            width: endX + carWidth * 0.35,
            ease: 'none',
            duration: 1,
        }, 0);

        // 2. Stat boxes progressive reveals within the same normalized timeline
        if (box1) {
            tl.to(box1, { opacity: 1, y: 0, duration: 0.15, ease: 'power1.out' }, 0.20);
        }
        if (box2) {
            tl.to(box2, { opacity: 1, y: 0, duration: 0.15, ease: 'power1.out' }, 0.40);
        }
        if (box3) {
            tl.to(box3, { opacity: 1, y: 0, duration: 0.15, ease: 'power1.out' }, 0.60);
        }
        if (box4) {
            tl.to(box4, { opacity: 1, y: 0, duration: 0.15, ease: 'power1.out' }, 0.80);
        }

        timelineRef.current = tl;
    }, []);

    useEffect(() => {
        initAnimation();

        const handleResize = () => {
            initAnimation();
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (timelineRef.current) {
                if (timelineRef.current.scrollTrigger) {
                    timelineRef.current.scrollTrigger.kill();
                }
                timelineRef.current.kill();
            }
        };
    }, [initAnimation]);

    const handleModelLoaded = () => {
        // Refresh ScrollTrigger and recalculate once 3D asset is fully ready
        initAnimation();
        ScrollTrigger.refresh();
    };

    return (
        <section ref={sectionRef} className="car-scroll-section relative w-full h-[200vh] bg-[#050505]">
            {/* PINNED TRACK CONTAINER */}
            <div
                ref={trackRef}
                className="car-track relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505] select-none"
            >
                {/* STUDIO BADGE / TOP SUBTITLE */}
                <div className="absolute top-[8vh] flex flex-col items-center z-20">
                    <span className="text-[11px] tracking-[0.3em] font-semibold text-[#888] uppercase border border-[#222] px-5 py-1.5 rounded-full bg-black/60 backdrop-blur-md">
                        ITZ FIZZ • DIGITAL TECHNOLOGY STUDIO
                    </span>
                </div>

                {/* 4 PROGRESSIVE STATISTIC BOXES (Matching Reference) */}
                {/* Box 1 (Top Left-Center): 58% Increase */}
                <div
                    ref={box1Ref}
                    className="absolute top-[12vh] right-[32vw] z-20 bg-[#def54f] text-[#111] p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-1 max-w-[260px] pointer-events-auto opacity-0"
                >
                    <span className="text-4xl md:text-5xl font-black tracking-tight leading-none">58%</span>
                    <span className="text-xs md:text-sm font-semibold text-[#222] leading-snug">Increase in pick up point use</span>
                </div>

                {/* Box 2 (Bottom Left-Center): 23% Decreased */}
                <div
                    ref={box2Ref}
                    className="absolute bottom-[12vh] right-[36vw] z-20 bg-[#6ac9ff] text-[#111] p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-1 max-w-[260px] pointer-events-auto opacity-0"
                >
                    <span className="text-4xl md:text-5xl font-black tracking-tight leading-none">23%</span>
                    <span className="text-xs md:text-sm font-semibold text-[#222] leading-snug">Decreased in customer phone calls</span>
                </div>

                {/* Box 3 (Top Right): 27% Increase */}
                <div
                    ref={box3Ref}
                    className="absolute top-[12vh] right-[8vw] z-20 bg-[#222222] text-[#fff] border border-[#333] p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-1 max-w-[260px] pointer-events-auto opacity-0"
                >
                    <span className="text-4xl md:text-5xl font-black tracking-tight leading-none text-white">27%</span>
                    <span className="text-xs md:text-sm font-semibold text-neutral-400 leading-snug">Increase in pick up point use</span>
                </div>

                {/* Box 4 (Bottom Right): 40% Decreased */}
                <div
                    ref={box4Ref}
                    className="absolute bottom-[12vh] right-[10vw] z-20 bg-[#fa7328] text-[#111] p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-1 max-w-[260px] pointer-events-auto opacity-0"
                >
                    <span className="text-4xl md:text-5xl font-black tracking-tight leading-none">40%</span>
                    <span className="text-xs md:text-sm font-semibold text-[#222] leading-snug">Decreased in customer phone calls</span>
                </div>

                {/* HORIZONTAL ROAD STRIP */}
                <div
                    ref={roadRef}
                    className="road-container relative w-full h-[220px] md:h-[260px] bg-[#121212] border-y border-[#262626] overflow-hidden flex items-center"
                >
                    {/* LIGHT GREEN TRAIL FOLLOWING BEHIND THE CAR */}
                    <div
                        ref={trailRef}
                        className="trail absolute top-0 left-0 h-full bg-[#45db7d] z-10 w-0 pointer-events-none shadow-[0_0_40px_rgba(69,219,125,0.4)]"
                    />

                    {/* HEADLINE LETTER BY LETTER REVEAL */}
                    <div
                        ref={valueTextRef}
                        className="value-add absolute left-[4vw] z-20 flex gap-[0.25rem] md:gap-[0.5rem] select-none pointer-events-none font-black text-[9vw] md:text-[6.5vw] leading-none"
                    >
                        {headlineText.split('').map((char, index) => (
                            <span
                                key={index}
                                className="value-letter inline-block text-[#111] opacity-0"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </div>

                    {/* 3D CAR CONTAINER MOVING LEFT TO RIGHT */}
                    <div
                        ref={carRef}
                        className="car-container absolute top-1/2 -translate-y-1/2 left-0 z-30 pointer-events-none will-change-transform transform-gpu w-[340px] sm:w-[460px] md:w-[580px] lg:w-[640px] h-[190px] md:h-[250px]"
                    >
                        <Car3D onLoaded={handleModelLoaded} />
                        {/* Refined grounded contact shadow mapping exactly below wheels */}
                        <div className="absolute left-1/2 bottom-[12%] w-[75%] h-[18px] bg-black blur-[12px] -translate-x-1/2 rounded-[100%]" />
                    </div>
                </div>

                {/* SCROLL HELPER HINT */}
                <div className="absolute bottom-6 flex items-center gap-2 text-neutral-500 text-[11px] uppercase tracking-widest pointer-events-none">
                    <span>Scroll to Drive</span>
                    <span className="inline-block animate-bounce">↓</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
