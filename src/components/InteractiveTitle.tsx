"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/* ─── Ektara (C) SVG Component ─── */
const EktaraC: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <svg viewBox="0 0 160 220" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      {/* Neck (split bamboo) */}
      <path
        d="M60 40 L60 170 M72 40 L72 170"
        stroke="#D1C7BD"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Tuning Peg at top */}
      <rect x="45" y="30" width="40" height="8" rx="2" fill="#C8963E" stroke="#242627" strokeWidth="1" />
      <path d="M85 34 L100 34" stroke="#C05A46" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="34" r="5" fill="#C8963E" />

      {/* Folk accents on the neck */}
      <line x1="60" y1="70" x2="72" y2="70" stroke="#C05A46" strokeWidth="3" />
      <line x1="60" y1="110" x2="72" y2="110" stroke="#2D5A27" strokeWidth="3" />
      <line x1="60" y1="140" x2="72" y2="140" stroke="#C8963E" strokeWidth="3" />

      {/* Resonator (Bottom drum forming the C curve) */}
      <path
        d="M125 140 C145 155, 140 195, 95 205 C50 215, 30 195, 30 160 C30 120, 70 125, 95 140 C105 146, 115 142, 125 140 Z"
        fill="#D1C7BD"
        stroke="#242627"
        strokeWidth="3.5"
      />
      
      {/* Inset cover (leather head) */}
      <path
        d="M115 148 C130 160, 125 190, 95 195 C65 200, 48 185, 48 160 C48 135, 78 138, 95 148 Z"
        fill="#A39689"
        stroke="#242627"
        strokeWidth="1.5"
      />

      {/* Decorative dots / folk triangles on resonator */}
      <circle cx="65" cy="180" r="3.5" fill="#C05A46" />
      <circle cx="85" cy="188" r="3.5" fill="#2D5A27" />
      <circle cx="105" cy="182" r="3.5" fill="#C8963E" />
      <polygon points="40,165 48,158 48,172" fill="#2D5A27" />
      <polygon points="115,160 123,153 123,167" fill="#C05A46" />

      {/* Main Single String (Ektara String) */}
      <line
        x1="66"
        y1="34"
        x2="95"
        y2="170"
        stroke="#EAE5D9"
        strokeWidth="2.5"
        className={isHovered ? "animate-[vibrate_0.1s_infinite_alternate]" : ""}
        style={{ transformOrigin: "66px 34px" }}
      />
      
      <style jsx>{`
        @keyframes vibrate {
          0% { transform: rotate(-0.5deg); stroke: #C8963E; }
          100% { transform: rotate(0.5deg); stroke: #C05A46; }
        }
      `}</style>
    </svg>
  );
};

/* ─── U SVG Component ─── */
const LetterU: React.FC = () => {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      {/* Outer base U */}
      <path
        d="M25 20 L25 90 C25 130, 95 130, 95 90 L95 20"
        fill="none"
        stroke="#C05A46"
        strokeWidth="24"
        strokeLinecap="square"
      />
      {/* Innermost design border */}
      <path
        d="M25 20 L25 90 C25 130, 95 130, 95 90 L95 20"
        fill="none"
        stroke="#EAE5D9"
        strokeWidth="2"
        strokeDasharray="4 6"
      />
      {/* Folk stripes along the curve */}
      <path
        d="M25 35 L25 85"
        fill="none"
        stroke="#C8963E"
        strokeWidth="6"
      />
      <path
        d="M95 35 L95 85"
        fill="none"
        stroke="#2D5A27"
        strokeWidth="6"
      />
      {/* Bottom curved pattern accent */}
      <path
        d="M40 108 C50 118, 70 118, 80 108"
        fill="none"
        stroke="#C8963E"
        strokeWidth="4"
      />
    </svg>
  );
};

/* ─── L SVG Component ─── */
const LetterL: React.FC = () => {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      {/* L Shape */}
      <path
        d="M25 20 L25 140 L95 140"
        fill="none"
        stroke="#D1C7BD"
        strokeWidth="22"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Tribal/folk decorative stripes on L */}
      {/* Diagonal lines on the vertical stem */}
      <line x1="18" y1="40" x2="32" y2="30" stroke="#C05A46" strokeWidth="3" />
      <line x1="18" y1="65" x2="32" y2="55" stroke="#2D5A27" strokeWidth="3" />
      <line x1="18" y1="90" x2="32" y2="80" stroke="#C8963E" strokeWidth="3" />
      
      {/* Horizontal decorative blocks on the base */}
      <rect x="45" y="133" width="8" height="14" fill="#C05A46" />
      <rect x="60" y="133" width="8" height="14" fill="#2D5A27" />
      <rect x="75" y="133" width="8" height="14" fill="#C8963E" />
    </svg>
  );
};

