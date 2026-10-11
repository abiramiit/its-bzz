import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-24 pointer-events-auto px-6 md:px-0 flex justify-center">
            <div className="w-full max-w-md bg-[#1a1a1a]/80 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur border border-[#333]">
                <h4 className="text-[10px] font-bold tracking-widest text-[#aaa] uppercase mb-6">04 / PROCESS</h4>

                <div className="flex flex-col gap-6">
                    {['DISCOVER', 'PLAN', 'DESIGN', 'BUILD', 'LAUNCH'].map((step, i) => (
                        <div key={i} className="flex gap-4 items-center group">
                            <span className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-[#B8FF3D] transition-colors">{i + 1}</span>
                            <span className="text-sm md:text-base font-bold tracking-widest text-white">{step}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
