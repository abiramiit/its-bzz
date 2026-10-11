import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { engineAudio } from './utils/engineAudio';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Work from './components/Work';
import Process from './components/Process';
import Impact from './components/Impact';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);

  useEffect(() => {
    // 1. Setup Audio Interaction (Run once)
    const handleFirstInteraction = () => {
      engineAudio.init();
      // Only remove if we successfully started
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      engineAudio.cleanup();
    };
  }, []);

  useEffect(() => {
    // Lenis momentum smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Scroll section indicator
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const p = scrollY / docHeight;
      let nextSection = 0;
      if (p > 0.85) nextSection = 6;
      else if (p > 0.70) nextSection = 5;
      else if (p > 0.55) nextSection = 4;
      else if (p > 0.40) nextSection = 3;
      else if (p > 0.25) nextSection = 2;
      else if (p > 0.1) nextSection = 1;
      setActiveSection((prev) => (prev !== nextSection ? nextSection : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMute = () => {
    engineAudio.toggleMute();
    setIsMuted(engineAudio.isMuted);
  };

  const navItems = ['Hero', 'About', 'Services', 'Work', 'Process', 'Impact', 'Contact'];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-x-hidden font-sans bg-black">
      {/* The scroll wrapper defines the scrollable height natively from content. */}
      <div
        ref={scrollWrapperRef}
        className="w-full relative mx-auto max-w-[1440px]"
      >
        {/* CONTENT LAYER (Layer 2) - Masked by the linear CSS property */}
        <div className="content-reveal-layer relative z-10 w-full">
          <Hero />
          <About />
          <Services />
          <Work />
          <Process />
          <Impact />
          <Contact />
        </div>
      </div>

      {/* FIXED NAV */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <Navbar />
      </div>

      {/* AUDIO MUTE TOGGLE */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 bg-[#111] border border-[#333] text-white p-3 rounded-full shadow-[0_0_15px_rgba(49,87,255,0.2)] hover:bg-[#222] transition-colors pointer-events-auto flex items-center justify-center w-12 h-12"
        aria-label="Toggle Engine Sound"
      >
        {isMuted ? (
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h2.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
        ) : (
          <svg className="w-5 h-5 text-[#B8FF3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h2.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
        )}
      </button>

      {/* SECTION NAV INDICATOR */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none bg-[#111] p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-[#333] flex items-center justify-center">
        <div className="text-[10px] font-bold tracking-widest text-[#FFF]">
          {activeSection + 1 < 10 ? `0${activeSection + 1}` : activeSection + 1} / 07 <br />
          <span className="text-[#3157FF] drop-shadow-[0_0_5px_rgba(49,87,255,0.8)]">{navItems[activeSection]}</span>
        </div>
      </div>

    </div>
  )
}

export default App;

