import mongoose, { Schema } from 'mongoose';

const ContactHeroSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
  },
}, { timestamps: true });

export default mongoose.models.ContactHero || mongoose.model('ContactHero', ContactHeroSchema);