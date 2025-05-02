import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  image?: string;
  role?: "user" | "admin";
  resetCode?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    image: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetCode: {data:String,
      expiresAt:{
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 min
      }
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
