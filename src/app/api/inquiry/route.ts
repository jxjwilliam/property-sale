import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { listing } from "@/config/listing";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, showingDate, preferredTime, message } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASSWORD;
    const subject = `Showing request — 808-13573 98A Ave (MLS ${listing.mls})`;

    if (!smtpUser || !smtpPass) {
      console.warn("SMTP not configured — inquiry logged:", {
        name,
        email,
        showingDate,
      });
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: smtpUser,
        to: smtpUser,
        replyTo: email,
        subject,
        html: `
          <h2>New showing request</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Showing date</td><td style="padding:8px;border:1px solid #ddd">${showingDate || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Preferred time</td><td style="padding:8px;border:1px solid #ddd">${preferredTime || "—"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${message || "—"}</td></tr>
          </table>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send inquiry email:", error);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
