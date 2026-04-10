// ===== KusuriEase - Pharmacy Page JS =====

// ===== PHARMACY =====
// ===== PHARMACY FILTERS =====
function filterPharmacies(filter) {
  document.querySelectorAll('.ph-filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  const cards = document.querySelectorAll('.pharmacy-card');
  cards.forEach(c => {
    if (filter === 'all') { c.style.display = ''; return; }
    const stock = c.dataset.stock;
    c.style.display = stock === filter ? '' : 'none';
  });
}


// ===== TRACKER =====
// ===== MEDICINE TRACKER =====
function toggleMedDone(el) {
  const item = el.closest('.med-item');
  item.classList.toggle('done');
  const check = item.querySelector('.med-check');
  if (item.classList.contains('done')) {
    check.textContent = '✓';
    showToast('💊 Medicine marked as taken!', 'success');
  } else {
    check.textContent = '';
  }
  updateAdherence();
}

function updateAdherence() {
  const total = document.querySelectorAll('.med-item').length;
  const done = document.querySelectorAll('.med-item.done').length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const bar = document.getElementById('adherenceBar');
  const label = document.getElementById('adherenceLabel');
  if (bar) bar.style.width = pct + '%';
  if (label) label.textContent = pct + '% Today';
}


