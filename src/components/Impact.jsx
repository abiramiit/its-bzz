import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Impact = () => {
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
            <div className="w-full max-w-lg bg-[#1a1a1a]/80 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur border border-[#333]">
                <h4 className="text-[10px] font-bold tracking-widest text-[#aaa] uppercase mb-4 bg-[#1a1a1a]/50 inline-block px-3 py-1 rounded-full">05 / IMPACT</h4>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-[#1a1a1a] p-5 shadow-lg rounded-xl border border-[#333]">
                        <div className="text-3xl font-extrabold text-[#B8FF3D]">58%</div>
                        <div className="text-[10px] font-bold text-[#aaa] uppercase mt-2">Increase in pick up point use</div>
                    </div>
                    <div className="bg-[#111] p-5 shadow-lg rounded-xl border border-[#333]">
                        <div className="text-3xl font-extrabold text-[#57B5D4]">23%</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase mt-2">Decreased in customer phone calls</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Impact;
