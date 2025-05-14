// models/BusinessInfo.ts
import mongoose from 'mongoose';

const businessInfoSchema = new mongoose.Schema({
  hours: {
    mondayToFriday: { type: String, required: true },
    saturday: { type: String, required: true },
    sunday: { type: String, required: true },
    holidayHours: { type: String, required: true },
    emergencyServices: { type: String, required: false },
  },
  location: {
    address: { type: String, required: true },
    mapImage: { type: String, required: true },
  },
});

const BusinessInfo = mongoose.models.BusinessInfo || mongoose.model('BusinessInfo', businessInfoSchema);
export default BusinessInfo;
