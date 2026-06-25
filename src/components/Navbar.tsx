"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SEGMENTS", href: "#segments" },
  { label: "ORGANIZERS", href: "#organizers" },
  { label: "CONTACT", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      {/* Main Navbar Capsule */}
      <div
        className={`max-w-7xl mx-auto px-6 py-3 flex items-center justify-between rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[#0d0d0d]/80 backdrop-blur-xl border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            : "bg-[#0d0d0d]/40 backdrop-blur-md border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group shrink-0 select-none"
        >
          <Logo
            size={32}
            className="group-hover:rotate-12 transition-transform duration-300"
          />
          <div className="flex flex-col leading-none">
            <span className="text-white font-black tracking-widest text-[11px] group-hover:text-[#C8963E] transition-colors">
              DCCC CULTURAL
            </span>
            <span className="text-[#C8963E] font-bold tracking-widest text-[9px]">
              FIESTA 2026
            </span>
          </div>
        </a>

        {/* Center Nav Links — Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-white/70 text-[11px] font-bold tracking-widest hover:text-white transition-colors duration-200 py-1 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#C8963E] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right — Action Buttons (As seen in image_3dd9cf.png) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href="/login"
            className="px-5 py-2 text-[11px] font-bold tracking-widest text-white border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            LOGIN
          </a>
          <a
            href="/register"
            className="px-5 py-2 text-[11px] font-black tracking-widest bg-white text-black rounded-full hover:bg-white/90 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-200"
          >
            REGISTER
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden text-white hover:text-[#C8963E] transition-colors p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu — Floating Card Layout */}
      <div
        className={`md:hidden absolute left-4 right-4 mt-2 overflow-hidden transition-all duration-300 bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] ${
          isOpen
            ? "max-h-80 opacity-100 visible"
            : "max-h-0 opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-5">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white text-[12px] font-bold tracking-widest transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
          <div className="h-[1px] bg-white/10 my-1" />
          <div className="flex items-center gap-3">
            <a
              href="/login"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-center py-2 text-[11px] font-bold tracking-widest text-white border border-white/20 rounded-full"
            >
              LOGIN
            </a>
            <a
              href="/register"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-center py-2 text-[11px] font-black tracking-widest bg-white text-black rounded-full"
            >
              REGISTER
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
