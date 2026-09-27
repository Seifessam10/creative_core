import { NextRequest, NextResponse } from "next/server";
import { inquirySchema, renderInquiryEmail } from "@/lib/inquiry";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

function generateRef(): string {
  return `CC-${Math.floor(1000 + Math.random() * 9000)}`;
}

/**
 * Inquiry submission endpoint (PRD §5/§6): validate -> spam/rate-limit ->
 * email the configured business inbox -> optional WhatsApp notification ->
 * respond. No email/WhatsApp provider credentials ever reach the client;
 * they're read here from environment variables only.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, message: first?.message ?? "Some answers are still missing above." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: a real visitor never fills this hidden field.
  if (data.hp) {
    return NextResponse.json({ ok: true, ref: generateRef() });
  }

  const ref = generateRef();
  const emailBody = renderInquiryEmail(data, ref);

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const INQUIRY_TO_EMAIL = process.env.INQUIRY_TO_EMAIL;

  if (RESEND_API_KEY && INQUIRY_TO_EMAIL) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.INQUIRY_FROM_EMAIL || "Creative Core <onboarding@resend.dev>",
        to: INQUIRY_TO_EMAIL,
        replyTo: data.email,
        subject: `New project inquiry — ${ref}`,
        text: emailBody,
      });
    } catch (err) {
      console.error("[inquiry] email send failed", err);
      return NextResponse.json(
        { ok: false, message: "Your answers are still here. Nothing was lost — try sending again." },
        { status: 502 },
      );
    }
  } else {
    // No email provider configured yet — log so the flow is fully testable
    // locally, and flag the missing config rather than failing the visitor.
    console.log(`[inquiry] RESEND_API_KEY/INQUIRY_TO_EMAIL not set — logging inquiry ${ref} instead:\n${emailBody}`);
  }

  const WHATSAPP_TOKEN = process.env.WHATSAPP_API_TOKEN;
  const WHATSAPP_TO = process.env.WHATSAPP_NOTIFY_NUMBER;
  if (WHATSAPP_TOKEN && WHATSAPP_TO) {
    try {
      // Placeholder for an approved WhatsApp Business API/provider call
      // (PRD §5 step 5). Never automate a personal WhatsApp Web session.
      console.log(`[inquiry] would notify WhatsApp ${WHATSAPP_TO} of inquiry ${ref}`);
    } catch (err) {
      console.error("[inquiry] WhatsApp notification failed (non-fatal)", err);
    }
  }

  return NextResponse.json({ ok: true, ref });
}
