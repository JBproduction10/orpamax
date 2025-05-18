import mongoose, { Schema, model, models } from 'mongoose';

const HomeOverviewServiceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  features: [{ type: String }],
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String }, // optional - store icon name like "FaBroom"
}, { timestamps: true });

export const HomeOverviewService = models.HomeOverviewService || model('HomeOverviewService', HomeOverviewServiceSchema);
