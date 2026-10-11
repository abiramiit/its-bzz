import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Stats = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Create an Intersection Observer to detect when stats enter view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                gsap.to('.stat-item', {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                });
                observer.disconnect();
            }
        }, { threshold: 0.2 });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const statsList = [
        { value: '100%', label: 'SMOOTH MOTION', desc: 'Scroll-linked animation experience' },
        { value: '60 FPS', label: 'PERFORMANCE', desc: 'Transform-driven visual rendering' },
        { value: '3X', label: 'INTERACTION', desc: 'Dynamic scroll styling storytelling' }
    ];

    return (
        <div ref={containerRef} className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-8">
            {statsList.map((stat, i) => (
                <div key={i} className="stat-item translate-y-12 opacity-0 flex flex-col gap-2">
                    <div className="text-5xl md:text-6xl font-light tracking-tighter text-white">
                        {stat.value}
                    </div>
                    <div className="text-sm font-bold tracking-[0.2em] text-white/80 mt-2">
                        {stat.label}
                    </div>
                    <div className="text-sm text-white/50 max-w-[200px] leading-relaxed">
                        {stat.desc}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Stats;
