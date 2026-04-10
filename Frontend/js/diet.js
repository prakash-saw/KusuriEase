// ===== KusuriEase - Diet Page JS =====

// ===== DIET =====
// ===== DIET PLANNER =====
let hydrationLevel = 3;

function setHydration(level) {
  hydrationLevel = level;
  document.querySelectorAll('.water-drop').forEach((d, i) => {
    d.classList.toggle('filled', i < level);
    d.classList.toggle('empty', i >= level);
  });
  const pct = Math.round((level / 5) * 100);
  document.getElementById('hydrationPct').textContent = (level * 0.5).toFixed(1) + 'L / 2.5L';
}

function generateDietPlan() {
  const condition = document.getElementById('dietCondition').value;
  const calories = document.getElementById('dietCalories').value;

  const plans = {
    diabetes: {
      breakfast: { emoji: '🥣', name: 'Steel-cut Oats', desc: 'With walnuts, berries & cinnamon (low GI)', cal: 320, protein: '12g', carbs: '45g', fat: '8g' },
      lunch: { emoji: '🥗', name: 'Grilled Protein Bowl', desc: 'Quinoa, grilled chicken, broccoli & olive oil', cal: 480, protein: '38g', carbs: '42g', fat: '12g' },
      dinner: { emoji: '🍲', name: 'Lentil & Spinach Soup', desc: 'Masoor dal with leafy greens, light & nutritious', cal: 340, protein: '22g', carbs: '38g', fat: '6g' },
      snack: { emoji: '🥜', name: 'Mixed Nuts & Seeds', desc: 'Almonds, walnuts, pumpkin seeds', cal: 180, protein: '6g', carbs: '8g', fat: '14g' },
    },
    hypertension: {
      breakfast: { emoji: '🫐', name: 'Berry Smoothie Bowl', desc: 'Low-sodium, potassium-rich berries with flaxseeds', cal: 290, protein: '9g', carbs: '52g', fat: '6g' },
      lunch: { emoji: '🐟', name: 'Baked Salmon & Veggies', desc: 'Omega-3 rich salmon with steamed asparagus', cal: 450, protein: '42g', carbs: '22g', fat: '18g' },
      dinner: { emoji: '🥦', name: 'Vegetable Stir-fry', desc: 'Brown rice, tofu, colorful veggies, low sodium soy', cal: 380, protein: '18g', carbs: '55g', fat: '8g' },
      snack: { emoji: '🍎', name: 'Apple & Peanut Butter', desc: 'Unsalted natural peanut butter, 2 tbsp', cal: 160, protein: '4g', carbs: '20g', fat: '8g' },
    },
    weightloss: {
      breakfast: { emoji: '🥚', name: 'Egg White Omelette', desc: 'Spinach, mushrooms, bell pepper – high protein', cal: 220, protein: '28g', carbs: '8g', fat: '6g' },
      lunch: { emoji: '🥙', name: 'Chicken Wrap', desc: 'Whole wheat roti, grilled chicken, salad', cal: 380, protein: '32g', carbs: '38g', fat: '10g' },
      dinner: { emoji: '🍛', name: 'Dal Tadka + Roti', desc: 'Protein-rich lentils, 1 whole wheat roti', cal: 320, protein: '19g', carbs: '46g', fat: '7g' },
      snack: { emoji: '🥒', name: 'Veggie Sticks & Hummus', desc: 'Cucumber, carrot, celery with 2 tbsp hummus', cal: 120, protein: '5g', carbs: '14g', fat: '5g' },
    },
    general: {
      breakfast: { emoji: '🍳', name: 'Balanced Breakfast', desc: 'Eggs, whole grain toast, fresh fruit, milk', cal: 380, protein: '22g', carbs: '48g', fat: '12g' },
      lunch: { emoji: '🍱', name: 'Complete Thali', desc: 'Dal, sabzi, roti, rice, salad, curd', cal: 520, protein: '26g', carbs: '72g', fat: '14g' },
      dinner: { emoji: '🥘', name: 'Khichdi & Raita', desc: 'Protein-rich khichdi with yogurt-based raita', cal: 360, protein: '18g', carbs: '52g', fat: '8g' },
      snack: { emoji: '🍇', name: 'Fruit & Yogurt', desc: 'Seasonal fruits with low-fat curd', cal: 150, protein: '7g', carbs: '26g', fat: '2g' },
    }
  };

  const plan = plans[condition] || plans.general;
  const meals = ['breakfast', 'lunch', 'dinner', 'snack'];
  const mealNames = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Evening Snack' };

  const container = document.getElementById('dietPlanContainer');
  container.innerHTML = meals.map(m => `
    <div class="meal-card">
      <div class="meal-header">
        <div>
          <div class="meal-type">${mealNames[m]}</div>
          <div class="meal-name">${plan[m].name}</div>
        </div>
        <span style="font-size:2rem">${plan[m].emoji}</span>
      </div>
      <div class="meal-body">
        <div class="meal-info">
          <div class="meal-desc">${plan[m].desc}</div>
          <div class="nutrition-pills">
            <span class="nutr-pill">🔥 ${plan[m].cal} cal</span>
            <span class="nutr-pill">💪 ${plan[m].protein} protein</span>
            <span class="nutr-pill">🌾 ${plan[m].carbs} carbs</span>
            <span class="nutr-pill">🫒 ${plan[m].fat} fat</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  showToast('🥗 Diet plan generated!', 'success');
}


