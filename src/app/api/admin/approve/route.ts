import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTicketEmail } from "@/lib/brevo";
import { ALL_SEGMENTS } from "@/lib/segments-data";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/approve
// Approves or rejects a registration. On approval, sends Email 2 (ticket).
// Body: { registrationId, action: "APPROVE" | "REJECT" }
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
    const { registrationId, action } = body;

    if (!registrationId || !["APPROVE", "REJECT"].includes(action)) {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
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

    const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";

    const updated = await prisma.registration.update({
      where: { id: registrationId },
      data: { status: newStatus },
      include: { segments: true, emailLogs: { orderBy: { sentAt: "desc" }, take: 5 } },
    });

    // ── On approval → send ticket email (Email 2) ─────────────────────────
    if (action === "APPROVE") {
      const segmentData = ALL_SEGMENTS.filter((s) =>
        registration.segments.some((seg) => seg.id === s.id)
      );

      const emailResult = await sendTicketEmail(
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
        segmentData
      );

      // Log the ticket delivery attempt
      await prisma.emailLog.create({
        data: {
          registrationId: registration.id,
          emailType: "TICKET_DELIVERY",
          status: emailResult.success ? "SENT" : "FAILED",
          errorMsg: emailResult.error ?? null,
        },
      });

      // Re-fetch with the new email log
      const finalUpdated = await prisma.registration.findUnique({
        where: { id: registrationId },
        include: {
          segments: true,
          emailLogs: { orderBy: { sentAt: "desc" }, take: 5 },
        },
      });

      return NextResponse.json({
        success: true,
        data: finalUpdated,
        emailSent: emailResult.success,
        emailError: emailResult.error,
      });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[POST /api/admin/approve] Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
