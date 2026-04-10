

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

// ===== SWITCH BETWEEN LOGIN & REGISTER =====
function switchAuthTab(tab) {
  const loginForm = document.getElementById("form-login");
  const registerForm = document.getElementById("form-register");

  const tabs = document.querySelectorAll(".modal-tab");

  tabs.forEach(btn => btn.classList.remove("active"));
  document.querySelector(`[data-auth="${tab}"]`).classList.add("active");

  if (tab === "login") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }
}

// ===== TOAST MESSAGE =====
function showToast(message, type = "success") {
  const toastWrap = document.querySelector(".toast-wrap");

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  toastWrap.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ===== LOGIN HANDLER =====
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPass").value;

  if (!email || !password) {
    showToast("Please fill all fields", "error");
    return;
  }

  // Fake loading effect
  showToast("Logging in...", "info");

  setTimeout(() => {
    showToast("Welcome back! Redirecting... 🚀", "success");

    // Store login state (for demo)
    localStorage.setItem("user", JSON.stringify({ email }));

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);

  }, 1000);
}

// ===== REGISTER HANDLER =====
function handleRegister(e) {
  e.preventDefault();

  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;

  if (!name || !email || !password) {
    showToast("Please fill all required fields", "error");
    return;
  }

  if (password.length < 8) {
    showToast("Password must be at least 8 characters", "error");
    return;
  }

  showToast("Creating account...", "info");

  setTimeout(() => {
    // Save user (demo only)
    localStorage.setItem("user", JSON.stringify({ name, email }));

    showToast("Account created successfully! 🎉", "success");

    
    switchAuthTab("login");

    setTimeout(() => {
      showToast("Now login with your credentials 😉", "info");
    }, 1000);

  }, 1200);
}
