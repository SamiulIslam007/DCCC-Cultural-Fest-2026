import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { sendTicketEmail } from "@/lib/brevo";
import { ALL_SEGMENTS } from "@/lib/segments-data";
import { verifySessionToken } from "@/lib/auth";

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/resend-ticket
// Re-sends the official ticket/invoice email for an approved registration.
// Body: { invoiceId: string }
// ─────────────────────────────────────────────────────────────────────────────

interface ResendTicketRequestBody {
  invoiceId?: string;
}

interface ResendTicketSuccessResponse {
  success: true;
  message: string;
}

interface ResendTicketErrorResponse {
  success: false;
  error: string;
}

async function isAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return await verifySessionToken(session);
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json<ResendTicketErrorResponse>(
        { success: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as ResendTicketRequestBody;
    const { invoiceId } = body;

    if (!invoiceId || typeof invoiceId !== "string") {
      return NextResponse.json<ResendTicketErrorResponse>(
        { success: false, error: "invoiceId is required." },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.findUnique({
      where: { id: invoiceId },
      include: { segments: true },
    });

    if (!registration) {
      return NextResponse.json<ResendTicketErrorResponse>(
        { success: false, error: "Registration not found." },
        { status: 404 }
      );
    }

    if (registration.status !== "APPROVED") {
      return NextResponse.json<ResendTicketErrorResponse>(
        {
          success: false,
          error: "Ticket emails can only be resent for approved registrations.",
        },
        { status: 400 }
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

    const emailResult = await sendTicketEmail(payload, segmentData);

    await prisma.emailLog.create({
      data: {
        registrationId: registration.id,
        emailType: "TICKET_DELIVERY",
        status: emailResult.success ? "SENT" : "FAILED",
        errorMsg: emailResult.error ?? null,
      },
    });

    if (!emailResult.success) {
      return NextResponse.json<ResendTicketErrorResponse>(
        {
          success: false,
          error: emailResult.error ?? "Failed to send ticket email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json<ResendTicketSuccessResponse>({
      success: true,
      message: `Ticket email resent to ${registration.email}.`,
    });
  } catch (error) {
    console.error("[POST /api/admin/resend-ticket] Error:", error);
    return NextResponse.json<ResendTicketErrorResponse>(
      { success: false, error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
