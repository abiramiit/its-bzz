import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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
                    start: "top 90%",
                    end: "top 70%",
                    scrub: 1
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-32 pointer-events-auto px-6 md:px-0 text-center flex flex-col items-center">

            <h4 className="text-[10px] font-bold tracking-widest text-[#aaa] uppercase mb-4 bg-[#1a1a1a]/50 inline-block px-3 py-1 rounded-full">06 / CONTACT</h4>

            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-8 text-white">
                LET'S BUILD <br /><span className="text-[#3157FF]">SOMETHING.</span>
            </h2>

            <button className="bg-[#111] text-white px-8 py-4 font-bold text-xs tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-4 group">
                START A PROJECT
                <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>

            <div className="flex gap-8 mt-12 text-[#aaa] text-xs font-bold tracking-widest uppercase">
                <a href="#" className="hover:text-white transition-colors">Email</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
            </div>

        </section>
    );
};

export default Contact;
