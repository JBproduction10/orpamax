import mongoose, { Schema, model, models } from 'mongoose';

const AboutGoalSchema = new Schema({
  type: { type: String, enum: ['vision', 'mission'], required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { 
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
   },
}, { timestamps: true });

export const AboutGoal = models.AboutGoal || model('AboutGoal', AboutGoalSchema);
