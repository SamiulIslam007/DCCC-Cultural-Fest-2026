"use client";

import React, { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string; // ISO format, e.g. "2026-07-17T09:00:00"
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "000",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        return { days: "000", hours: "00", minutes: "00", seconds: "00" };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return {
        days: days.toString().padStart(3, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center bg-[#2B2D2F]/90 backdrop-blur-md border-y-2 border-r-2 border-[#D1C7BD]/25 text-[#EAE5D9] rounded-none py-5 px-3 select-none w-[74px]">
        {["DAYS", "HRS", "MINS", "SECS"].map((label) => (
          <div key={label} className="my-3 text-center">
            <div className="text-lg font-bold font-mono text-[#D1C7BD] animate-pulse">--</div>
            <div className="text-[9px] uppercase tracking-wider text-[#D1C7BD]/40">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center bg-[#2B2D2F]/90 backdrop-blur-md border-y-2 border-r-2 border-[#D1C7BD]/25 text-[#EAE5D9] rounded-none py-6 px-3 shadow-[3px_3px_0px_#C05A46] select-none w-[74px] hover:bg-[#2B2D2F] hover:border-[#D1C7BD]/50 transition-all duration-300">
      {/* Days */}
      <div className="my-2.5 text-center w-full">
        <div className="text-xl font-black font-mono tracking-tight text-[#C8963E] drop-shadow-[0_0_8px_rgba(200,150,62,0.4)]">
          {timeLeft.days}
        </div>
        <div className="text-[9px] font-black uppercase tracking-wider text-[#D1C7BD] mt-0.5">DAYS</div>
      </div>

      <div className="w-8 h-[1px] bg-[#D1C7BD]/20 my-1" />

      {/* Hours */}
      <div className="my-2.5 text-center w-full">
        <div className="text-lg font-bold font-mono tracking-tight text-[#EAE5D9]">
          {timeLeft.hours}
        </div>
        <div className="text-[9px] font-black uppercase tracking-wider text-[#D1C7BD] mt-0.5">HOURS</div>
      </div>

      <div className="w-8 h-[1px] bg-[#D1C7BD]/20 my-1" />

      {/* Mins */}
      <div className="my-2.5 text-center w-full">
        <div className="text-lg font-bold font-mono tracking-tight text-[#EAE5D9]">
          {timeLeft.minutes}
        </div>
        <div className="text-[9px] font-black uppercase tracking-wider text-[#D1C7BD] mt-0.5">MINS</div>
      </div>

      <div className="w-8 h-[1px] bg-[#D1C7BD]/20 my-1" />

      {/* Secs */}
      <div className="my-2.5 text-center w-full">
        <div className="text-lg font-bold font-mono tracking-tight text-[#C8963E] drop-shadow-[0_0_8px_rgba(200,150,62,0.4)] animate-pulse">
          {timeLeft.seconds}
        </div>
        <div className="text-[9px] font-black uppercase tracking-wider text-[#D1C7BD] mt-0.5">SECS</div>
      </div>
    </div>
  );
};
