import mongoose, { Schema } from 'mongoose';

const TranslationHeroSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
  },
}, { timestamps: true });

export default mongoose.models.TranslationHero || mongoose.model('TranslationHero', TranslationHeroSchema);