import mongoose,{ Schema, Document } from 'mongoose';

// Define individual schemas
const cleaningHeroSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    public_id: { type: String, required: true },
    secure_url: { type: String, required: true },
  },
}, { timestamps: true });
  

const cleaningServiceSchema = new Schema({
  
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    imageUrl: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const cleaningServicesPriceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    highlighted: { type: Boolean, default: false }
});

const cleaningChecklistSchema = new mongoose.Schema({
    title: String,
    items:[{type: String}],
});

// Create and export models
const CleaningHero = mongoose.models.CleaningHero || mongoose.model("CleaningHero", cleaningHeroSchema);
const CleaningService = mongoose.models.CleaningService || mongoose.model("CleaningService", cleaningServiceSchema);
const CleaningPrice = mongoose.models.CleaningPrice || mongoose.model("CleaningPrice", cleaningServicesPriceSchema);
const CleaningChecklist = mongoose.models.CleaningChecklist || mongoose.model("CleaningChecklist", cleaningChecklistSchema);

// Export as a single object
const CleaningModels = {
    CleaningHero,
    CleaningService,
    CleaningPrice,
    CleaningChecklist
};

export default CleaningModels;
