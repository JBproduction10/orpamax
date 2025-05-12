// lib/sendEmail.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendEmail(to: string, subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: `"Orpamax Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html, // <-- use html instead of text
    });
    console.log("Email sent to", to);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}
