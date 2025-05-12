import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database/mongodb";
import User from "@/lib/database/models/User";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, resetCode, newPassword } = await req.json();

  const user = await User.findOne({ email });

  if (
    !user ||
    !user.resetCode ||
    user.resetCode.data !== resetCode ||
    new Date() > new Date(user.resetCode.expiresAt)
  ) {
    return NextResponse.json({ error: "Invalid or expired reset code" }, { status: 400 });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetCode = undefined;
  await user.save();

  return NextResponse.json({ message: "Password successfully reset." });
}
