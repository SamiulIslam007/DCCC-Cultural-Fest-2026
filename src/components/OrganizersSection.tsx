"use client";

import React, { useState } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// Organizers Section — Marquee grid + click-to-open profile modal
// ─────────────────────────────────────────────────────────────────────────────

interface Organizer {
  id: number;
  name: string;
  role: string;
  tier: "president" | "vp" | "secretary" | "member";
  bio: string;
  phone?: string;
}

const ORGANIZERS: Organizer[] = [
  { id: 1, name: "Organizer Name", role: "President", tier: "president", bio: "Leading the 4th DCCC National Cultural Fiesta 2026 with vision and dedication to uphold the spirit of Bengali cultural heritage.", phone: "01XXXXXXXXX" },
  { id: 2, name: "Organizer Name", role: "Vice President", tier: "vp", bio: "Coordinating all event logistics and ensuring seamless execution of every segment of Revolution 2.0.", phone: "01XXXXXXXXX" },
  { id: 3, name: "Organizer Name", role: "General Secretary", tier: "secretary", bio: "Managing registrations, communications, and coordination among all organizing team members.", phone: "01XXXXXXXXX" },
  { id: 4, name: "Organizer Name", role: "Joint Secretary", tier: "secretary", bio: "Assisting the General Secretary in all administrative and operational activities.", phone: "01XXXXXXXXX" },
  { id: 5, name: "Organizer Name", role: "Cultural Secretary", tier: "secretary", bio: "Overseeing the artistic and cultural programming of all segments.", phone: "01XXXXXXXXX" },
  { id: 6, name: "Organizer Name", role: "Finance Secretary", tier: "secretary", bio: "Managing the budget, sponsorships, and financial operations of the fiesta.", phone: "01XXXXXXXXX" },
  { id: 7, name: "Organizer Name", role: "Organizing Member", tier: "member", bio: "Dedicated organizing member contributing to the success of Revolution 2.0.", },
  { id: 8, name: "Organizer Name", role: "Organizing Member", tier: "member", bio: "Dedicated organizing member contributing to the success of Revolution 2.0.", },
  { id: 9, name: "Organizer Name", role: "Organizing Member", tier: "member", bio: "Dedicated organizing member contributing to the success of Revolution 2.0.", },
  { id: 10, name: "Organizer Name", role: "Organizing Member", tier: "member", bio: "Dedicated organizing member contributing to the success of Revolution 2.0.", },
  { id: 11, name: "Organizer Name", role: "Organizing Member", tier: "member", bio: "Dedicated organizing member contributing to the success of Revolution 2.0.", },
  { id: 12, name: "Organizer Name", role: "Organizing Member", tier: "member", bio: "Dedicated organizing member contributing to the success of Revolution 2.0.", },
  { id: 13, name: "Organizer Name", role: "Organizing Member", tier: "member", bio: "Dedicated organizing member contributing to the success of Revolution 2.0.", },
  { id: 14, name: "Organizer Name", role: "Organizing Member", tier: "member", bio: "Dedicated organizing member contributing to the success of Revolution 2.0.", },
  { id: 15, name: "Organizer Name", role: "Organizing Member", tier: "member", bio: "Dedicated organizing member contributing to the success of Revolution 2.0.", },
];

const ROW_1_IDS = [1, 2, 3, 4, 5, 6, 7, 8];
const ROW_2_IDS = [9, 10, 11, 12, 13, 14, 15];

const TIER_COLORS: Record<string, string> = {
  president: "#C05A46",
  vp: "#C8963E",
  secretary: "#C8963E",
  member: "rgba(255,255,255,0.4)",
};

