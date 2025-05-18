import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const data = await req.json();

  const {
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
  } = data;

  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // e.g., smtp.gmail.com or from your host
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const mailOptions = {
  from: `"${firstName} ${lastName}" <${email}>`,
  to: process.env.ADMIN_EMAIL!,
  subject: `Contact Form: ${subject}`,
  html: `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
      <div style="padding: 24px; border-bottom: 1px solid #eee;">
        <h2 style="margin: 0; color: #333;">📩 New Contact Form Submission</h2>
      </div>
      <div style="padding: 24px;">
        <p style="margin: 0 0 16px 0; color: #555;"><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p style="margin: 0 0 16px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1a73e8;">${email}</a></p>
        <p style="margin: 0 0 16px 0; color: #555;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin: 0 0 16px 0; color: #555;"><strong>Subject:</strong> ${subject}</p>
        <hr style="margin: 24px 0;">
        <p style="margin: 0 0 8px 0; color: #555;"><strong>Message:</strong></p>
        <p style="white-space: pre-line; color: #333;">${message}</p>
      </div>
      <div style="padding: 16px 24px; background: #f1f1f1; text-align: center; font-size: 12px; color: #999;">
        This message was sent from the contact form on your website.
      </div>
    </div>
  </div>
  `,
};


  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}
