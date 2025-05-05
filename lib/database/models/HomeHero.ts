import mongoose from "mongoose";

const HomeHeroSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Professional Translation & Cleaning Services"
  },
  description: {
    type: String,
    default:
      "Bridging languages and creating spotless environments for homes and businesses across the Portland Maine."
  },
  imageUrl: {
    type: String,
    default:
      "https://readdy.ai/api/search-image?query=Professional%20office%20environment%20with%20clean%20modern%20workspace%20and%20multilingual%20documents%2C%20bright%20natural%20lighting%2C%20organized%20desk%20with%20translation%20materials%20and%20cleaning%20supplies%20visible%20in%20background%2C%20blue%20color%20scheme%2C%20minimalist%20design&width=1440&height=600&seq=9&orientation=landscape"
  },
  imagePulicId: String,
}, {timestamps: true});

const HomeHero =
  mongoose.models.HomeHero || mongoose.model("HomeHero", HomeHeroSchema);

export default HomeHero;
