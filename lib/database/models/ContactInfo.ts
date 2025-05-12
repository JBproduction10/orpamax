import mongoose, { Schema, model, models } from "mongoose";

const ContactInfoSchema = new Schema({
  type: { type: String, required: true }, // e.g., "visit", "call", "email"
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: [String], required: true },
  icon: { type: String, required: true }, // e.g., "map", "phone", "email"
}, { timestamps: true });

export default models.ContactInfo || model("ContactInfo", ContactInfoSchema);
