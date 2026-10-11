import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
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
            <div className="max-w-xl w-full bg-[#1a1a1a]/80 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur border border-[#333]">
                <h4 className="text-[10px] font-bold tracking-widest text-[#aaa] uppercase mb-4">02 / SERVICES</h4>

                <div className="flex flex-col gap-6 mt-4">
                    {[
                        { id: '01', title: 'Web Development' },
                        { id: '02', title: 'UI / UX Design' },
                        { id: '03', title: 'Interactive Experiences' },
                        { id: '04', title: 'Digital Products' }
                    ].map(srv => (
                        <div key={srv.id} className="flex gap-4 items-start">
                            <span className="text-sm font-bold text-[#3157FF] pt-1">{srv.id}</span>
                            <h3 className="text-xl font-bold tracking-tight text-white">{srv.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
