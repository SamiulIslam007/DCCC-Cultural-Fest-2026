// ─────────────────────────────────────────────────────────────────────────────
// Canonical Segment Data — Single source of truth for both the DB seed and
// the registration form UI. IDs here MUST match what is seeded in prisma/seed.ts
// ─────────────────────────────────────────────────────────────────────────────

export type SegmentType = "ONLINE" | "OFFLINE";

export interface SegmentData {
  id: string;
  name: string;
  subtitle: string; // English subtitle / event type
  type: SegmentType;
  fee: number; // BDT
  description: string;
  emoji: string;
}

// ── Offline Segments (Physical attendance at venue) ───────────────────────────
export const OFFLINE_SEGMENTS: SegmentData[] = [
  {
    id: "seg-ink-fire",
    name: "Ink & Fire",
    subtitle: "Superpower Writing",
    type: "OFFLINE",
    fee: 50,
    description:
      "When you need more than words — ignite the heartbeat of struggle through the superpower of writing. Capture stories of courage, identity, and the untold journeys of heroes.",
    emoji: "🖊️",
  },
  {
    id: "seg-rebels-lens",
    name: "Rebel's Lens",
    subtitle: "Photography",
    type: "OFFLINE",
    fee: 50,
    description:
      "Through the eye of today, moments of courage are immortalized. Show the revolution through powerful frames that reflect courage, royalty, and expression.",
    emoji: "📸",
  },
  {
    id: "seg-voice-revolution",
    name: "Voice of Revolution",
    subtitle: "Spoken Word / Contemporary",
    type: "OFFLINE",
    fee: 50,
    description:
      "Unshackled voices, bearing the fire of change. Speak spontaneously, ignite minds, and let your voice become a beacon of energy.",
    emoji: "🎤",
  },
  {
    id: "seg-bluyer-shur-a",
    name: "Bluyer Shur (Category A)",
    subtitle: "Singing — Solo",
    type: "OFFLINE",
    fee: 50,
    description:
      "Soul that returns the melody of hope — perform classical, original pieces, or patriotic songs that celebrate strength, bravery, and self-expression.",
    emoji: "🎵",
  },
  {
    id: "seg-bluyer-shur-b",
    name: "Bluyer Shur (Category B)",
    subtitle: "Singing — Group / Band",
    type: "OFFLINE",
    fee: 50,
    description:
      "Perform imagination confronts reality — group arrangements from the rebellion tradition, pieces that harmonise voices and stories.",
    emoji: "🎶",
  },
  {
    id: "seg-verses-revolt",
    name: "Verses of Revolt",
    subtitle: "Poetry Recitation",
    type: "OFFLINE",
    fee: 50,
    description:
      "Silent verses that speak louder than words. Recite poems that reflect struggle, resilience, and the light of hope.",
    emoji: "📜",
  },
  {
    id: "seg-step-glory",
    name: "Step to Glory",
    subtitle: "Dance",
    type: "OFFLINE",
    fee: 50,
    description:
      "Every step tells a story of freedom. Move with rhythm, creativity, and energy that celebrates courage on the grandest stage.",
    emoji: "💃",
  },
];

// ── Online Segments (Managed via official Facebook Event Page) ────────────────
export const ONLINE_SEGMENTS: SegmentData[] = [
  {
    id: "seg-digital-lens",
    name: "Digital Lens",
    subtitle: "Online Photography",
    type: "ONLINE",
    fee: 50,
    description:
      "Capture the unseen through your digital lens and submit online. Judged on composition, storytelling, and creative expression.",
    emoji: "🌐",
  },
  {
    id: "seg-echo-write",
    name: "Echo Write",
    subtitle: "Online Creative Writing",
    type: "ONLINE",
    fee: 50,
    description:
      "Write powerful essays, short stories or poetry and submit digitally. Your words can echo across the nation.",
    emoji: "✍️",
  },
  {
    id: "seg-pixel-canvas",
    name: "Pixel Canvas",
    subtitle: "Online Digital Art",
    type: "ONLINE",
    fee: 50,
    description:
      "Express your artistic vision through digital painting, illustration or graphic design and submit online for judging.",
    emoji: "🎨",
  },
];

export const ALL_SEGMENTS: SegmentData[] = [
  ...OFFLINE_SEGMENTS,
  ...ONLINE_SEGMENTS,
];

export const SEGMENT_FEE = 50; // BDT per segment
