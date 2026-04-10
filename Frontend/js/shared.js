// ===== THEME MANAGEMENT =====
const THEME_KEY = 'kusuriease_theme';
let currentTheme = localStorage.getItem(THEME_KEY) || 'light';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
  localStorage.setItem(THEME_KEY, theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.innerHTML = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}


// ===== NAVIGATION =====
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  const page = document.getElementById('page-' + pageId);
  const navItem = document.querySelector(`[data-page="${pageId}"]`);
  
  if (page) page.classList.add('active');
  if (navItem) navItem.classList.add('active');

  const titles = {
    home: 'Home',
    medicine: 'Medicine Info',
    pharmacy: 'Pharmacy Finder',
    dashboard: 'Health Dashboard',
    diet: 'Diet Planner',
    exercise: 'AI Exercise Advisor',
    bmi: 'BMI Calculator'
  };
  const topbarTitle = document.getElementById('topbarTitle');
  if (topbarTitle) topbarTitle.textContent = titles[pageId] || 'KusuriEase';

  closeSidebar();
  window.scrollTo(0, 0);
}


// ===== SIDEBAR =====
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.querySelector('.overlay').classList.toggle('show');
}

function closeSidebar() {
  document.querySelector('.sidebar')?.classList.remove('open');
  document.querySelector('.overlay')?.classList.remove('show');
}


// ===== AUTH =====
let isLoggedIn = false;
let currentUser = null;

function openAuthModal(tab = 'login') {
  document.getElementById('authModal').classList.add('show');
  switchAuthTab(tab);
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('show');
}

// FIX: inline style bhi set karo taaki display:none/block override ho sake
function switchAuthTab(tab) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => {
    f.classList.remove('active');
    f.style.display = 'none';
  });
  document.querySelector(`[data-auth="${tab}"]`).classList.add('active');
  const activeForm = document.getElementById('form-' + tab);
  activeForm.classList.add('active');
  activeForm.style.display = 'block';
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;

  if (!email || !pass) {
    showToast('Please fill all fields.', 'warn');
    return;
  }

  const name = email.split('@')[0];
  isLoggedIn = true;
  currentUser = { name: name.charAt(0).toUpperCase() + name.slice(1), email };
  updateUserUI();
  closeAuthModal();
  showToast('✅ Welcome back, ' + currentUser.name + '!');
  updateGreeting();
}

function handleRegister(e) {
  e.preventDefault();

  const name        = document.getElementById('regName').value.trim();
  const email       = document.getElementById('regEmail').value.trim();
  const phone       = document.getElementById('regPhone').value.trim();
  const dob         = document.getElementById('regDob').value;
  const gender      = document.getElementById('regGender').value;
  const blood       = document.getElementById('regBlood').value;
  const condition   = document.getElementById('regCondition').value;
  const allergies   = document.getElementById('regAllergies').value.trim();
  const pass        = document.getElementById('regPass').value;
  const passConfirm = document.getElementById('regPassConfirm').value;

  if (!name || !email || !phone || !dob || !gender || !pass || !passConfirm) {
    showToast('⚠️ Please fill all required fields.', 'warn');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('❌ Please enter a valid email address.', 'error');
    return;
  }

  if (!/^[\d\s\+\-\(\)]{7,15}$/.test(phone)) {
    showToast('❌ Please enter a valid phone number.', 'error');
    return;
  }

  if (pass.length < 8) {
    showToast('❌ Password must be at least 8 characters.', 'error');
    return;
  }

  if (pass !== passConfirm) {
    showToast('❌ Passwords do not match.', 'error');
    return;
  }

  isLoggedIn = true;
  currentUser = { name, email, phone, dob, gender, blood, condition, allergies };

  updateUserUI();
  closeAuthModal();
  showToast('🎉 Account created! Welcome, ' + name + '!');
  updateGreeting();
}

function updateUserUI() {
  const avatar = document.getElementById('userAvatar');
  if (avatar && currentUser) {
    avatar.textContent = currentUser.name.charAt(0).toUpperCase();
    avatar.title = currentUser.name;
  }
}

function updateGreeting() {
  const el = document.getElementById('greetingName');
  if (el && currentUser) el.textContent = currentUser.name;
}


// ===== TOAST =====
function showToast(msg, type = 'info') {
  const icons = { info: 'ℹ️', success: '✅', warn: '⚠️', error: '❌' };
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  document.querySelector('.toast-wrap').appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}


// ===== SEARCH =====
function homeSearch() {
  const val = document.getElementById('homeSearchInput').value;
  if (val.trim()) searchMedicine(val);
}


// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  initMedicinePage();
  navigate('bmi');

  document.getElementById('homeSearchInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') homeSearch();
  });

  document.getElementById('exerciseInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendExerciseMsg();
  });

  document.getElementById('authModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeAuthModal();
  });

  setTimeout(() => {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      const target = bar.getAttribute('data-width') || bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = target; }, 100);
    });
  }, 500);

  generateDietPlan();
});