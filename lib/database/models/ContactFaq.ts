import mongoose from 'mongoose';

const ContactFaqSchema = new mongoose.Schema({
    category: {type: String, required: true},
    question: {type: String, required: true},
    answer: {type: String, required: true},
}, {timestamps: true});

export default mongoose.models.ContactFaq || mongoose.model("ContactFaq", ContactFaqSchema);