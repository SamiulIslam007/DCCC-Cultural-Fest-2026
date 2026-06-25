"use client";

import React from "react";

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative h-full pt-14 md:pt-0 h-dvh w-full flex flex-col items-center justify-center overflow-hidden bg-[#070707]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(200,150,62,0.12)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl mx-auto h-full pt-16 md:pt-24 pb-8">
        <p className="text-[10px] sm:text-xs font-black tracking-[0.4em] text-[#C8963E] uppercase mb-3 md:mb-4 drop-shadow-[0_0_8px_rgba(200,150,62,0.3)]">
          DCCC PRESENTS
        </p>

        <div className="flex flex-col items-center mb-4 md:mb-6 select-none">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tight flex items-start leading-none mb-1 md:mb-2">
            4
            <span className="text-lg sm:text-2xl md:text-3xl text-[#C8963E] font-extrabold tracking-normal pt-1 sm:pt-4 ml-0.5 sm:ml-1">
              TH
            </span>
          </h1>

          <h2 className="text-2xl sm:text-5xl md:text-6xl font-black text-white tracking-wide max-w-3xl leading-[1.1] uppercase">
            DCCC National Cultural Fiesta
          </h2>

          <p className="text-xs sm:text-base md:text-lg font-bold tracking-[0.6em] text-[#C8963E] uppercase mt-2 md:mt-3 pl-[0.6em]">
            2 0 2 6
          </p>
        </div>

        <div className="flex items-center gap-4 mb-5 md:mb-8 opacity-70">
          <span className="w-10 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C8963E]" />
          <div className="flex gap-1.5 items-center">
            <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#C8963E] rotate-45 block" />
            <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-[#C8963E] rotate-45 block" />
            <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#C8963E] rotate-45 block" />
          </div>
          <span className="w-10 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C8963E]" />
        </div>

        <p className="text-white/50 text-[11px] sm:text-sm md:text-base italic max-w-2xl leading-relaxed mb-6 md:mb-10 font-light px-2 sm:px-4">
          Theme: &ldquo;Awakening Cultural Consciousness, Celebrating Heritage,
          and Igniting Youth Talents&rdquo;
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 bg-neutral-950/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl sm:rounded-full p-1.5 w-full max-w-[320px] sm:max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-white/15 mb-6 md:mb-8">
          <div className="flex items-center gap-3.5 px-4 sm:px-6 py-2 sm:py-3 flex-1 w-full justify-start rounded-full hover:bg-white/[0.03] transition-all duration-300 group cursor-pointer">
            <div className="text-[#C8963E] bg-[#C8963E]/10 p-2 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C8963E]/20 shadow-inner">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>

            <div className="text-left flex flex-col justify-center">
              <p className="text-[8px] sm:text-[9px] font-extrabold tracking-[0.15em] text-white/40 uppercase transition-colors duration-300 group-hover:text-white/60">
                EVENT DATE
              </p>
              <p className="text-white font-semibold text-xs sm:text-base tracking-wide mt-0.5">
                07 – 14 September 2026
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 sm:gap-4 justify-center w-full max-w-[280px] sm:max-w-sm">
          <a
            href="#segments"
            className="px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-black tracking-wider text-black bg-[#C8963E] rounded-full hover:bg-[#b08232] transition-all duration-300 shadow-[0_4px_20px_rgba(200,150,62,0.3)] flex-1 uppercase text-center whitespace-nowrap"
          >
            Explore
          </a>
          <a
            href="/register"
            className="px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-black tracking-wider text-white bg-transparent border border-white/20 rounded-full hover:border-white/60 hover:bg-white/[0.03] transition-all duration-300 flex-1 uppercase text-center whitespace-nowrap"
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
};
