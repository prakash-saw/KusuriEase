const Medication = require('../models/Medication');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get daily medications and calculate adherence
exports.getDailyMeds = asyncHandler(async (req, res, next) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const medications = await Medication.find({
    user: req.query.userId,
    date: { $gte: startOfDay }
  });

  // Backend calculation of adherence pct
  const total = medications.length;
  const done = medications.filter(m => m.isTaken).length;
  const adherencePct = total ? Math.round((done / total) * 100) : 0;

  res.status(200).json({
    success: true,
    adherencePct,
    count: medications.length,
    data: medications
  });
});

// @desc    Toggle medication status (Logic for toggleMedDone)
exports.toggleMedication = asyncHandler(async (req, res, next) => {
  let medication = await Medication.findById(req.params.id);

  if (!medication) {
    return next(new ErrorResponse('Medication not found', 404));
  }

  medication.isTaken = !medication.isTaken;
  await medication.save();

  res.status(200).json({
    success: true,
    data: medication
  });
});