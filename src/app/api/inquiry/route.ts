import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getInquiryEmailTemplate } from "@/i18n/inquiry-email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, showingDate, preferredTime, message, locale } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASSWORD;
    const { subject, html } = getInquiryEmailTemplate(locale, {
      name: name.trim(),
      email: email.trim(),
      phone,
      showingDate,
      preferredTime,
      message,
    });

    if (!smtpUser || !smtpPass) {
      console.warn("SMTP not configured — inquiry logged:", {
        name,
        email,
        showingDate,
        locale,
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
        html,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send inquiry email:", error);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
