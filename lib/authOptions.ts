import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import User,{ IUser } from "./database/models/User";
import { connectToDatabase } from "./database/mongodb";
import { Account, Profile, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

connectToDatabase();

export const authOptions = {
  
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
        name: "Credentials",

        credentials: {
            email: {label: "Email", type: "text", placeholder: "example@gmail.com"},
            password: {label: "Password", type: "password"},
        },
        authorize: async (credentials, req) => {
            const email = credentials?.email;
            const password = credentials?.password;
            
            if (!email || !password) {
                throw new Error("Please enter both email and password.");
            }

            const user = await User.findOne({ email });
            if (!user) {
              throw new Error("This email does not exist.");
            }
          
            return await SignInUser({ password, user });
        }
    })
    ],
    callbacks: {
        async session({ session, token }:{
            session: Session;
            token: JWT
        }) {
            let user = await User.findById(token.sub);
            session.user.id = token.sub || user._id.toSting();
            session.user.role = user.role || "user";
            token.role = user.role || "user";
            return session;
        },
    },
      
    pages:{
        signIn: "/sign-in",
    },
    secret: process.env.JWT_SECRET,
};

const SignInUser = async ({
    password,
    user,
  }: {
    password: string;
    user: IUser;
  }): Promise<{ id: string; name?: string; email: string; image?: string } | null> => {
    if (!user.password) {
      throw new Error("Please enter your password.");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Email or password is wrong!");
    }
  
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
    };
  };