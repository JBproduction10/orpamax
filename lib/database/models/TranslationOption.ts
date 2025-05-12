// models/Option.ts
import mongoose from 'mongoose';

const TranslationOptionSchema = new mongoose.Schema({
  type: { type: String, enum: ['language', 'documentType', 'urgency'], required: true },
  label: { type: String, required: true },
  value: { type: String, required: true },
});

export default mongoose.models.TranslationOption || mongoose.model('TranslationOption', TranslationOptionSchema);
