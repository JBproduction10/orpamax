// types/user.ts
export interface IUser {
    _id: string;
    name: string;
    email: string;
    image?: string;
    // exclude sensitive fields like password, resetCode, etc.
  }
  