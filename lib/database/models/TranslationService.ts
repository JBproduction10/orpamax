import mongoose, { Schema, models } from 'mongoose';

const TranslationServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    imageUrl: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default models.TranslationService ||
  mongoose.model('TranslationService', TranslationServiceSchema);