/* ─── T SVG Component ─── */
const LetterT: React.FC = () => {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      {/* Horizontal Bar */}
      <line x1="15" y1="30" x2="105" y2="30" stroke="#D1C7BD" strokeWidth="22" strokeLinecap="square" />
      {/* Vertical Stem */}
      <line x1="60" y1="30" x2="60" y2="140" stroke="#D1C7BD" strokeWidth="22" strokeLinecap="square" />

      {/* Midline pattern */}
      <line x1="60" y1="45" x2="60" y2="125" stroke="#242627" strokeWidth="3.5" />
      {/* Core triangle/diamond details */}
      <polygon points="60,60 54,68 66,68" fill="#C05A46" />
      <polygon points="60,85 54,93 66,93" fill="#2D5A27" />
      <polygon points="60,110 54,118 66,118" fill="#C8963E" />
      
      {/* Left/Right caps */}
      <circle cx="25" cy="30" r="3.5" fill="#C05A46" />
      <circle cx="95" cy="30" r="3.5" fill="#2D5A27" />
    </svg>
  );
};

/* ─── Kula SVG Component ─── */
const KulaBasket: React.FC = () => {
  return (
    <svg viewBox="0 0 140 180" className="w-full h-full drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)]">
      {/* Outer border of Kula */}
      <path
        d="M70 20 C115 20, 125 70, 115 130 C110 155, 95 160, 70 160 C45 160, 30 155, 25 130 C15 70, 25 20, 70 20 Z"
        fill="#A18C76"
        stroke="#C8963E"
        strokeWidth="6"
      />
      {/* Terracotta inner rim */}
      <path
        d="M70 28 C108 28, 117 72, 107 125 C103 147, 90 152, 70 152 C50 152, 37 147, 33 125 C23 72, 32 28, 70 28 Z"
        fill="#242627"
        stroke="#C05A46"
        strokeWidth="3.5"
      />

      {/* Folk Woven Bamboo Grid Lines */}
      <path
        d="M45 40 Q70 50 95 40 M40 65 Q70 75 100 65 M38 90 Q70 100 102 90 M38 115 Q70 125 102 115 M45 135 Q70 142 95 135"
        stroke="rgba(209,199,189,0.25)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M50 30 Q35 90 50 145 M70 28 Q70 90 70 152 M90 30 Q105 90 90 145"
        stroke="rgba(209,199,189,0.25)"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Decorative outer dots */}
      <path
        d="M70 12 C122 12, 133 68, 123 132 C118 162, 100 168, 70 168 C40 168, 22 162, 17 132 C7 68, 18 12, 70 12 Z"
        fill="none"
        stroke="#EAE5D9"
        strokeWidth="2"
        strokeDasharray="2 6"
      />

      {/* Colorful center triangles */}
      <polygon points="70,60 62,75 78,75" fill="#C8963E" />
      <polygon points="70,95 62,80 78,80" fill="#2D5A27" />
      <circle cx="70" cy="115" r="5" fill="#C05A46" />
    </svg>
  );
};

/* ─── R SVG Component ─── */
const LetterR: React.FC = () => {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      {/* R Shape */}
      <path
        d="M25 140 L25 20 L75 20 C95 20, 95 70, 75 70 L25 70 M60 70 L95 140"
        fill="none"
        stroke="#D1C7BD"
        strokeWidth="22"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Folk detail cut out/inset in R loop */}
      <polygon points="52,40 68,48 52,56" fill="#C05A46" />
      <circle cx="78" cy="45" r="3.5" fill="#2D5A27" />

      {/* Stripes on leg */}
      <line x1="68" y1="90" x2="82" y2="90" stroke="#C8963E" strokeWidth="4" />
      <line x1="75" y1="110" x2="89" y2="110" stroke="#2D5A27" strokeWidth="4" />
      <line x1="82" y1="130" x2="96" y2="130" stroke="#C05A46" strokeWidth="4" />
    </svg>
  );
};

/* ─── A SVG Component ─── */
const LetterA: React.FC = () => {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      {/* A Shape */}
      <path
        d="M25 140 L60 20 L95 140 M40 95 L80 95"
        fill="none"
        stroke="#D1C7BD"
        strokeWidth="22"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Folk triangle representing inner loop */}
      <polygon points="60,48 50,68 70,68" fill="#2D5A27" />

      {/* Decorative dots on crossbar */}
      <circle cx="48" cy="95" r="3.5" fill="#C05A46" />
      <circle cx="60" cy="95" r="3.5" fill="#C8963E" />
      <circle cx="72" cy="95" r="3.5" fill="#EAE5D9" />
    </svg>
  );
};

