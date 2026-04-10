
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

  // Update topbar title
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
// ===== AUTH MODAL =====
let isLoggedIn = false;
let currentUser = null;

function openAuthModal(tab = 'login') {
  document.getElementById('authModal').classList.add('show');
  switchAuthTab(tab);
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('show');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelector(`[data-auth="${tab}"]`).classList.add('active');
  document.getElementById('form-' + tab).classList.add('active');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
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
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  isLoggedIn = true;
  currentUser = { name, email };
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
// ===== SEARCH HOME =====
function homeSearch() {
  const val = document.getElementById('homeSearchInput').value;
  if (val.trim()) searchMedicine(val);
}


// ===== INIT =====
// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  initMedicinePage();
  navigate('bmi');

  // Enter key for search
  document.getElementById('homeSearchInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') homeSearch();
  });

  document.getElementById('exerciseInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendExerciseMsg();
  });

  // Close modal on overlay click
  document.getElementById('authModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeAuthModal();
  });

  // Animate stats on load
  setTimeout(() => {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      const target = bar.getAttribute('data-width') || bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = target; }, 100);
    });
  }, 500);

  // Generate initial diet plan
  generateDietPlan();
});

