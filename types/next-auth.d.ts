// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role?: string;
      name?: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string;
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role?: string;
    name?: string;
    image?: string;
  }
}

