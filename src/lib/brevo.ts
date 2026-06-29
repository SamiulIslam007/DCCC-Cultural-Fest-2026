// ─────────────────────────────────────────────────────────────────────────────
// Brevo Email Service
// Uses the Brevo REST API directly (no SDK) — zero extra dependencies.
// Daily free-tier limit: 300 emails/day. Errors are caught gracefully.
// ─────────────────────────────────────────────────────────────────────────────

import { SegmentData } from "./segments-data";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

interface RegistrationPayload {
  id: string; // Invoice ID
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  classOrYear: string;
  totalAmount: number;
  bkashOrNogodNumber: string;
  trxId: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

// ── Internal helper ───────────────────────────────────────────────────────────

async function sendBrevoEmail(payload: {
  subject: string;
  toEmail: string;
  toName: string;
  htmlContent: string;
}): Promise<EmailResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? "DCCC Cultural Fiesta 2026";

  if (!apiKey || apiKey === "your_brevo_api_key_here") {
    console.warn("[Brevo] API key not configured — email skipped.");
    return { success: false, error: "Brevo API key not configured" };
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: payload.toEmail, name: payload.toName }],
        subject: payload.subject,
        htmlContent: payload.htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Brevo] API error ${response.status}:`, errorText);
      return { success: false, error: `HTTP ${response.status}: ${errorText}` };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error("[Brevo] Fetch failed:", message);
    return { success: false, error: message };
  }
}

// ── Email 1: Instant Registration Confirmation ────────────────────────────────

export async function sendConfirmationEmail(
  registration: RegistrationPayload,
  segments: SegmentData[]
): Promise<EmailResult> {
  const segmentRows = segments
    .map(
      (s) => `
      <tr>
        <td style="padding:10px 14px;color:#e0e0e0;font-size:13px;border-bottom:1px solid #1e1e1e;">${s.emoji} ${s.name}</td>
        <td style="padding:10px 14px;color:#a0a0a0;font-size:12px;border-bottom:1px solid #1e1e1e;">${s.subtitle}</td>
        <td style="padding:10px 14px;color:#C8963E;font-size:13px;font-weight:700;border-bottom:1px solid #1e1e1e;text-align:right;">৳${s.fee}</td>
      </tr>`
    )
    .join("");

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Registration Confirmed — DCCC Cultural Fiesta 2026</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111111;border:1px solid #2a2a2a;border-radius:4px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#160000 0%,#111111 100%);padding:36px 40px;text-align:center;border-bottom:2px solid #C05A46;">
            <p style="margin:0 0 8px;color:#C8963E;font-size:10px;letter-spacing:6px;font-weight:700;text-transform:uppercase;">DCCC PRESENTS</p>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:900;letter-spacing:3px;text-transform:uppercase;">4th DCCC Cultural Fiesta</h1>
            <p style="margin:10px 0 0;color:#C8963E;font-size:11px;letter-spacing:4px;font-weight:600;">REVOLUTION 2.0 — 2026</p>
          </td>
        </tr>

        <!-- Success Badge -->
        <tr>
          <td style="padding:32px 40px 0;text-align:center;">
            <div style="display:inline-block;background:#0d1a00;border:1px solid #2d5a27;border-radius:50%;width:64px;height:64px;line-height:64px;font-size:28px;">✓</div>
            <h2 style="margin:16px 0 6px;color:#ffffff;font-size:20px;font-weight:800;letter-spacing:1px;">Registration Confirmed!</h2>
            <p style="margin:0;color:#888;font-size:13px;">Your application has been received successfully.</p>
          </td>
        </tr>

        <!-- Invoice ID -->
        <tr>
          <td style="padding:24px 40px;">
            <div style="background:#0d0d0d;border:1px solid #2a2a2a;border-left:3px solid #C8963E;padding:16px 20px;border-radius:2px;">
              <p style="margin:0 0 4px;color:#888;font-size:10px;letter-spacing:4px;font-weight:700;text-transform:uppercase;">Invoice / Registration ID</p>
              <p style="margin:0;color:#C8963E;font-size:22px;font-weight:900;letter-spacing:2px;font-family:monospace;">${registration.id}</p>
            </div>
          </td>
        </tr>

        <!-- Personal Details -->
        <tr>
          <td style="padding:0 40px 24px;">
            <p style="margin:0 0 12px;color:#C8963E;font-size:10px;letter-spacing:4px;font-weight:700;text-transform:uppercase;">Your Details</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#888;font-size:12px;width:140px;">Full Name</td><td style="padding:8px 0;color:#e0e0e0;font-size:13px;font-weight:600;">${registration.fullName}</td></tr>
              <tr><td style="padding:8px 0;color:#888;font-size:12px;">Email</td><td style="padding:8px 0;color:#e0e0e0;font-size:13px;">${registration.email}</td></tr>
              <tr><td style="padding:8px 0;color:#888;font-size:12px;">Phone</td><td style="padding:8px 0;color:#e0e0e0;font-size:13px;">${registration.phone}</td></tr>
              <tr><td style="padding:8px 0;color:#888;font-size:12px;">Institution</td><td style="padding:8px 0;color:#e0e0e0;font-size:13px;">${registration.institution}</td></tr>
            </table>
          </td>
        </tr>

        <!-- Registered Segments -->
        <tr>
          <td style="padding:0 40px 24px;">
            <p style="margin:0 0 12px;color:#C8963E;font-size:10px;letter-spacing:4px;font-weight:700;text-transform:uppercase;">Registered Segments</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #2a2a2a;">
              <tr style="background:#161616;">
                <th style="padding:10px 14px;color:#888;font-size:10px;letter-spacing:3px;font-weight:700;text-align:left;text-transform:uppercase;">Segment</th>
                <th style="padding:10px 14px;color:#888;font-size:10px;letter-spacing:3px;font-weight:700;text-align:left;text-transform:uppercase;">Event Type</th>
                <th style="padding:10px 14px;color:#888;font-size:10px;letter-spacing:3px;font-weight:700;text-align:right;text-transform:uppercase;">Fee</th>
              </tr>
              ${segmentRows}
              <tr style="background:#161616;">
                <td colspan="2" style="padding:12px 14px;color:#ffffff;font-size:13px;font-weight:700;text-align:right;">Total Amount</td>
                <td style="padding:12px 14px;color:#C8963E;font-size:16px;font-weight:900;text-align:right;">৳${registration.totalAmount}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Payment Status -->
        <tr>
          <td style="padding:0 40px 24px;">
            <div style="background:#130600;border:1px solid #4a2200;border-left:3px solid #C05A46;padding:16px 20px;border-radius:2px;">
              <p style="margin:0 0 6px;color:#C05A46;font-size:11px;letter-spacing:3px;font-weight:700;text-transform:uppercase;">⏳ Payment Under Review</p>
              <p style="margin:0;color:#bbb;font-size:13px;line-height:1.6;">Your payment (TxnID: <strong style="color:#e0e0e0;font-family:monospace;">${registration.trxId}</strong>) is currently pending verification by our team. You will be notified once approved.</p>
            </div>
          </td>
        </tr>

        <!-- Ticket Notice -->
        <tr>
          <td style="padding:0 40px 24px;">
            <div style="background:#0a1a0a;border:1px solid #2d5a27;padding:16px 20px;border-radius:2px;text-align:center;">
              <p style="margin:0;color:#88cc88;font-size:13px;line-height:1.6;">🎟️ <strong>Your entry ticket will be sent to this email before the fest starts.</strong><br>Please keep this email safe as your proof of registration.</p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0d0d0d;padding:24px 40px;border-top:1px solid #1e1e1e;text-align:center;">
            <p style="margin:0 0 6px;color:#555;font-size:11px;">© 2026 Dhaka College Cultural Club. All rights reserved.</p>
            <p style="margin:0;color:#555;font-size:11px;">4th DCCC National Cultural Fiesta — Revolution 2.0</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return sendBrevoEmail({
    subject: `Registration Confirmed — DCCC Fiesta 2026 | Invoice #${registration.id}`,
    toEmail: registration.email,
    toName: registration.fullName,
    htmlContent,
  });
}

