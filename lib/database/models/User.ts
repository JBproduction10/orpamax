import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  image?: string;
  role?: "user" | "admin";
  resetCode?: {
    data: string;
    expiresAt: Date;
  };
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    image: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetCode: {
      data: String,
      expiresAt: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
