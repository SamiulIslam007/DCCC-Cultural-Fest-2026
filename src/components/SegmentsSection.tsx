"use client";
import React, { useState } from "react";
import { ALL_SEGMENTS } from "@/lib/segments-data";

const ACCENT_COLORS = ["#C05A46", "#C8963E", "#2D5A27"];

const SEGMENTS = ALL_SEGMENTS.map((seg, index) => ({
  id: seg.id,
  title: `${seg.emoji} ${seg.name}`,
  titleEn: `${seg.subtitle} (${seg.type})`,
  description: seg.description,
  accent: ACCENT_COLORS[index % ACCENT_COLORS.length],
}));

export const SegmentsSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleSegments = showAll ? SEGMENTS : SEGMENTS.slice(0, 8);

  return (
    <section id="segments" className="w-full bg-[#0d0d0d] py-24 px-4">
      {/* Section header */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight-none select-none">
          Cultural <span className="text-[#C8963E]">Segments</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/[0.06]">
        {visibleSegments.map((seg, index) => {
          const isHovered = hoveredId === seg.id;
          return (
            <div
              key={seg.id}
              onMouseEnter={() => setHoveredId(seg.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex flex-col bg-[#0d0d0d] p-6 cursor-pointer transition-all duration-200 group animate-fade-in"
              style={{ backgroundColor: isHovered ? "#111111" : "#0d0d0d" }}
            >
              {/* Top accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-200"
                style={{
                  backgroundColor: isHovered ? seg.accent : "transparent",
                }}
              />

              {/* Number */}
              <span
                className="text-[10px] font-black tracking-widest mb-4 transition-colors duration-200"
                style={{
                  color: isHovered ? seg.accent : "rgba(255,255,255,0.15)",
                }}
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
                  style={{
                    color: isHovered ? seg.accent : "rgba(255,255,255,0.15)",
                  }}
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

      {/* Bottom Toggle Button */}
      <div className="flex justify-center mt-14">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2 px-8 py-4 border border-[#C8963E]/60 text-[#C8963E] text-[11px] font-black tracking-widest hover:bg-[#C8963E] hover:text-black transition-all duration-300 uppercase select-none"
        >
          {showAll ? "Show Less" : "See All"}
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </section>
  );
};
