import bcrypt from "bcrypt";
import { validateEmail } from "@/utils/validation";
import { connectToDatabase } from "@/lib/database/mongodb";
import User from "@/lib/database/models/User";
import { createActivationToken } from "@/utils/tokens";
import { sendEmail } from "@/utils/sendEmails";
import { activateEmailTemplate } from "@/emails/activateEmailTemplate";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "Please fill in all fields." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ message: "Invalid email." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "This email already exists." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({ message: "Password must be at least 6 characters." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = createActivationToken({ id: newUser._id.toString() });
    const url = `${process.env.BASE_URL}/activate/${token}`;

    const html = activateEmailTemplate(name, url);
    await sendEmail(email, "Activate your account", html);

    return new Response(
      JSON.stringify({ message: "Register success! Please activate your email to start." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
