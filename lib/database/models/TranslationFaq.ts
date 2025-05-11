import mongoose from 'mongoose';

const TranslationFaqSchema = new mongoose.Schema({
  category: { type: String, required: true }, // 'general', 'process', 'pricing', etc.
  question: { type: String, required: true },
  answer: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.TranslationFaq || mongoose.model('TranslationFaq', TranslationFaqSchema);
