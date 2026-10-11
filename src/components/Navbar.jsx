import React from 'react';

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 pointer-events-none px-6 py-8 transition-all duration-500">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* Brand */}
                <div className="font-extrabold text-xl tracking-tight text-white pointer-events-auto cursor-pointer flex items-center gap-3">
                    ITZ FIZZ<sup className="text-[10px] font-semibold -mt-3">®</sup>
                </div>

                {/* Sub-Brand Indicator (Desktop) */}
                <div className="hidden lg:flex items-center gap-2 bg-[#1a1a1a]/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#333] pointer-events-auto shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#B8FF3D] animate-pulse"></span>
                    <span className="text-[10px] font-bold tracking-widest text-[#aaa] uppercase">Digital Technology Studio</span>
                </div>

                {/* Links */}
                <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-semibold tracking-wider text-white uppercase pointer-events-auto">
                    <a href="#work" className="relative group overflow-hidden">
                        WORK
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#3157FF] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                    </a>
                    <a href="#capabilities" className="relative group overflow-hidden">
                        CAPABILITIES
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#3157FF] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                    </a>
                    <a href="#about" className="relative group overflow-hidden">
                        ABOUT
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#3157FF] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                    </a>
                    <a href="#contact" className="relative group overflow-hidden">
                        CONTACT
                        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#3157FF] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></span>
                    </a>
                </nav>

            </div>
        </header>
    );
}

export default Navbar;