/* ─── Shahnai Flute (L) SVG Component ─── */
const ShahnaiL: React.FC = () => {
  return (
    <svg viewBox="0 0 160 220" className="w-full h-full drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)]">
      {/* Slanted Flute Body */}
      <path
        d="M30 40 L105 180"
        stroke="#C8963E"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Inner shaft accent */}
      <path
        d="M32 44 L103 176"
        stroke="#242627"
        strokeWidth="2"
      />
      
      {/* Flute Holes */}
      <circle cx="45" cy="68" r="3.5" fill="#242627" stroke="#EAE5D9" strokeWidth="1" />
      <circle cx="56" cy="88" r="3.5" fill="#242627" stroke="#EAE5D9" strokeWidth="1" />
      <circle cx="67" cy="108" r="3.5" fill="#242627" stroke="#EAE5D9" strokeWidth="1" />
      <circle cx="78" cy="128" r="3.5" fill="#242627" stroke="#EAE5D9" strokeWidth="1" />
      <circle cx="89" cy="148" r="3.5" fill="#242627" stroke="#EAE5D9" strokeWidth="1" />

      {/* Folk thread wraps (red & teal bindings) */}
      {/* Wrap 1 */}
      <line x1="33" y1="52" x2="43" y2="48" stroke="#C05A46" strokeWidth="5" />
      {/* Wrap 2 */}
      <line x1="68" y1="117" x2="78" y2="113" stroke="#2D5A27" strokeWidth="5" />
      {/* Wrap 3 */}
      <line x1="91" y1="160" x2="101" y2="156" stroke="#C05A46" strokeWidth="5" />

      {/* Flared Bell at bottom of Shahnai */}
      <path
        d="M98 168 L138 185 L124 205 L88 182 Z"
        fill="#C05A46"
        stroke="#242627"
        strokeWidth="2"
      />
      <ellipse cx="131" cy="195" rx="6" ry="12" fill="#C8963E" transform="rotate(22 131 195)" />

      {/* Blowpiece at top */}
      <path d="M26 32 L34 46 L22 41 Z" fill="#D1C7BD" />
      <line x1="22" y1="26" x2="28" y2="34" stroke="#EAE5D9" strokeWidth="2.5" />
    </svg>
  );
};

