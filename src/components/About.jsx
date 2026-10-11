import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
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
                    start: "top 80%", // triggers when top of element hits 80% of viewport
                    end: "top 50%",
                    scrub: 1
                }
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-24 pointer-events-auto px-6 md:px-0 flex justify-center">
            <div className="max-w-xl w-full bg-[#1a1a1a]/80 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur border border-[#333]">
                <h4 className="text-[10px] font-bold tracking-widest text-[#aaa] uppercase mb-4">01 / ABOUT</h4>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white">
                    WE CREATE <br /> DIGITAL <span className="text-[#3157FF]">MOMENTUM.</span>
                </h2>
                <p className="text-[#aaa] text-lg leading-relaxed">
                    We create digital experiences that combine thoughtful design, strong engineering and meaningful interaction.
                </p>
            </div>

        </section>
    );
};

export default About;
