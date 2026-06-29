"use client";

import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Contact Section — 3-card layout matching the screenshot design
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  {
    id: "email",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Official Email",
    lines: [
      <a key="e1" href="mailto:gscclturalclub@gmail.com" className="text-[#C8963E] hover:text-white transition-colors text-sm">
        gscclturalclub@gmail.com
      </a>,
    ],
  },
  {
    id: "pages",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    label: "Official Pages",
    lines: [
      <a key="fb" href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#C8963E] transition-colors text-sm">
        Facebook
      </a>,
      <a key="ig" href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#C8963E] transition-colors text-sm">
        Instagram
      </a>,
    ],
  },
  {
    id: "location",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Location",
    lines: [
      <span key="l1" className="text-white/60 text-sm">Govt. Science College, Tejgaon,</span>,
      <span key="l2" className="text-white/60 text-sm">Dhaka 1215</span>,
    ],
  },
];

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="w-full bg-[#0a0a0a] border-t border-white/[0.06] py-20 px-4">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Contact <span className="text-[#C05A46]">Us</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {CONTACT_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group bg-[#0d0d0d] border border-white/[0.06] p-8 flex flex-col items-center text-center
              hover:border-[#C8963E]/30 hover:bg-[#0d0d0d] transition-all duration-300"
          >
            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center border border-white/10 text-[#C8963E] mb-4
              group-hover:border-[#C8963E]/40 group-hover:shadow-[0_0_20px_rgba(200,150,62,0.15)] transition-all duration-300">
              {item.icon}
            </div>

            {/* Label */}
            <p className="text-[10px] font-black tracking-[0.3em] text-[#C8963E] uppercase mb-3">{item.label}</p>

            {/* Lines */}
            <div className="flex flex-col gap-1 items-center">
              {item.lines}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
