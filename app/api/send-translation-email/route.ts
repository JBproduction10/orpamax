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

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });

    const emailBody = `
📝 *New Translation Request*

📌 **Details**:
- **From**: ${languageFrom}
- **To**: ${languageTo}
- **Document Type**: ${documentType}
- **Urgency**: ${urgency}
- **Estimated Word Count**: ${wordCount}

📅 Submitted on: ${new Date().toLocaleString()}
    `.trim();

    const mailOptions = {
      from: `"Orpamax Translations" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '📥 New Translation Booking Received',
      text: emailBody,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
