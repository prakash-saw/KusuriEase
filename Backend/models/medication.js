const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a medication name'],
    trim: true
  },
  time: {
    type: String,
    required: [true, 'Please add a dosage time (e.g., 08:00 AM)']
  },
  isTaken: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now 
  }
}, {
  timestamps: true
});

// Middleware to ensure date is stored as start of day for easier daily tracking
medicationSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('date')) {
    this.date.setHours(0, 0, 0, 0);
  }
  next();
});

module.exports = mongoose.model('Medication', medicationSchema);