// ── Email 2: Ticket Delivery (sent on Admin Approval) ─────────────────────────

export async function sendTicketEmail(
  registration: RegistrationPayload,
  segments: SegmentData[]
): Promise<EmailResult> {
  const segmentList = segments
    .map(
      (s) =>
        `<li style="padding:8px 0;border-bottom:1px solid #1e1e1e;color:#e0e0e0;font-size:13px;">${s.emoji} <strong>${s.name}</strong> — ${s.subtitle}</li>`
    )
    .join("");

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Entry Ticket — DCCC Cultural Fiesta 2026</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111111;border:1px solid #2a2a2a;border-radius:4px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#160000 0%,#111111 100%);padding:36px 40px;text-align:center;border-bottom:2px solid #C05A46;">
            <p style="margin:0 0 8px;color:#C8963E;font-size:10px;letter-spacing:6px;font-weight:700;text-transform:uppercase;">DCCC PRESENTS</p>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:900;letter-spacing:3px;text-transform:uppercase;">4th DCCC Cultural Fiesta</h1>
            <p style="margin:10px 0 0;color:#C8963E;font-size:11px;letter-spacing:4px;font-weight:600;">REVOLUTION 2.0 — 2026</p>
          </td>
        </tr>

        <!-- Ticket Header -->
        <tr>
          <td style="padding:32px 40px 24px;text-align:center;border-bottom:2px dashed #2a2a2a;">
            <p style="margin:0 0 6px;color:#C8963E;font-size:10px;letter-spacing:5px;font-weight:700;text-transform:uppercase;">🎟️ Entry Ticket — Approved</p>
            <h2 style="margin:0;color:#ffffff;font-size:22px;font-weight:900;">Your payment has been verified!</h2>
            <p style="margin:8px 0 0;color:#888;font-size:13px;">Welcome to Revolution 2.0, ${registration.fullName}!</p>
          </td>
        </tr>

        <!-- Ticket Body -->
        <tr>
          <td style="padding:28px 40px;">

            <!-- Invoice ID (prominent) -->
            <div style="background:#0d0d0d;border:2px solid #C8963E;padding:20px;text-align:center;margin-bottom:24px;">
              <p style="margin:0 0 6px;color:#888;font-size:10px;letter-spacing:4px;font-weight:700;text-transform:uppercase;">Invoice / Registration ID</p>
              <p style="margin:0;color:#C8963E;font-size:28px;font-weight:900;letter-spacing:3px;font-family:monospace;">${registration.id}</p>
              <p style="margin:8px 0 0;color:#555;font-size:11px;">Present this ID at the event check-in desk</p>
            </div>

            <!-- Participant Info -->
            <p style="margin:0 0 12px;color:#C8963E;font-size:10px;letter-spacing:4px;font-weight:700;text-transform:uppercase;">Participant Details</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr><td style="padding:7px 0;color:#888;font-size:12px;width:130px;">Name</td><td style="padding:7px 0;color:#e0e0e0;font-size:13px;font-weight:700;">${registration.fullName}</td></tr>
              <tr><td style="padding:7px 0;color:#888;font-size:12px;">Email</td><td style="padding:7px 0;color:#e0e0e0;font-size:13px;">${registration.email}</td></tr>
              <tr><td style="padding:7px 0;color:#888;font-size:12px;">Phone</td><td style="padding:7px 0;color:#e0e0e0;font-size:13px;">${registration.phone}</td></tr>
              <tr><td style="padding:7px 0;color:#888;font-size:12px;">Institution</td><td style="padding:7px 0;color:#e0e0e0;font-size:13px;">${registration.institution}</td></tr>
              <tr><td style="padding:7px 0;color:#888;font-size:12px;">Class / Year</td><td style="padding:7px 0;color:#e0e0e0;font-size:13px;">${registration.classOrYear}</td></tr>
            </table>

            <!-- Approved Segments -->
            <p style="margin:0 0 12px;color:#C8963E;font-size:10px;letter-spacing:4px;font-weight:700;text-transform:uppercase;">✓ Approved Segments (${segments.length})</p>
            <ul style="margin:0 0 24px;padding:0;list-style:none;border:1px solid #2a2a2a;">
              ${segmentList}
            </ul>

            <!-- Total -->
            <div style="background:#161616;border:1px solid #2a2a2a;padding:16px;display:flex;justify-content:space-between;margin-bottom:24px;">
              <span style="color:#888;font-size:13px;">Total Amount Paid</span>
              <span style="color:#C8963E;font-size:18px;font-weight:900;">৳${registration.totalAmount}</span>
            </div>

            <!-- Event Info -->
            <div style="background:#0a1a0a;border:1px solid #2d5a27;padding:16px 20px;text-align:center;">
              <p style="margin:0 0 4px;color:#88cc88;font-size:12px;font-weight:700;">📅 4th DCCC National Cultural Fiesta 2026</p>
              <p style="margin:0;color:#666;font-size:12px;">Dhaka College, Mirpur Rd, Dhanmondi, Dhaka 1205</p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0d0d0d;padding:24px 40px;border-top:1px solid #1e1e1e;text-align:center;">
            <p style="margin:0 0 6px;color:#555;font-size:11px;">© 2026 Dhaka College Cultural Club. All rights reserved.</p>
            <p style="margin:0;color:#555;font-size:11px;">This is an auto-generated ticket. Please print or save this email.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return sendBrevoEmail({
    subject: `🎟️ Your Entry Ticket — DCCC Fiesta 2026 | Invoice #${registration.id}`,
    toEmail: registration.email,
    toName: registration.fullName,
    htmlContent,
  });
}
