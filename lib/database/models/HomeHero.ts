import mongoose from "mongoose";

const HomeHeroSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Professional Translation & Cleaning Services",
  },
  description: {
    type: String,
    default:
      "Bridging languages and creating spotless environments for homes and businesses across the Portland Maine.",
  },
  imageUrl: [
    {
      secure_url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
  ],
}, { timestamps: true });

const HomeHero =
  mongoose.models.HomeHero || mongoose.model("HomeHero", HomeHeroSchema);

export default HomeHero;
