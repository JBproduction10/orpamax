import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  primaryColor: String,
  textColor: String,
  backgroundColor: String,
  overlayColor: String,
  fontFamily: String,
}, { timestamps: true });

export default mongoose.models.Theme || mongoose.model('Theme', themeSchema);