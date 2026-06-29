import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendConfirmationEmail, sendTicketEmail } from "@/lib/brevo";
import { ALL_SEGMENTS } from "@/lib/segments-data";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/retry-email
// Manually re-sends a previously FAILED email. Useful when Brevo daily limit
// was hit and you want to retry the next day.
// Body: { registrationId, emailType: "INITIAL_REGISTRATION_CONFIRMATION" | "TICKET_DELIVERY" }
// ─────────────────────────────────────────────────────────────────────────────

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return await verifySessionToken(session);
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json(
        { success: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { registrationId, emailType } = body;

    const validTypes = [
      "INITIAL_REGISTRATION_CONFIRMATION",
      "TICKET_DELIVERY",
    ] as const;

    if (!registrationId || !validTypes.includes(emailType)) {
      return NextResponse.json(
        { success: false, error: "Invalid registrationId or emailType." },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: { segments: true },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, error: "Registration not found." },
        { status: 404 }
      );
    }

    const segmentData = ALL_SEGMENTS.filter((s) =>
      registration.segments.some((seg) => seg.id === s.id)
    );

    const payload = {
      id: registration.id,
      fullName: registration.fullName,
      email: registration.email,
      phone: registration.phone,
      institution: registration.institution,
      classOrYear: registration.classOrYear,
      totalAmount: registration.totalAmount,
      bkashOrNogodNumber: registration.bkashOrNogodNumber,
      trxId: registration.trxId,
    };

    // ── Attempt the email re-send ─────────────────────────────────────────
    const emailResult =
      emailType === "INITIAL_REGISTRATION_CONFIRMATION"
        ? await sendConfirmationEmail(payload, segmentData)
        : await sendTicketEmail(payload, segmentData);

    // ── Log this new attempt ──────────────────────────────────────────────
    const newLog = await prisma.emailLog.create({
      data: {
        registrationId: registration.id,
        emailType,
        status: emailResult.success ? "SENT" : "FAILED",
        errorMsg: emailResult.error ?? null,
      },
    });

    return NextResponse.json({
      success: emailResult.success,
      log: newLog,
      error: emailResult.error,
    });
  } catch (error) {
    console.error("[POST /api/admin/retry-email] Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
