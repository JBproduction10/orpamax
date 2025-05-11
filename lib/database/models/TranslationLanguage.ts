import mongoose, { Schema, model, models } from 'mongoose';

const TranslationLanguageSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const TranslationLanguage = models.TranslationLanguage || model('TranslationLanguage', TranslationLanguageSchema);
export default TranslationLanguage;
