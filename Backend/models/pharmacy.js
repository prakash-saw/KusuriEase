const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a pharmacy name'],
    trim: true
  },
  address: String,
  phone: String,
  stockStatus: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock'],
    default: 'in-stock'
  },
  is24Hours: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);