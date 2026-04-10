const BMI = require('../models/BMI');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Calculate and save BMI
// @route   POST /api/bmi
exports.calculateAndSaveBMI = asyncHandler(async (req, res, next) => {
  const { height, weight, age, gender, userId } = req.body;

  if (!height || !weight) {
    return next(new ErrorResponse('Please provide height and weight', 400));
  }

  // Calculate BMI: weight (kg) / [height (m)]^2
  const heightInMeters = height / 100;
  const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  // Determine Category
  let category = '';
  let advice = '';

  if (bmiValue < 18.5) {
    category = 'Underweight';
    advice = 'You are in the underweight range. Consider consulting a nutritionist for a healthy weight gain plan.';
  } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
    category = 'Normal Weight';
    advice = 'Great job! You are in the healthy weight range. Maintain your current lifestyle and balanced diet.';
  } else if (bmiValue >= 25 && bmiValue <= 29.9) {
    category = 'Overweight';
    advice = 'You are in the overweight range. A combination of balanced diet and regular exercise can help you reach a healthy weight.';
  } else {
    category = 'Obese';
    advice = 'You are in the obese range. We recommend consulting a healthcare provider to create a safe health management plan.';
  }

  // Create record
  const bmiRecord = await BMI.create({
    user: userId || null,
    height,
    weight,
    age,
    gender,
    bmiValue,
    category,
    advice
  });

  res.status(201).json({
    success: true,
    data: bmiRecord
  });
});

// @desc    Get user BMI history
// @route   GET /api/bmi/history/:userId
exports.getBMIHistory = asyncHandler(async (req, res, next) => {
  const history = await BMI.find({ user: req.params.userId }).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: history.length,
    data: history
  });
});