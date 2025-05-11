import mongoose from "mongoose";

const HomeHeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
  },
}, { timestamps: true });

const HomeHero =
  mongoose.models.HomeHero || mongoose.model("HomeHero", HomeHeroSchema);

export default HomeHero;
