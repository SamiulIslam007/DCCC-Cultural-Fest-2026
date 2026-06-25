import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 200, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Definitions for paths, gradients, and filters */}
      <defs>
        {/* Glow drop shadow for premium look */}
        <filter id="logo-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
        </filter>

        {/* Head Gradient - Vibrant Mandala Colors */}
        <linearGradient id="head-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff5e62" />
          <stop offset="50%" stopColor="#ff9966" />
          <stop offset="100%" stopColor="#ffdb00" />
        </linearGradient>

        {/* Inner Mandala Gradient */}
        <radialGradient id="mandala-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3cd52e" />
          <stop offset="40%" stopColor="#00c6ff" />
          <stop offset="80%" stopColor="#0072ff" />
          <stop offset="100%" stopColor="#7a00ff" />
        </radialGradient>

        {/* Arc Path for DHAKA COLLEGE */}
        <path
          id="arc-top"
          d="M 68 150 A 150 150 0 0 1 332 150"
          fill="none"
        />

        {/* Arc Path for ESTD 2021 */}
        <path
          id="arc-mid-bottom"
          d="M 120 290 A 100 100 0 0 0 280 290"
          fill="none"
        />

        {/* Arc Path for CULTURAL CLUB */}
        <path
          id="arc-bottom"
          d="M 85 315 A 135 135 0 0 0 315 315"
          fill="none"
        />
      </defs>

      {/* Main Shield Group with Shadow */}
      <g filter="url(#logo-shadow)">
        {/* Outer Shield Border (Black) */}
        <path
          d="M 200 30 C 235 30 265 15 300 45 C 330 65 350 130 350 210 C 350 280 280 340 200 375 C 120 340 50 280 50 210 C 50 130 70 65 100 45 C 135 15 165 30 200 30 Z"
          fill="#171717"
        />

        {/* Sky Blue Outer Shield Body */}
        <path
          d="M 200 34 C 232 34 260 20 294 48 C 322 67 342 129 342 207 C 342 274 275 332 200 366 C 125 332 58 274 58 207 C 58 129 78 67 106 48 C 140 20 168 34 200 34 Z"
          fill="#3fc2f3"
        />

        {/* Inner Shield (White Field) */}
        <path
          d="M 200 50 C 226 50 248 38 276 60 C 298 76 314 126 314 188 C 314 242 260 288 200 316 C 140 288 86 242 86 188 C 86 126 102 76 124 60 C 152 38 174 50 200 50 Z"
          fill="#ffffff"
          stroke="#171717"
          strokeWidth="3"
        />
      </g>

      {/* ================= MIDDLE ARTWORK (CULTURAL INFUSED HEAD) ================= */}
      <g transform="translate(0, -10)">
        {/* Colorful Mandala Pattern Inside Head Silhouette */}
        {/* Face/Head Silhouette Mask */}
        <mask id="head-mask">
          <path
            d="M 200 135 C 175 135 165 150 165 175 C 165 200 172 210 178 220 C 182 228 185 235 185 245 C 185 255 175 260 160 270 L 160 282 C 180 282 190 275 200 258 C 210 275 220 282 240 282 L 240 270 C 225 260 215 255 215 245 C 215 235 218 228 222 220 C 228 210 235 200 235 175 C 235 150 225 135 200 135 Z"
            fill="#ffffff"
          />
        </mask>

        {/* Head Silhouette Base */}
        <path
          d="M 200 135 C 175 135 165 150 165 175 C 165 200 172 210 178 220 C 182 228 185 235 185 245 C 185 255 175 260 160 270 L 160 282 C 180 282 190 275 200 258 C 210 275 220 282 240 282 L 240 270 C 225 260 215 255 215 245 C 215 235 218 228 222 220 C 228 210 235 200 235 175 C 235 150 225 135 200 135 Z"
          fill="url(#head-grad)"
          stroke="#171717"
          strokeWidth="3.5"
        />

        {/* Mandala Details inside the Head (Masked) */}
        <g mask="url(#head-mask)">
          {/* Central Flower */}
          <circle cx="200" cy="180" r="28" fill="url(#mandala-grad)" stroke="#171717" strokeWidth="1.5" />
          
          {/* Petals */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const rad = (angle * Math.PI) / 180;
            const rx = 200 + Math.cos(rad) * 22;
            const ry = 180 + Math.sin(rad) * 22;
            return (
              <path
                key={i}
                d={`M 200 180 Q ${200 + Math.cos(rad - 0.2) * 35} ${180 + Math.sin(rad - 0.2) * 35} ${rx} ${ry} Q ${200 + Math.cos(rad + 0.2) * 35} ${180 + Math.sin(rad + 0.2) * 35} 200 180 Z`}
                fill={i % 2 === 0 ? "#ff3366" : "#ff9933"}
                stroke="#171717"
                strokeWidth="1"
                opacity="0.85"
              />
            );
          })}

          <circle cx="200" cy="180" r="10" fill="#ffff00" stroke="#171717" strokeWidth="1" />
          <circle cx="200" cy="180" r="4" fill="#ff3300" />

          {/* Lower Neck Patterns */}
          <circle cx="200" cy="245" r="18" fill="#3cd52e" stroke="#171717" strokeWidth="1.5" />
          <path d="M 185 245 Q 200 230 215 245 Q 200 260 185 245 Z" fill="#ff00cc" stroke="#171717" strokeWidth="1" />
          <circle cx="200" cy="245" r="6" fill="#ffffff" />
        </g>

        {/* Outline for the Head to overlay properly */}
        <path
          d="M 200 135 C 175 135 165 150 165 175 C 165 200 172 210 178 220 C 182 228 185 235 185 245 C 185 255 175 260 160 270 L 160 282 C 180 282 190 275 200 258 C 210 275 220 282 240 282 L 240 270 C 225 260 215 255 215 245 C 215 235 218 228 222 220 C 228 210 235 200 235 175 C 235 150 225 135 200 135 Z"
          fill="none"
          stroke="#171717"
          strokeWidth="3.5"
        />

        {/* Cultural Icons Arcing Above the Head */}
        {/* 1. Microphone (Left Bottom) */}
        <g transform="translate(152, 115) scale(0.65)">
          <rect x="-4" y="-8" width="8" height="12" rx="4" fill="#171717" />
          <line x1="0" y1="4" x2="0" y2="12" stroke="#171717" strokeWidth="2.5" />
          <line x1="-3" y1="12" x2="3" y2="12" stroke="#171717" strokeWidth="2" />
          <circle cx="0" cy="-2" r="3" fill="#ffffff" stroke="#171717" strokeWidth="1" />
        </g>

        {/* 2. Theatre Mask (Left Middle) */}
        <g transform="translate(168, 95) scale(0.65)">
          <path d="M -8 -6 C -8 -6 -12 2 -4 8 C -2 9 2 9 4 8 C 12 2 8 -6 8 -6 C 8 -6 4 -4 0 -4 C -4 -4 -8 -6 -8 -6 Z" fill="#171717" />
          <circle cx="-3" cy="-1" r="1.2" fill="#ffffff" />
          <circle cx="3" cy="-1" r="1.2" fill="#ffffff" />
          <path d="M -2 4 Q 0 6 2 4" stroke="#ffffff" strokeWidth="1" fill="none" />
        </g>

        {/* 3. Musical Note 1 (Left Top) */}
        <g transform="translate(190, 84) scale(0.65)">
          <circle cx="-4" cy="4" r="3" fill="#171717" />
          <line x1="-1" y1="4" x2="-1" y2="-6" stroke="#171717" strokeWidth="2" />
          <circle cx="6" cy="1" r="3" fill="#171717" />
          <line x1="9" y1="1" x2="9" y2="-9" stroke="#171717" strokeWidth="2" />
          <path d="M -1 -6 L 9 -9 L 9 -5 L -1 -2 Z" fill="#171717" />
        </g>

        {/* 4. Dancing Figure (Center Top) */}
        <g transform="translate(214, 82) scale(0.65)">
          <circle cx="0" cy="-8" r="3" fill="#171717" />
          {/* Limbs & Body */}
          <path d="M 0 -5 L 0 3 L -5 10 M 0 3 L 5 10" stroke="#171717" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M -6 -2 Q 0 -5 6 -2" stroke="#171717" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* 5. Art Paint Palette (Right Middle) */}
        <g transform="translate(236, 95) scale(0.65)">
          <path d="M -8 0 C -8 -6 0 -10 6 -6 C 12 -2 10 8 4 8 C -2 8 -4 4 -8 0 Z" fill="#171717" />
          <circle cx="-3" cy="-2" r="1" fill="#ff0000" />
          <circle cx="2" cy="-4" r="1" fill="#ffff00" />
          <circle cx="5" cy="0" r="1" fill="#0000ff" />
          <circle cx="-1" cy="3" r="1" fill="#00ff00" />
        </g>

        {/* 6. Open Book (Right Bottom) */}
        <g transform="translate(252, 115) scale(0.65)">
          <path d="M -10 -4 Q -5 -6 0 -3 Q 5 -6 10 -4 L 10 4 Q 5 2 0 5 Q -5 2 -10 4 Z" fill="#171717" />
          <line x1="0" y1="-3" x2="0" y2="5" stroke="#ffffff" strokeWidth="1" />
        </g>
      </g>

      {/* ================= TEXT LABELS (ARCHED) ================= */}

      {/* 1. DHAKA COLLEGE (Top) */}
      <text fontFamily="Impact, sans-serif" fontWeight="900" fontSize="23" fill="#111111" letterSpacing="2.5">
        <textPath href="#arc-top" startOffset="50%" textAnchor="middle">
          DHAKA COLLEGE
        </textPath>
      </text>

      {/* 2. ESTD 2021 (Middle Bottom) */}
      <text fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="13.5" fill="#111111" letterSpacing="2">
        <textPath href="#arc-mid-bottom" startOffset="50%" textAnchor="middle">
          ESTD 2021
        </textPath>
      </text>

      {/* 3. CULTURAL CLUB (Bottom) */}
      <text fontFamily="Impact, sans-serif" fontWeight="900" fontSize="23" fill="#111111" letterSpacing="2">
        <textPath href="#arc-bottom" startOffset="50%" textAnchor="middle">
          CULTURAL CLUB
        </textPath>
      </text>
    </svg>
  );
};
