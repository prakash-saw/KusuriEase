const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional if user is guest
  },
  height: {
    type: Number,
    required: [true, 'Please provide height in cm']
  },
  weight: {
    type: Number,
    required: [true, 'Please provide weight in kg']
  },
  age: {
    type: Number,
    required: [true, 'Please provide age']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Please provide gender']
  },
  bmiValue: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  advice: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BMI', bmiSchema);