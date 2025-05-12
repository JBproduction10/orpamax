// /app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import User from "@/lib/database/models/User";
import sendEmail from "@/utils/sendEmails"; // your utility to send email
import crypto from "crypto";

export async function POST(req: Request) {
  await connectToDatabase();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetCode = resetCode;
  await user.save();

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?email=${encodeURIComponent(email)}`;

  const emailContent = `
    <p>Hello,</p>
    <p>You requested a password reset. Here is your reset code:</p>
    <h2>${resetCode}</h2>
    <p>Or click the link below to reset your password:</p>
    <a href="${resetLink}" target="_blank">${resetLink}</a>
    <p>If you didn’t request this, you can ignore this email.</p>
  `;

  await sendEmail(
  email,
  "Password Reset Instructions",
  emailContent // This should be plain text or HTML depending on your `sendEmail` config
);

  return NextResponse.json({
    message: "Reset code and link sent to your email.",
  });
}
