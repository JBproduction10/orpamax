import mongoose, { Schema, Document } from 'mongoose';

export interface Business extends Document {
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
  holidayHours: string;
  emergencyInfo: string;
  locationName: string;
  locationCity: string;
  locationLat?: number;
  locationLng?: number;
}

const BusinessSchema = new Schema<Business>({
  hours: [
    {
      day: { type: String, required: true },
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
  ],
  holidayHours: { type: String, required: true },
  emergencyInfo: { type: String, required: true },
  locationName: { type: String, required: true },
  locationCity: { type: String, required: true },
  locationLat: { type: Number },  // new
  locationLng: { type: Number },  // new
});

export default mongoose.models.Business || mongoose.model<Business>('Business', BusinessSchema);
