const express = require('express');
const router = express.Router();
const { calculateAndSaveBMI, getBMIHistory } = require('../controllers/bmiController');

// Main calculation route
router.post('/', calculateAndSaveBMI);

// Fetch history for a specific user
router.get('/history/:userId', getBMIHistory);

module.exports = router;