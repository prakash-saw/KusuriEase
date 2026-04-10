// // ===== KusuriEase - Bmi Page JS =====

// // ===== BMI =====
// // ===== BMI CALCULATOR =====
// function calculateBMI() {
//   const height = parseFloat(document.getElementById('bmiHeight').value);
//   const weight = parseFloat(document.getElementById('bmiWeight').value);
//   const age = parseInt(document.getElementById('bmiAge').value);
//   const gender = document.getElementById('bmiGender').value;

//   if (!height || !weight || !age) {
//     showToast('⚠️ Please fill in all fields', 'warn');
//     return;
//   }

//   async function calculateBMI() {
//     const height = document.getElementById('bmiHeight').value;
//     const weight = document.getElementById('bmiWeight').value;
//     const age = document.getElementById('bmiAge').value;
//     const gender = document.getElementById('bmiGender').value;

//     const response = await fetch('/api/bmi', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ height, weight, age, gender })
//     });

//     const result = await response.json();
//     if (result.success) {
//         // Update UI with result.data.bmiValue, result.data.category, etc.
//         document.getElementById('bmiValue').innerText = result.data.bmiValue;
//         document.getElementById('bmiCategory').innerText = result.data.category;
//         document.getElementById('bmiAdvice').innerText = result.data.advice;
//         document.getElementById('bmiResult').style.display = 'block';
//     }
// }

//   const hm = height / 100;
//   const bmi = (weight / (hm * hm)).toFixed(1);

//   let category, color, advice;
//   if (bmi < 18.5) {
//     category = 'Underweight'; color = '#3b82f6';
//     advice = 'Consider increasing caloric intake with nutrient-dense foods. Consult a dietitian.';
//   } else if (bmi < 25) {
//     category = 'Normal Weight'; color = '#059669';
//     advice = 'Great! Maintain your healthy lifestyle with balanced diet and regular exercise.';
//   } else if (bmi < 30) {
//     category = 'Overweight'; color = '#d97706';
//     advice = 'Consider moderate calorie reduction and increasing physical activity to reach healthy range.';
//   } else {
//     category = 'Obese'; color = '#dc2626';
//     advice = 'Please consult a healthcare provider for personalized weight management guidance.';
//   }

//   // Calculate ideal weight range
//   const idealMin = (18.5 * hm * hm).toFixed(1);
//   const idealMax = (24.9 * hm * hm).toFixed(1);
//   const diff = (weight - (18.5 * hm * hm)).toFixed(1);

//   document.getElementById('bmiValue').textContent = bmi;
//   document.getElementById('bmiValue').style.color = color;
//   document.getElementById('bmiCategory').textContent = category;
//   document.getElementById('bmiCategory').style.color = color;
//   document.getElementById('bmiAdvice').textContent = advice;
//   document.getElementById('bmiIdealRange').textContent = `${idealMin} – ${idealMax} kg`;

//   // Animate meter
//   const angle = Math.min(Math.max((bmi - 10) / 30 * 180, 0), 180);
//   animateBMIMeter(angle, color);

//   document.getElementById('bmiResult').style.display = 'block';
//   document.getElementById('bmiResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// }

// function animateBMIMeter(angle, color) {
//   const needle = document.getElementById('bmiNeedle');
//   if (needle) {
//     needle.style.transform = `rotate(${angle - 90}deg)`;
//     needle.style.background = color;
//   }
// }


/**
 * BMI Calculator Frontend Logic
 * Connects to the Express/MongoDB backend
 */

async function calculateBMI() {
    // 1. Get input elements
    const heightInput = document.getElementById('bmiHeight');
    const weightInput = document.getElementById('bmiWeight');
    const ageInput = document.getElementById('bmiAge');
    const genderInput = document.getElementById('bmiGender');
    
    // 2. Extract values
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const age = parseInt(ageInput.value);
    const gender = genderInput.value;

    // 3. Basic validation
    if (!height || !weight || !age) {
        showToast('Please fill in all fields correctly.', 'error');
        return;
    }

    try {
        // 4. Send data to the backend
        const response = await fetch('/api/bmi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                height,
                weight,
                age,
                gender,
                // userId: localStorage.getItem('userId') // Uncomment if user is logged in
            })
        });

        const result = await response.json();

        if (result.success) {
            updateBMIUI(result.data);
            showToast('BMI Calculated and saved!', 'success');
        } else {
            showToast(result.error || 'Calculation failed', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Server connection error', 'error');
    }
}

/**
 * Updates the UI with results from the backend
 * @param {Object} data - The BMI record from MongoDB
 */
function updateBMIUI(data) {
    const { bmiValue, category, advice, height } = data;

    // Update Text Values
    document.getElementById('bmiValue').innerText = bmiValue;
    document.getElementById('bmiCategory').innerText = category;
    document.getElementById('bmiAdvice').innerText = advice;

    // Calculate Ideal Weight Range for UI (using 18.5 and 24.9 as bounds)
    const heightInMeters = height / 100;
    const minWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1);
    const maxWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1);
    document.getElementById('bmiIdealRange').innerText = `${minWeight}kg - ${maxWeight}kg`;

    // Rotate the Needle in the SVG Gauge
    // Map BMI 10 -> -90deg, BMI 25 -> 0deg, BMI 40 -> 90deg
    const needle = document.getElementById('bmiNeedle');
    let angle = (bmiValue - 25) * 6; // Simple mapping for visual representation
    
    // Clamp values for safety
    if (angle < -90) angle = -90;
    if (angle > 90) angle = 90;
    
    needle.style.transform = `rotate(${angle}deg)`;

    // Reveal the results section
    document.getElementById('bmiResult').style.display = 'block';
    
    // Smooth scroll to results on mobile
    if (window.innerWidth < 768) {
        document.getElementById('bmiResult').scrollIntoView({ behavior: 'smooth' });
    }
}

// Helper for Toast (assuming it's in shared.js, but adding fallback)
function showToast(message, type) {
    if (typeof window.showToast === 'function') {
        window.showToast(message, type);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}