// ── Organizer Profile Modal ───────────────────────────────────────────────────
function OrganizerModal({ organizer, onClose }: { organizer: Organizer; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-sm bg-[#111] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-[2px]" style={{ backgroundColor: TIER_COLORS[organizer.tier] }} />

        {/* Photo */}
        <div className="relative w-full aspect-[4/3] bg-[#0d0d0d]">
          <Image
            src={`/Organizers/organizer-${organizer.id}.jpg`}
            alt={organizer.name}
            fill
            className="object-cover"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <p
            className="text-[9px] font-black tracking-[0.4em] uppercase mb-1"
            style={{ color: TIER_COLORS[organizer.tier] }}
          >
            {organizer.role}
          </p>
          <h3 className="text-xl font-black text-white mb-3">{organizer.name}</h3>
          <p className="text-white/50 text-xs leading-relaxed mb-4">{organizer.bio}</p>
          {organizer.phone && (
            <p className="text-white/40 text-xs">
              📞{" "}
              <a href={`tel:${organizer.phone}`} className="hover:text-[#C8963E] transition-colors">
                {organizer.phone}
              </a>
            </p>
          )}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/50 text-white/60 hover:text-white hover:bg-black/80 transition-all"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ── Image Card ────────────────────────────────────────────────────────────────
interface ImageCardProps {
  organizer: Organizer;
  onSelect: (o: Organizer) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ organizer, onSelect }) => (
  <div
    onClick={() => onSelect(organizer)}
    className="relative w-[160px] sm:w-[200px] aspect-[3/4] shrink-0 border border-white/[0.08] bg-white/[0.01]
      hover:border-[#C8963E]/50 hover:bg-white/[0.03] transition-all duration-300 group overflow-hidden cursor-pointer"
  >
    {/* Inner hover border */}
    <div className="absolute -inset-[1px] border border-[#C8963E]/0 group-hover:border-[#C8963E]/30 pointer-events-none z-10 transition-all duration-300" />

    <Image
      src={`/Organizers/organizer-${organizer.id}.jpg`}
      alt={`${organizer.name} — ${organizer.role}`}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      sizes="(max-width: 640px) 160px, 200px"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

    {/* Role badge */}
    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-[8px] font-black tracking-widest text-[#C8963E] uppercase leading-none">{organizer.role}</p>
      <p className="text-white text-[11px] font-bold mt-0.5">{organizer.name}</p>
    </div>

    {/* Tier accent top line */}
    {organizer.tier !== "member" && (
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: TIER_COLORS[organizer.tier] }}
      />
    )}
  </div>
);

// ── Main Section ──────────────────────────────────────────────────────────────
export const OrganizersSection: React.FC = () => {
  const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);

  const row1 = ROW_1_IDS.map((id) => ORGANIZERS.find((o) => o.id === id)!).filter(Boolean);
  const row2 = ROW_2_IDS.map((id) => ORGANIZERS.find((o) => o.id === id)!).filter(Boolean);

  return (
    <>
      {selectedOrganizer && (
        <OrganizerModal organizer={selectedOrganizer} onClose={() => setSelectedOrganizer(null)} />
      )}

      <section id="organizers" className="w-full bg-[#0d0d0d] py-24 overflow-hidden">
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
          <p className="text-white/40 text-sm mt-3">Click on any card to view their full profile</p>
        </div>

        {/* Marquee Container */}
        <div className="w-full flex flex-col gap-6 mask-gradient">
          {/* Row 1: Right to Left */}
          <div className="flex overflow-hidden select-none gap-6 w-full">
            <div className="flex shrink-0 animate-marquee gap-6 min-w-full">
              {row1.map((org) => (
                <ImageCard key={`r1-${org.id}`} organizer={org} onSelect={setSelectedOrganizer} />
              ))}
            </div>
            <div className="flex shrink-0 animate-marquee gap-6 min-w-full" aria-hidden="true">
              {row1.map((org) => (
                <ImageCard key={`r1-dup-${org.id}`} organizer={org} onSelect={setSelectedOrganizer} />
              ))}
            </div>
          </div>

          {/* Row 2: Left to Right */}
          <div className="flex overflow-hidden select-none gap-6 w-full">
            <div className="flex shrink-0 animate-marquee-reverse gap-6 min-w-full">
              {row2.map((org) => (
                <ImageCard key={`r2-${org.id}`} organizer={org} onSelect={setSelectedOrganizer} />
              ))}
            </div>
            <div className="flex shrink-0 animate-marquee-reverse gap-6 min-w-full" aria-hidden="true">
              {row2.map((org) => (
                <ImageCard key={`r2-dup-${org.id}`} organizer={org} onSelect={setSelectedOrganizer} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
