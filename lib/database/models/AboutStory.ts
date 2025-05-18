import mongoose from 'mongoose';

const AboutStorySchema = new mongoose.Schema({
  title: String,
  paragraphs: [String],
  imageUrl: {
    secure_url: String,
    public_id: String,
  },
});

export default mongoose.models.AboutStory || mongoose.model('AboutStory', AboutStorySchema);
