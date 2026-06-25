"use client";

import React from "react";
import Image from "next/image";

// ১২ জন অর্গানাইজারের ইমেজের জন্য অ্যারে (১ থেকে ১২)
const ROW_1_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8];
const ROW_2_IMAGES = [9, 10, 11, 12, 13, 14, 15];

interface ImageCardProps {
  id: number;
}

const ImageCard: React.FC<ImageCardProps> = ({ id }) => (
  <div className="relative w-[160px] sm:w-[200px] aspect-[3/4] shrink-0 border border-white/[0.08] bg-white/[0.01] hover:border-[#C8963E]/50 hover:bg-white/[0.03] transition-all duration-300 group overflow-hidden">
    {/* Inner Border Effect */}
    <div className="absolute -inset-[1px] border border-[#C8963E]/0 group-hover:border-[#C8963E]/30 pointer-events-none z-10 transition-all duration-300" />

    <Image
      src={`/Organizers/organizer-${id}.jpg`}
      alt={`Organizer ${id}`}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      sizes="(max-w-640px) 160px, 200px"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
  </div>
);

export const OrganizersSection: React.FC = () => {
  return (
    <section
      id="organizers"
      className="w-full bg-[#0d0d0d] py-24 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-16 px-4">
        <span className="text-[10px] font-bold tracking-[0.35em] text-[#C8963E] uppercase mb-4 flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-[#C8963E]/50" />
          Meet the Team
          <span className="inline-block w-8 h-px bg-[#C8963E]/50" />
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Our <span className="text-[#C8963E]">Organizers</span>
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="w-full flex flex-col gap-6 mask-gradient">
        {/* Row 1: Right to Left */}
        <div className="flex overflow-hidden select-none gap-6 w-full">
          <div className="flex shrink-0 animate-marquee gap-6 min-w-full">
            {ROW_1_IMAGES.map((id) => (
              <ImageCard key={`r1-${id}`} id={id} />
            ))}
          </div>
          {/* Infinite loop এর জন্য ডুপ্লিকেট কন্টেন্ট */}
          <div
            className="flex shrink-0 animate-marquee gap-6 min-w-full"
            aria-hidden="true"
          >
            {ROW_1_IMAGES.map((id) => (
              <ImageCard key={`r1-dup-${id}`} id={id} />
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="flex overflow-hidden select-none gap-6 w-full">
          <div className="flex shrink-0 animate-marquee-reverse gap-6 min-w-full">
            {ROW_2_IMAGES.map((id) => (
              <ImageCard key={`r2-${id}`} id={id} />
            ))}
          </div>
          {/* Infinite loop এর জন্য ডুপ্লিকেট কন্টেন্ট */}
          <div
            className="flex shrink-0 animate-marquee-reverse gap-6 min-w-full"
            aria-hidden="true"
          >
            {ROW_2_IMAGES.map((id) => (
              <ImageCard key={`r2-dup-${id}`} id={id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
