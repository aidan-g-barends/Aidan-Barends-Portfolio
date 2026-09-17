import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const { name, email, message, company } = await request.json();

    // Honeypot field: real visitors never fill this in.
    if (company) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "aidanbarends95@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0B0F14; margin-top: 0;">New message from your portfolio</h2>
          <p style="color: #57626F; font-size: 14px; margin-bottom: 24px;">
            Someone reached out through your contact form.
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #57626F; font-size: 13px; font-weight: bold; width: 80px;">Name</td>
              <td style="padding: 8px 0; color: #0B0F14; font-size: 14px;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #57626F; font-size: 13px; font-weight: bold;">Email</td>
              <td style="padding: 8px 0; color: #0B0F14; font-size: 14px;">${safeEmail}</td>
            </tr>
          </table>
          <div style="background-color: #F7F9FB; border-radius: 8px; padding: 16px;">
            <p style="color: #57626F; font-size: 13px; font-weight: bold; margin: 0 0 8px 0;">Message</p>
            <p style="color: #0B0F14; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
