import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
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
            <div className="w-full max-w-2xl bg-[#1a1a1a]/80 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur border border-[#333]">
                <h4 className="text-[10px] font-bold tracking-widest text-[#aaa] uppercase mb-4 bg-[#1a1a1a]/50 inline-block px-3 py-1 rounded-full">03 / WORK</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {[
                        { title: 'Interactive Web Experience', bg: 'bg-[#B8FF3D]' },
                        { title: 'Digital Product', bg: 'bg-[#111]' },
                        { title: 'Creative Technology', bg: 'bg-[#3157FF]' }
                    ].map((work, i) => (
                        <div key={i} className={`${work.bg} p-6 rounded-2xl shadow-xl border border-white/20 aspect-video flex items-end justify-start ${i === 1 ? 'sm:mt-8' : ''}`}>
                            <h3 className={`text-base font-bold tracking-tight ${work.bg === 'bg-[#B8FF3D]' ? 'text-white' : 'text-white'}`}>{work.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
