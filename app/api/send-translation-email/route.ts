// app/api/send-translation-email/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const {
      languageFrom,
      languageTo,
      documentType,
      urgency,
      wordCount,
    } = await req.json();

    if (!languageFrom || !languageTo || !documentType || !urgency || !wordCount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailBody = `
New Translation Request:

From: ${languageFrom}
To: ${languageTo}
Document Type: ${documentType}
Urgency: ${urgency}
Word Count: ${wordCount}
Submitted on: ${new Date().toLocaleString()}
    `.trim();

    await transporter.sendMail({
      from: `"Orpamax Translations" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '📥 New Translation Booking Received',
      text: emailBody,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Email sending failed:', error.message, error.response?.data || '');
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
