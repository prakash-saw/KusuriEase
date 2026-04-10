const express = require('express');
const router = express.Router();
const { 
  getDailyMeds, 
  toggleMedication 
} = require('../controllers/medicationController');

// Route to get today's medications and adherence percentage
router.get('/today', getDailyMeds);

// Route to toggle the "isTaken" status of a specific medicine
router.patch('/:id/toggle', toggleMedication);

module.exports = router;