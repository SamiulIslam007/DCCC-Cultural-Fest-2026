"use client";

import React, { useState, useEffect } from "react";

interface AboutSectionProps {
  targetDate: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ targetDate }) => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        return { days: "00", hours: "00", minutes: "00", seconds: "00" };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((difference / 1000 / 60) % 60)
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, "0"),
      };
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  const infoItems = [
    { icon: "📅", label: "Date", value: "July 17–18, 2026" },
    { icon: "📍", label: "Venue", value: "Dhaka College, Dhaka" },
    { icon: "🎭", label: "Segments", value: "12 Cultural Categories" },
  ];

  return (
    <section id="about" className="w-full bg-[#0d0d0d] py-24 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* ── Countdown Bar ── */}
        <div className="w-full border border-white/10 bg-white/[0.02] p-6 md:px-10 md:py-7 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-[#C8963E] uppercase mb-1">
              Event Starts In
            </p>
            <p className="text-white font-black text-lg tracking-wide">
              July 17, 2026
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-6 md:gap-10">
            {units.map((u, i) => (
              <React.Fragment key={u.label}>
                <div className="flex flex-col items-center">
                  <span className="text-3xl md:text-4xl font-black font-mono text-white leading-none">
                    {mounted ? u.value : "--"}
                  </span>
                  <span className="text-[9px] font-bold text-white/40 tracking-widest mt-1.5 uppercase">
                    {u.label}
                  </span>
                </div>
                {i < 3 && (
                  <span className="text-[#C8963E] font-mono text-2xl -mt-4 select-none">
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── About Content (Two Columns) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Text Content */}
          <div className="flex flex-col lg:col-span-7 text-left">
            <span className="text-[10px] font-bold tracking-[0.35em] text-[#C8963E] uppercase mb-4">
              About the Event
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Dhaka College
              <span className="text-white/40">×</span> Cultural Club
            </h2>
            <div className="w-12 h-[2px] bg-[#C8963E]/50 mb-6" />
            <div className="text-white/60 text-sm md:text-base leading-relaxed flex flex-col gap-4">
              <p>
                Dhaka College Cultural Club proudly presents the{" "}
                <span className="text-white font-semibold">
                  4th DCCC National Cultural Fiesta 2026
                </span>{" "}
                — the premier student festival celebrating creativity, arts, and
                self-expression.
              </p>
              <p>
                Two days. One historical campus. A stage for the next generation
                of visual artists, dancers, musicians, and performers to
                compete, collaborate, and make history.
              </p>
            </div>
          </div>

          {/* Right Column: Small Cards */}
          <div className="flex flex-col gap-4 lg:col-span-5 w-full lg:mt-12">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors w-full"
              >
                <div className="text-2xl bg-white/[0.03] p-3 border border-white/5 rounded-sm shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-[#C8963E] uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="text-white text-base font-semibold">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
