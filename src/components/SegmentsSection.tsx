"use client";

import React, { useState } from "react";

const SEGMENTS = [
  { id: "recitation", title: "আবৃত্তি", titleEn: "Poetry Recitation", description: "Express the soul of Bengali poetry through powerful recitation. From Rabindranath to Nazrul, let every verse echo with emotion.", accent: "#C05A46" },
  { id: "singing", title: "সংগীত", titleEn: "Vocal Singing", description: "From classical Rabindra Sangeet to modern Bangla music — showcase your vocal artistry on the grandest stage.", accent: "#C8963E" },
  { id: "dance", title: "নৃত্য", titleEn: "Folk Dance", description: "Classical Bharatanatyam, folk Bihu, modern fusion — embody the rhythm of Bangladesh through movement and grace.", accent: "#2D5A27" },
  { id: "drama", title: "নাটক", titleEn: "Drama & Theatre", description: "Bring stories to life on stage through powerful acting, direction, and set design. Theatre is where culture breathes.", accent: "#C05A46" },
  { id: "painting", title: "চিত্রকলা", titleEn: "Art & Painting", description: "Canvas meets creativity — express the spirit of Bengal through brushstrokes, sketches, and visual storytelling.", accent: "#C8963E" },
  { id: "photography", title: "আলোকচিত্র", titleEn: "Photography", description: "Capture the unseen beauty of Bangladesh — from rural landscapes to urban life — through your unique lens.", accent: "#2D5A27" },
  { id: "debate", title: "বিতর্ক", titleEn: "Debate Competition", description: "Sharpen your intellect and rhetoric — defend your arguments with logic, passion, and well-crafted words.", accent: "#C05A46" },
  { id: "quiz", title: "কুইজ", titleEn: "Heritage Quiz", description: "Test your knowledge across history, science, literature, and Bengali heritage in this high-stakes showdown.", accent: "#C8963E" },
  { id: "shortfilm", title: "চলচ্চিত্র", titleEn: "Short Film", description: "Tell compelling stories through the lens — from scripting to cinematography, showcase your filmmaking brilliance.", accent: "#2D5A27" },
  { id: "essay", title: "প্রবন্ধ", titleEn: "Essay Writing", description: "Pen your thoughts on culture, heritage, and contemporary issues in beautifully articulated Bengali prose.", accent: "#C05A46" },
  { id: "band", title: "ব্যান্ড সংগীত", titleEn: "Band Music", description: "Rock the stage with your band — from Bangla rock to fusion — amplify the spirit of youth through live music.", accent: "#C8963E" },
  { id: "extempore", title: "বক্তৃতা", titleEn: "Extempore Speech", description: "Speak your mind with zero preparation — test your wit, spontaneity, and command of language under pressure.", accent: "#2D5A27" },
];

export const SegmentsSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="segments" className="w-full bg-[#0d0d0d] py-24 px-4">
      {/* Section header */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-16">
        <span className="text-[10px] font-bold tracking-[0.35em] text-[#C8963E] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[#C8963E]/50" />
          Competition Categories
          <span className="inline-block w-8 h-px bg-[#C8963E]/50" />
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
          Cultural <span className="text-[#C8963E]">Segments</span>
        </h2>
        <p className="text-white/40 text-sm md:text-base max-w-xl leading-relaxed">
          12 unique segments celebrating the rich heritage of Bengali culture.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/[0.06]">
        {SEGMENTS.map((seg, index) => {
          const isHovered = hoveredId === seg.id;
          return (
            <div
              key={seg.id}
              onMouseEnter={() => setHoveredId(seg.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex flex-col bg-[#0d0d0d] p-6 cursor-pointer transition-all duration-200 group"
              style={{ backgroundColor: isHovered ? "#111111" : "#0d0d0d" }}
            >
              {/* Top accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-200"
                style={{ backgroundColor: isHovered ? seg.accent : "transparent" }}
              />

              {/* Number */}
              <span
                className="text-[10px] font-black tracking-widest mb-4 transition-colors duration-200"
                style={{ color: isHovered ? seg.accent : "rgba(255,255,255,0.15)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Bengali Title */}
              <h3
                className="text-xl font-black leading-tight mb-1 transition-colors duration-200"
                style={{ color: isHovered ? seg.accent : "#ffffff" }}
              >
                {seg.title}
              </h3>

              {/* English subtitle */}
              <p className="text-[10px] font-bold tracking-widest text-[#C8963E] uppercase mb-3">
                {seg.titleEn}
              </p>

              {/* Description */}
              <p className="text-white/40 text-xs leading-relaxed flex-1 transition-colors duration-200 group-hover:text-white/60">
                {seg.description}
              </p>

              {/* Arrow */}
              <div className="flex items-center gap-1.5 mt-4">
                <span
                  className="text-[9px] font-black tracking-wider uppercase transition-colors duration-200"
                  style={{ color: isHovered ? seg.accent : "rgba(255,255,255,0.15)" }}
                >
                  Details
                </span>
                <svg
                  className="w-3 h-3 transition-all duration-200"
                  style={{
                    color: isHovered ? seg.accent : "rgba(255,255,255,0.15)",
                    transform: isHovered ? "translateX(3px)" : "translateX(0)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center mt-14">
        <a
          href="#"
          className="inline-flex items-center gap-2.5 px-8 py-4 border border-[#C8963E]/60 text-[#C8963E] text-[11px] font-black tracking-widest hover:bg-[#C8963E] hover:text-black transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" strokeLinecap="round" />
            <line x1="23" y1="11" x2="17" y2="11" strokeLinecap="round" />
          </svg>
          Register for Segments
        </a>
      </div>
    </section>
  );
};
