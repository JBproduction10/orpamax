import mongoose, { Schema, models, model } from 'mongoose';

const ContactInfoSchema = new Schema({
  type: { type: String, enum: ['visit', 'call', 'email'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  lines: [{ type: String }],
}, { timestamps: true });

export default models.ContactInfo || model('ContactInfo', ContactInfoSchema);
