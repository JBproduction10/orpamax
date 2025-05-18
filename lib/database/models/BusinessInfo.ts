import mongoose from 'mongoose'

const BusinessInfoSchema = new mongoose.Schema({
  location: {
    address: String,
    city: String,
    state: String,
    lat: Number,
    lng: Number
  },
  hours: [
    {
      day: String,
      open: String,
      close: String
    }
  ],
  holidayHours: String,
  emergencyMessage: String
})

export default mongoose.models.BusinessInfo || mongoose.model('BusinessInfo', BusinessInfoSchema)
