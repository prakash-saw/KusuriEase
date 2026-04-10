// // ===== KusuriEase - Diet Plan Routes =====
// // POST /api/diet/plan — get condition-specific diet plan

// const express = require('express');
// const router = express.Router();

// const plans = {
//   diabetes: {
//     title: 'Diabetes Friendly Diet',
//     description: 'Low-glycemic index foods to stabilize blood sugar',
//     meals: [
//       { type: 'Breakfast', name: 'Steel-cut Oats',        calories: 320, protein: '12g', carbs: '45g', fat: '8g' },
//       { type: 'Lunch',     name: 'Grilled Protein Bowl',  calories: 480, protein: '38g', carbs: '42g', fat: '12g' },
//       { type: 'Dinner',    name: 'Lentil & Spinach Soup', calories: 340, protein: '22g', carbs: '38g', fat: '6g' },
//       { type: 'Snack',     name: 'Mixed Nuts & Seeds',    calories: 180, protein: '6g',  carbs: '8g',  fat: '14g' },
//     ]
//   },
//   hypertension: {
//     title: 'DASH Diet Plan',
//     description: 'Low-sodium, high-potassium foods for blood pressure control',
//     meals: [
//       { type: 'Breakfast', name: 'Berry Smoothie Bowl',             calories: 290, protein: '9g',  carbs: '52g', fat: '6g' },
//       { type: 'Lunch',     name: 'Baked Salmon & Veggies',          calories: 450, protein: '42g', carbs: '22g', fat: '18g' },
//       { type: 'Dinner',    name: 'Vegetable Stir-fry',              calories: 380, protein: '18g', carbs: '55g', fat: '8g' },
//       { type: 'Snack',     name: 'Apple & Natural Peanut Butter',   calories: 160, protein: '4g',  carbs: '20g', fat: '8g' },
//     ]
//   },
//   general: {
//     title: 'Balanced Wellness Diet',
//     description: 'General wellness with balanced macronutrients',
//     meals: [
//       { type: 'Breakfast', name: 'Eggs & Whole Grain Toast', calories: 380, protein: '22g', carbs: '48g', fat: '12g' },
//       { type: 'Lunch',     name: 'Complete Indian Thali',    calories: 520, protein: '26g', carbs: '72g', fat: '14g' },
//       { type: 'Dinner',    name: 'Khichdi & Raita',          calories: 360, protein: '18g', carbs: '52g', fat: '8g' },
//       { type: 'Snack',     name: 'Fruit & Yogurt',           calories: 150, protein: '7g',  carbs: '26g', fat: '2g' },
//     ]
//   }
// };

// // POST /api/diet/plan
// router.post('/plan', (req, res) => {
//   const { condition } = req.body;
//   const plan = plans[condition] || plans.general;
//   res.json(plan);
// });

// module.exports = router;
