// ===== KusuriEase - Medicine Page JS =====

// ===== MEDICINE =====
// ===== MEDICINE SEARCH =====
const medicines = [
  { name: 'Paracetamol', dose: '500mg', type: 'Analgesic/Antipyretic', active: 'Acetaminophen' },
  { name: 'Metformin', dose: '500mg', type: 'Antidiabetic', active: 'Metformin HCl' },
  { name: 'Atorvastatin', dose: '10mg', type: 'Statin', active: 'Atorvastatin Calcium' },
  { name: 'Omeprazole', dose: '20mg', type: 'PPI', active: 'Omeprazole' },
  { name: 'Amoxicillin', dose: '500mg', type: 'Antibiotic', active: 'Amoxicillin' },
  { name: 'Azithromycin', dose: '500mg', type: 'Antibiotic', active: 'Azithromycin' },
  { name: 'Lisinopril', dose: '10mg', type: 'ACE Inhibitor', active: 'Lisinopril' },
  { name: 'Cetirizine', dose: '10mg', type: 'Antihistamine', active: 'Cetirizine HCl' },
];

const medicineData = {
  Paracetamol: {
    category: 'Antipyretic / Analgesic',
    active: 'Acetaminophen',
    dose: '500mg Oral Tablet',
    savings: '₹640.00',
    brands: [
      { name: 'Crocin Advance', mfg: 'GSK Consumer Healthcare', comp: 'Paracetamol Optizorb', price: '₹32.00', verdict: 'popular' },
      { name: 'Dolo-650', mfg: 'Micro Labs Ltd', comp: 'Paracetamol 650mg', price: '₹24.50', verdict: 'best' },
      { name: 'Jan Aushadhi Pari', mfg: 'Generic Medicine', comp: 'Paracetamol IP', price: '₹12.00', verdict: 'cheap', save: '₹20' },
    ],
    warning: 'Avoid combining with other acetaminophen-containing medications. Consult physician if you consume alcohol regularly.',
    tags: ['HIGH RISK: ALCOHOL', 'MODERATE: WARFARIN'],
  },
  Metformin: {
    category: 'Antidiabetic / Biguanide',
    active: 'Metformin HCl',
    dose: '500mg Oral Tablet',
    savings: '₹480.00',
    brands: [
      { name: 'Glycomet', mfg: 'USV Ltd', comp: 'Metformin HCl 500mg', price: '₹28.00', verdict: 'popular' },
      { name: 'Glucophage', mfg: 'Merck', comp: 'Metformin HCl 500mg', price: '₹45.00', verdict: null },
      { name: 'Metformin IP', mfg: 'Jan Aushadhi', comp: 'Metformin IP', price: '₹9.00', verdict: 'cheap', save: '₹36' },
    ],
    warning: 'Monitor kidney function. Avoid in severe renal impairment. May cause lactic acidosis rarely.',
    tags: ['RENAL CAUTION', 'LACTIC ACIDOSIS RISK'],
  },
  default: {
    category: 'Medication',
    active: 'See label',
    dose: 'As prescribed',
    savings: '₹300.00',
    brands: [
      { name: 'Brand A', mfg: 'Pharma Co.', comp: 'Active Ingredient', price: '₹40.00', verdict: 'popular' },
      { name: 'Brand B', mfg: 'Generic Ltd', comp: 'Active Ingredient IP', price: '₹15.00', verdict: 'cheap', save: '₹25' },
    ],
    warning: 'Consult your physician before use. Follow prescribed dosage.',
    tags: ['CONSULT DOCTOR'],
  }
};

function searchMedicine(query) {
  if (!query.trim()) return;
  const found = medicines.find(m => m.name.toLowerCase().includes(query.toLowerCase()));
  const data = found ? (medicineData[found.name] || medicineData.default) : medicineData.default;
  const displayName = found ? found.name : query;
  renderMedicineInfo(displayName, data);
  navigate('medicine');
}

function renderMedicineInfo(name, data) {
  document.getElementById('medicineName').textContent = name;
  document.getElementById('medicineCategory').textContent = data.category;
  document.getElementById('medicineActive').textContent = data.active;
  document.getElementById('medicineDose').textContent = data.dose;
  document.getElementById('medicineSavings').textContent = data.savings;
  document.getElementById('medicineWarning').textContent = data.warning;

  // Render tags
  const tagsEl = document.getElementById('warnTags');
  tagsEl.innerHTML = data.tags.map(t => `<span class="badge badge-red">${t}</span>`).join('');

  // Render brands table
  const tbody = document.getElementById('brandsTable');
  tbody.innerHTML = data.brands.map(b => `
    <tr>
      <td><strong>${b.name}</strong><br><small style="color:var(--text-muted)">${b.mfg}</small></td>
      <td>${b.comp}</td>
      <td style="font-weight:700">${b.price}</td>
      <td>${b.verdict ? `<span class="verdict-pill verdict-${b.verdict === 'popular' ? 'popular' : 'best'}">${
        b.verdict === 'popular' ? 'POPULAR CHOICE' : b.verdict === 'best' ? 'BEST VALUE' : b.save ? `CHEAPEST · Save ${b.save}` : 'OPTION'
      }</span>` : '—'}</td>
    </tr>
  `).join('');
}

// Init with Paracetamol
function initMedicinePage() {
  renderMedicineInfo('Paracetamol', medicineData['Paracetamol']);
}


