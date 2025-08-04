const mongoose = require('mongoose');

const TimeSlotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  slots: {
    type: [String],
    required: true,
  },
});

const DoctorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  availability: {
    type: [TimeSlotSchema],
    default: [],
  },
});

module.exports = mongoose.model('Doctor', DoctorSchema);