/* ─── Particle Type ─── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  vx: number;
  vy: number;
}

export const InteractiveTitle: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Track mouse coordinates for Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || window.innerWidth < 768) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Normalized coordinates (-1 to 1) from the center of the title
      const x = ((clientX - left) / width - 0.5) * 2;
      const y = ((clientY - top) / height - 0.5) * 2;

      // Define anti-gravity parallax speeds for each letter (index-specific lag)
      const speeds = [
        { x: -28, y: -22, r: -8 }, // C (Ektara)
        { x: -14, y: -16, r: -3 }, // U
        { x: -8, y: -10, r: 2 },   // L
        { x: -18, y: -20, r: -6 }, // T
        { x: -35, y: -30, r: 12 },  // Kula (extra floaty)
        { x: -10, y: -8, r: -2 },   // R
        { x: -15, y: -12, r: 4 },   // A
        { x: -26, y: -25, r: 10 },  // L (Shahnai)
      ];

      lettersRef.current.forEach((el, index) => {
        if (!el) return;
        const config = speeds[index] || { x: -10, y: -10, r: 0 };
        gsap.to(el, {
          x: x * config.x,
          y: y * config.y,
          rotation: x * config.r,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    // Device orientation tilting for mobile
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (window.innerWidth >= 768 || !e.gamma || !e.beta) return;

      // gamma is left/right (-90 to 90), beta is front/back (-180 to 180)
      const x = Math.max(-1, Math.min(1, e.gamma / 30));
      const y = Math.max(-1, Math.min(1, (e.beta - 45) / 30)); // 45deg typical viewing angle

      const speeds = [
        { x: -16, y: -12, r: -4 },
        { x: -8, y: -10, r: -1 },
        { x: -4, y: -6, r: 1 },
        { x: -10, y: -12, r: -3 },
        { x: -22, y: -18, r: 6 },
        { x: -6, y: -4, r: -1 },
        { x: -9, y: -8, r: 2 },
        { x: -15, y: -14, r: 5 },
      ];

      lettersRef.current.forEach((el, index) => {
        if (!el) return;
        const config = speeds[index];
        gsap.to(el, {
          x: x * config.x,
          y: y * config.y,
          rotation: x * config.r,
          duration: 0.8,
          ease: "power1.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  // GSAP Entrance Stagger on load
  useEffect(() => {
    const letters = lettersRef.current.filter((el) => el !== null) as HTMLDivElement[];
    if (letters.length === 0) return;

    // Reset properties for clean entrance
    gsap.set(letters, { opacity: 0, scale: 0.4, y: 80, rotation: -15 });

    // Stagger reveal
    gsap.to(letters, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotation: 0,
      duration: 1.4,
      stagger: 0.08,
      ease: "back.out(1.7)",
      delay: 0.3,
    });
  }, []);

  // Particle Generation for Shahnai (L)
  useEffect(() => {
    if (hoveredLetter !== "shahnai") {
      return;
    }

    const interval = setInterval(() => {
      setParticles((prev) => {
        // Limit total particles to keep performance high
        const current = prev.filter((p) => p.opacity > 0.05);
        if (current.length > 50) return current;

        const colors = ["#C8963E", "#EAE5D9", "#C05A46"];
        const newParticle: Particle = {
          id: Math.random(),
          x: 40 + Math.random() * 50, // emitting area close to Shahnai base
          y: 20 + Math.random() * 40,
          size: 3 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.9,
          vx: -1.5 + Math.random() * 3,
          vy: -2.5 - Math.random() * 2, // drifting upwards
        };

        return [...current, newParticle];
      });
    }, 45);

    return () => clearInterval(interval);
  }, [hoveredLetter]);

  // Particle animation loop
  useEffect(() => {
    if (particles.length === 0) return;

    const frame = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          opacity: p.opacity - 0.015,
        }))
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [particles]);

  // Handle Y-Axis Spin for Kula
  const handleKulaEnter = (index: number) => {
    setHoveredLetter("kula");
    const el = lettersRef.current[index];
    if (!el) return;
    gsap.to(el, {
      rotateY: "+=360",
      scale: 1.1,
      duration: 0.85,
      ease: "power2.out",
    });
  };

  const handleKulaLeave = (index: number) => {
    setHoveredLetter(null);
    const el = lettersRef.current[index];
    if (!el) return;
    gsap.to(el, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-4 w-full py-10 select-none perspective-[1000px] max-w-5xl mx-auto"
    >
      {/* ─── C (Ektara) ─── */}
      <div
        ref={(el) => { lettersRef.current[0] = el; }}
        className="w-[72px] sm:w-[96px] md:w-[130px] lg:w-[150px] aspect-[160/220] transition-all duration-300 transform"
        onMouseEnter={() => setHoveredLetter("ektara")}
        onMouseLeave={() => setHoveredLetter(null)}
      >
        <EktaraC isHovered={hoveredLetter === "ektara"} />
      </div>

      {/* ─── U ─── */}
      <div
        ref={(el) => { lettersRef.current[1] = el; }}
        className="w-[55px] sm:w-[72px] md:w-[100px] lg:w-[115px] aspect-[120/160] transition-all duration-300 transform"
      >
        <LetterU />
      </div>

      {/* ─── L ─── */}
      <div
        ref={(el) => { lettersRef.current[2] = el; }}
        className="w-[55px] sm:w-[72px] md:w-[100px] lg:w-[115px] aspect-[120/160] transition-all duration-300 transform"
      >
        <LetterL />
      </div>

      {/* ─── T ─── */}
      <div
        ref={(el) => { lettersRef.current[3] = el; }}
        className="w-[55px] sm:w-[72px] md:w-[100px] lg:w-[115px] aspect-[120/160] transition-all duration-300 transform"
      >
        <LetterT />
      </div>

      {/* ─── Kula Winnowing Basket ─── */}
      <div
        ref={(el) => { lettersRef.current[4] = el; }}
        className="w-[65px] sm:w-[85px] md:w-[115px] lg:w-[130px] aspect-[140/180] transition-all duration-300 transform cursor-pointer"
        onMouseEnter={() => handleKulaEnter(4)}
        onMouseLeave={() => handleKulaLeave(4)}
      >
        <KulaBasket />
      </div>

      {/* ─── R ─── */}
      <div
        ref={(el) => { lettersRef.current[5] = el; }}
        className="w-[55px] sm:w-[72px] md:w-[100px] lg:w-[115px] aspect-[120/160] transition-all duration-300 transform"
      >
        <LetterR />
      </div>

      {/* ─── A ─── */}
      <div
        ref={(el) => { lettersRef.current[6] = el; }}
        className="w-[55px] sm:w-[72px] md:w-[100px] lg:w-[115px] aspect-[120/160] transition-all duration-300 transform"
      >
        <LetterA />
      </div>

      {/* ─── L (Shahnai Flute) ─── */}
      <div
        ref={(el) => { lettersRef.current[7] = el; }}
        className="relative w-[72px] sm:w-[96px] md:w-[130px] lg:w-[150px] aspect-[160/220] transition-all duration-300 transform cursor-pointer"
        onMouseEnter={() => setHoveredLetter("shahnai")}
        onMouseLeave={() => setHoveredLetter(null)}
      >
        <ShahnaiL />

        {/* Dynamic Drifting Particle Canvas overlay */}
        {hoveredLetter === "shahnai" && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full transition-transform duration-100 ease-out"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  boxShadow: `0 0 8px ${p.color}`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
