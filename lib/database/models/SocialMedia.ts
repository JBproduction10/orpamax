import mongoose from 'mongoose';

const SocialNewsletterSchema = new mongoose.Schema({
  facebook: String,
  instagram: String,
  linkedin: String,
//   newsletterText: String,
//   newsletterSubText: String,
//   disclaimer: String,
}, { timestamps: true });

export default mongoose.models.SocialNewsletter || mongoose.model('SocialNewsletter', SocialNewsletterSchema);
