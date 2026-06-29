import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail } from "@/lib/brevo";
import { ALL_SEGMENTS } from "@/lib/segments-data";

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/register
// Creates a new registration, triggers Email 1 (confirmation), and logs it.
// ─────────────────────────────────────────────────────────────────────────────

function generateInvoiceId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const random = Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `REV2026-${random}`;
}

async function getUniqueInvoiceId(): Promise<string> {
  for (let i = 0; i < 5; i++) {
    const id = generateInvoiceId();
    const existing = await prisma.registration.findUnique({ where: { id } });
    if (!existing) return id;
  }
  throw new Error("Failed to generate a unique invoice ID after 5 attempts.");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      institution,
      classOrYear,
      additionalNote,
      bkashOrNogodNumber,
      trxId,
      screenshotUrl,
      segmentIds,
    } = body;

    // ── Validation ──────────────────────────────────────────────────────────
    const required: Record<string, string> = {
      fullName,
      email,
      phone,
      institution,
      classOrYear,
      bkashOrNogodNumber,
      trxId,
      screenshotUrl,
    };

    for (const [field, value] of Object.entries(required)) {
      if (!value?.trim()) {
        return NextResponse.json(
          { success: false, error: `Field '${field}' is required.` },
          { status: 400 }
        );
      }
    }

    if (!Array.isArray(segmentIds) || segmentIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please select at least one segment." },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Validate segment IDs against known segments
    const validSegmentIds = new Set(ALL_SEGMENTS.map((s) => s.id));
    const invalidIds = segmentIds.filter((id: string) => !validSegmentIds.has(id));
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { success: false, error: `Invalid segment IDs: ${invalidIds.join(", ")}` },
        { status: 400 }
      );
    }

    // ── Calculate total amount ───────────────────────────────────────────────
    const selectedSegments = ALL_SEGMENTS.filter((s) => segmentIds.includes(s.id));
    const totalAmount = selectedSegments.reduce((sum, s) => sum + s.fee, 0);

    // ── Create DB record ─────────────────────────────────────────────────────
    const invoiceId = await getUniqueInvoiceId();

    let registration;
    try {
      registration = await prisma.registration.create({
        data: {
          id: invoiceId,
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          institution: institution.trim(),
          classOrYear: classOrYear.trim(),
          additionalNote: additionalNote?.trim() || null,
          bkashOrNogodNumber: bkashOrNogodNumber.trim(),
          trxId: trxId.trim(),
          screenshotUrl,
          totalAmount,
          segments: {
            connect: segmentIds.map((id: string) => ({ id })),
          },
        },
      });
    } catch (dbError: unknown) {
      // P2002 = Unique constraint violation (trxId already used)
      if (
        typeof dbError === "object" &&
        dbError !== null &&
        "code" in dbError &&
        (dbError as { code: string }).code === "P2002"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "This Transaction ID has already been used. Please check your TxnID and try again.",
          },
          { status: 409 }
        );
      }
      throw dbError;
    }

    // ── Send confirmation email (Email 1) — non-blocking error handling ──────
    const emailResult = await sendConfirmationEmail(
      {
        id: registration.id,
        fullName: registration.fullName,
        email: registration.email,
        phone: registration.phone,
        institution: registration.institution,
        classOrYear: registration.classOrYear,
        totalAmount: registration.totalAmount,
        bkashOrNogodNumber: registration.bkashOrNogodNumber,
        trxId: registration.trxId,
      },
      selectedSegments
    );

    // ── Log email attempt ────────────────────────────────────────────────────
    await prisma.emailLog.create({
      data: {
        registrationId: registration.id,
        emailType: "INITIAL_REGISTRATION_CONFIRMATION",
        status: emailResult.success ? "SENT" : "FAILED",
        errorMsg: emailResult.error ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      invoiceId: registration.id,
      totalAmount: registration.totalAmount,
      segmentCount: selectedSegments.length,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("[POST /api/register] Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
