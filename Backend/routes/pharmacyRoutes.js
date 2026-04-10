const express = require('express');
const router = express.Router();
const { getPharmacies } = require('../controllers/pharmacyController');

// Route for getting pharmacies (supports ?stock= query param)
router.get('/', getPharmacies);

module.exports = router;