// // ===== KusuriEase - Medicine Routes =====
// // GET /api/medicines          — search / list all
// // GET /api/medicines/:id      — get single medicine
// // GET /api/user/medicines     — get saved medicines (auth)
// // POST /api/user/medicines    — save a medicine (auth)
// // PATCH /api/user/medicines/:id/taken — toggle taken (auth)

// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/auth');
// const { savedMedicines } = require('../config/db');

// const medicines = [
//   { id: 1, name: 'Paracetamol', active: 'Acetaminophen', dose: '500mg', category: 'Analgesic/Antipyretic',
//     brands: [
//       { name: 'Crocin Advance', mfg: 'GSK', composition: 'Paracetamol Optizorb', price: 32, verdict: 'popular' },
//       { name: 'Dolo-650', mfg: 'Micro Labs', composition: 'Paracetamol 650mg', price: 24.5, verdict: 'best_value' },
//       { name: 'Jan Aushadhi', mfg: 'Generic', composition: 'Paracetamol IP', price: 12, verdict: 'cheapest' },
//     ],
//     interactions: ['Alcohol', 'Warfarin'], savingsMonthly: 640 },
//   { id: 2, name: 'Metformin', active: 'Metformin HCl', dose: '500mg', category: 'Antidiabetic',
//     brands: [
//       { name: 'Glycomet', mfg: 'USV', composition: 'Metformin HCl 500mg', price: 28, verdict: 'popular' },
//       { name: 'Glucophage', mfg: 'Merck', composition: 'Metformin 500mg', price: 45, verdict: null },
//       { name: 'Metformin IP', mfg: 'Jan Aushadhi', composition: 'Metformin IP', price: 9, verdict: 'cheapest' },
//     ],
//     interactions: ['Alcohol', 'Contrast dye'], savingsMonthly: 480 },
//   { id: 3, name: 'Atorvastatin', active: 'Atorvastatin Calcium', dose: '10mg', category: 'Statin',
//     brands: [
//       { name: 'Lipitor', mfg: 'Pfizer', composition: 'Atorvastatin 10mg', price: 85, verdict: 'popular' },
//       { name: 'Atorva', mfg: 'Zydus', composition: 'Atorvastatin 10mg', price: 32, verdict: 'best_value' },
//       { name: 'Atorvastatin IP', mfg: 'Jan Aushadhi', composition: 'Atorvastatin IP', price: 14, verdict: 'cheapest' },
//     ],
//     interactions: ['Grapefruit juice', 'Niacin'], savingsMonthly: 852 },
// ];

// // GET /api/medicines
// router.get('/', (req, res) => {
//   const { search } = req.query;
//   if (search) {
//     const results = medicines.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
//     return res.json(results);
//   }
//   res.json(medicines);
// });

// // GET /api/medicines/:id
// router.get('/:id', (req, res) => {
//   const med = medicines.find(m => m.id === parseInt(req.params.id));
//   if (!med) return res.status(404).json({ error: 'Medicine not found' });
//   res.json(med);
// });

// // GET /api/user/medicines (auth required)
// router.get('/user/saved', authMiddleware, (req, res) => {
//   res.json(savedMedicines[req.user.id] || []);
// });

// // POST /api/user/medicines (auth required)
// router.post('/user/saved', authMiddleware, (req, res) => {
//   const { medicineName, dose, frequency, time } = req.body;
//   if (!savedMedicines[req.user.id]) savedMedicines[req.user.id] = [];
//   const entry = { id: Date.now().toString(), medicineName, dose, frequency, time, taken: false, addedAt: new Date() };
//   savedMedicines[req.user.id].push(entry);
//   res.status(201).json(entry);
// });

// // PATCH /api/user/medicines/:id/taken (auth required)
// router.patch('/user/saved/:id/taken', authMiddleware, (req, res) => {
//   const list = savedMedicines[req.user.id] || [];
//   const med = list.find(m => m.id === req.params.id);
//   if (!med) return res.status(404).json({ error: 'Not found' });
//   med.taken = !med.taken;
//   res.json(med);
// });

// module.exports = router;
