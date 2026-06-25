"use client";

import React from "react";
import Image from "next/image";

export const VenueSection: React.FC = () => {
  return (
    <section id="venue" className="w-full bg-[#0d0d0d] py-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-16">
        {/* Left: Text */}
        <div className="flex flex-col flex-1 text-left">
          <span className="text-[10px] font-bold tracking-[0.35em] text-[#C8963E] uppercase mb-4">
            Event Location
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            Official Venue
          </h2>
          <div className="w-12 h-[2px] bg-[#C8963E]/50 mb-8" />

          {/* Venue card */}
          <div className="flex items-start gap-4 border border-white/10 bg-white/[0.02] p-5 mb-8 hover:border-white/20 transition-colors">
            <div className="flex items-center justify-center w-10 h-10 shrink-0 border border-[#C8963E]/30 text-[#C8963E]">
              <svg
                className="w-4.5 h-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-white font-black text-base tracking-wide mb-1">
                Dhaka College
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                Mirpur Rd, Dhanmondi, Dhaka 1205, Bangladesh
              </p>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Dhaka+College+Dhaka+Bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#C8963E]/60 text-[#C8963E] text-[11px] font-black tracking-widest hover:bg-[#C8963E] hover:text-black transition-all w-fit"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <polyline points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Get Directions
          </a>
        </div>

        {/* Right: Venue poster */}
        <div className="relative w-full sm:w-[420px] aspect-square shrink-0 group">
          <div className="absolute -inset-[2px] border border-[#C8963E]/30 pointer-events-none z-10" />
          <div className="absolute inset-3 border border-dashed border-white/10 pointer-events-none z-10" />
          <Image
            src="/venue-img.jpg"
            alt="Dhaka College Venue"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 420px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};
