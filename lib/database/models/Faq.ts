import mongoose from "mongoose";

const FaqSchema = new mongoose.Schema({
    question: [{
        type: String
    }]
});

const Faq = mongoose.models.FooterSchema || mongoose.model("Faq", FaqSchema);

export default Faq;