import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";
import { ALL_SEGMENTS } from "../src/lib/segments-data";

// ─────────────────────────────────────────────────────────────────────────────
// Seed Script — Run with: npx tsx prisma/seed.ts
// Idempotent: safe to re-run; uses upsert so existing data is preserved.
// ─────────────────────────────────────────────────────────────────────────────

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding segments...");

  for (const segment of ALL_SEGMENTS) {
    await prisma.segment.upsert({
      where: { id: segment.id },
      update: {
        name: segment.name,
        subtitle: segment.subtitle,
        type: segment.type,
        fee: segment.fee,
      },
      create: {
        id: segment.id,
        name: segment.name,
        subtitle: segment.subtitle,
        type: segment.type,
        fee: segment.fee,
      },
    });
    console.log(`  ✓ ${segment.type === "ONLINE" ? "🌐" : "🎭"} ${segment.name} (${segment.subtitle})`);
  }

  console.log(`\n✅ Seeded ${ALL_SEGMENTS.length} segments successfully.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
