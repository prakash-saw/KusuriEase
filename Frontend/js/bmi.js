// ===== KusuriEase - Bmi Page JS =====

// ===== BMI =====
// ===== BMI CALCULATOR =====
function calculateBMI() {
  const height = parseFloat(document.getElementById('bmiHeight').value);
  const weight = parseFloat(document.getElementById('bmiWeight').value);
  const age = parseInt(document.getElementById('bmiAge').value);
  const gender = document.getElementById('bmiGender').value;

  if (!height || !weight || !age) {
    showToast('⚠️ Please fill in all fields', 'warn');
    return;
  }

  const hm = height / 100;
  const bmi = (weight / (hm * hm)).toFixed(1);

  let category, color, advice;
  if (bmi < 18.5) {
    category = 'Underweight'; color = '#3b82f6';
    advice = 'Consider increasing caloric intake with nutrient-dense foods. Consult a dietitian.';
  } else if (bmi < 25) {
    category = 'Normal Weight'; color = '#059669';
    advice = 'Great! Maintain your healthy lifestyle with balanced diet and regular exercise.';
  } else if (bmi < 30) {
    category = 'Overweight'; color = '#d97706';
    advice = 'Consider moderate calorie reduction and increasing physical activity to reach healthy range.';
  } else {
    category = 'Obese'; color = '#dc2626';
    advice = 'Please consult a healthcare provider for personalized weight management guidance.';
  }

  // Calculate ideal weight range
  const idealMin = (18.5 * hm * hm).toFixed(1);
  const idealMax = (24.9 * hm * hm).toFixed(1);
  const diff = (weight - (18.5 * hm * hm)).toFixed(1);

  document.getElementById('bmiValue').textContent = bmi;
  document.getElementById('bmiValue').style.color = color;
  document.getElementById('bmiCategory').textContent = category;
  document.getElementById('bmiCategory').style.color = color;
  document.getElementById('bmiAdvice').textContent = advice;
  document.getElementById('bmiIdealRange').textContent = `${idealMin} – ${idealMax} kg`;

  // Animate meter
  const angle = Math.min(Math.max((bmi - 10) / 30 * 180, 0), 180);
  animateBMIMeter(angle, color);

  document.getElementById('bmiResult').style.display = 'block';
  document.getElementById('bmiResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function animateBMIMeter(angle, color) {
  const needle = document.getElementById('bmiNeedle');
  if (needle) {
    needle.style.transform = `rotate(${angle - 90}deg)`;
    needle.style.background = color;
  }
}


