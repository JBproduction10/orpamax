import mongoose from "mongoose";

// Define individual schemas
const cleaningHeroSchema = new mongoose.Schema({
    images: [{
        secure_url: { type: String, default: "" },
        public_id: { type: String, default: "" }
    }],
    title: {
        type: String,
        default: "Professional Cleaning Services"
    },
    description: {
        type: String,
        default: "Creating spotless environments for homes and businesses. Our expert cleaning team delivers exceptional results every time."
    }
});

const cleaningServicesSchema = new mongoose.Schema({
    image: {
        public_id: { type: String, default: '' },
        secure_url: { type: String, default: '' },
    },
    title: { type: String, default: "" },
    description: String,
    icon: String,
});

const cleaningServicesPriceSchema = new mongoose.Schema({
    title: String,
    description: String,
    itemList: [{ type: String }],
    price: String,
});

const cleaningChecklistSchema = new mongoose.Schema({
    title: String,
    icon: String,
    itemList: [{ type: String }],
});

// Create and export models
const CleaningHero = mongoose.models.CleaningHero || mongoose.model("CleaningHero", cleaningHeroSchema);
const CleaningService = mongoose.models.CleaningService || mongoose.model("CleaningService", cleaningServicesSchema);
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
