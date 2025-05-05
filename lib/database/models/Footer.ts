import mongoose from "mongoose";

const FooterSchema = new mongoose.Schema({
  companyName: { type: String, default: "ORPAMAX" },
  location: String,
  businessHour: { type: String, default: "MON-FRI: 8:00 AM - 6:00 PM" },
  logo: {
    url: { type: String, default: "" },
    publicId: String,
  },
  description: {
    type: String,
    default:
      "Professional translation and cleaning services for homes and businesses across the country.",
  },
  email: String,
});

const Footer = mongoose.models.Footer || mongoose.model("Footer", FooterSchema);

export default Footer;
