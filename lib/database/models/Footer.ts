import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema({
  companyName: { type: String, default: "ORPAMAX" },
  location: {type: String, default: "Portland Maine"},
  businessHour: { type: String, default: "MON-FRI: 8:00 AM - 6:00 PM" },
  logo: {
    secure_url: { type: String, default: "" },
    public_id: {type: String, default: ""}
  },
  description: {
    type: String,
    default:
      "Professional translation and cleaning services for homes and businesses across the country.",
  },
  email: String,
  phone: String,
  singleton: { type: String, unique: true, default: "only" },
});

const Footer = mongoose.models.Footer || mongoose.model("Footer", FooterSchema);

export default Footer;
