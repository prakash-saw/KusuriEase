const Pharmacy = require('../models/Pharmacy');
const asyncHandler = require('../middleware/async');

// @desc    Get pharmacies with filtering
// @route   GET /api/pharmacies
exports.getPharmacies = asyncHandler(async (req, res, next) => {
  let query;
  const { stock } = req.query;

  // Logic for filtering based on stock status (as seen in frontend JS)
  if (stock && stock !== 'all') {
    query = Pharmacy.find({ stockStatus: stock });
  } else {
    query = Pharmacy.find();
  }

  const pharmacies = await query;

  res.status(200).json({
    success: true,
    count: pharmacies.length,
    data: pharmacies
  });
});