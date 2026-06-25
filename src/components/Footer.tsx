"use client";

import React from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Segments", href: "#segments" },
  { label: "Organizers", href: "#organizers" },
];

const SEGMENTS = [
  "Poetry Recitation",
  "Vocal Singing",
  "Folk Dance",
  "Drama & Theatre",
  "Art & Painting",
  "Photography",
  "Debate",
  "Heritage Quiz",
  "Short Film",
  "Essay Writing",
  "Band Music",
  "Extempore Speech",
];

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/[0.08] text-white">
      {/* Top band */}
      <div className="border-b border-white/[0.06] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold tracking-[0.35em] text-[#C8963E] uppercase">
            4th DCCC National Cultural Fiesta 2026
          </p>
          <p className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
            July 17–18 · Dhaka College · Dhaka
          </p>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div className="flex flex-col">
              <span className="text-white font-black tracking-widest text-[13px] leading-tight">DCCC CULTURAL</span>
              <span className="text-[#C8963E] font-bold tracking-widest text-[11px] leading-none">FIESTA 2026</span>
            </div>
          </div>
          <p className="text-white/40 text-xs leading-relaxed max-w-[220px]">
            Dhaka College Cultural Club — celebrating the spirit of Bangladeshi art, music, and heritage since 2021.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 mt-1">
            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#C8963E] hover:text-[#C8963E] transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#C8963E] hover:text-[#C8963E] transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#C8963E] hover:text-[#C8963E] transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon fill="#0a0a0a" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-black tracking-[0.3em] text-[#C8963E] uppercase mb-1">Quick Links</p>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-white/50 text-xs font-semibold tracking-wide hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="inline-block w-3 h-px bg-white/20 group-hover:w-5 group-hover:bg-[#C8963E] transition-all duration-200" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Segments */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-black tracking-[0.3em] text-[#C8963E] uppercase mb-1">Segments</p>
          <ul className="flex flex-col gap-2">
            {SEGMENTS.slice(0, 6).map((s) => (
              <li key={s}>
                <a
                  href="#segments"
                  className="text-white/50 text-xs font-semibold hover:text-white transition-colors tracking-wide"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-black tracking-[0.3em] text-[#C8963E] uppercase mb-1">Contact</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2.5">
              <svg className="w-3.5 h-3.5 mt-0.5 text-[#C8963E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className="text-white/50 text-xs leading-relaxed font-semibold">
                Dhaka College<br />
                Mirpur Rd, Dhanmondi<br />
                Dhaka 1205, Bangladesh
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="w-3.5 h-3.5 text-[#C8963E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:dcccultural@dhakacollege.edu.bd" className="text-white/50 text-xs font-semibold hover:text-white transition-colors">
                dcccultural@dhakacollege.edu.bd
              </a>
            </div>
          </div>

          {/* Event CTA */}
          <a
            href="#segments"
            className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#C8963E]/60 text-[#C8963E] text-[11px] font-black tracking-widest hover:bg-[#C8963E] hover:text-black transition-all"
          >
            Explore Segments
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-[10px] tracking-wide">
            © 2026 Dhaka College Cultural Club. All rights reserved.
          </p>
          <p className="text-white/25 text-[10px] tracking-wide">
            4th DCCC National Cultural Fiesta · Est. 2021
          </p>
        </div>
      </div>
    </footer>
  );
};
