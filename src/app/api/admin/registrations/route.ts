import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/registrations
// Returns paginated registration list with segments and latest email log.
// Query params: ?segment=&status=&page=&limit=
// ─────────────────────────────────────────────────────────────────────────────

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return await verifySessionToken(session);
}

export async function GET(request: NextRequest) {
  if (!(await isAuthorized())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);

  const segmentFilter = searchParams.get("segment") || "";
  const statusFilter = searchParams.get("status") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "50", 10));

  try {
    const where: Record<string, unknown> = {};

    if (statusFilter && ["PENDING", "APPROVED", "REJECTED"].includes(statusFilter)) {
      where.status = statusFilter;
    }

    if (segmentFilter) {
      where.segments = { some: { id: segmentFilter } };
    }

    const [total, registrations] = await Promise.all([
      prisma.registration.count({ where }),
      prisma.registration.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          segments: true,
          emailLogs: {
            orderBy: { sentAt: "desc" },
            take: 5, // Latest 5 email logs per registration
          },
        },
      }),
    ]);

    // Aggregate stats (always from full dataset regardless of filter)
    const stats = await prisma.registration.groupBy({
      by: ["status"],
      _count: { _all: true },
    });

    const statMap = { PENDING: 0, APPROVED: 0, REJECTED: 0 };
    for (const s of stats) {
      statMap[s.status as keyof typeof statMap] = s._count._all;
    }

    return NextResponse.json({
      success: true,
      data: registrations,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
      stats: { ...statMap, total: statMap.PENDING + statMap.APPROVED + statMap.REJECTED },
    });
  } catch (error) {
    console.error("[GET /api/admin/registrations] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch registrations." },
      { status: 500 }
    );
  }
}
