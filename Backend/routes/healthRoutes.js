// // ===== KusuriEase - Health Log Routes =====
// // POST /api/health/log   — add health log entry (auth)
// // GET  /api/health/log   — get all health logs (auth)

// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/auth');
// const { healthLogs } = require('../config/db');

// // POST /api/health/log
// router.post('/log', authMiddleware, (req, res) => {
//   const { weight, bloodPressure, bloodSugar, steps, notes } = req.body;
//   if (!healthLogs[req.user.id]) healthLogs[req.user.id] = [];
//   const log = {
//     id: Date.now().toString(),
//     weight,
//     bloodPressure,
//     bloodSugar,
//     steps,
//     notes,
//     loggedAt: new Date()
//   };
//   healthLogs[req.user.id].push(log);
//   res.status(201).json(log);
// });

// // GET /api/health/log
// router.get('/log', authMiddleware, (req, res) => {
//   res.json(healthLogs[req.user.id] || []);
// });

// module.exports = router;
