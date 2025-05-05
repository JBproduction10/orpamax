import mongoose, { Schema, Document } from 'mongoose';

const BusinessSchema = new Schema({
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

const faqSchema = new Schema(
    {
      question: {
        type: String,
        required: true,
        trim: true,
      },
      answer: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
    }
);