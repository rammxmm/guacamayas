/* ================================================
   app.js — Guacamayas Querétaro: Shared Utilities
   ================================================ */

// ── CART STATE ──────────────────────────────────
let cart = JSON.parse(localStorage.getItem('gcm_cart') || '[]');

function saveCart() {
  localStorage.setItem('gcm_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function addToCart(name, price, imgId, mods = []) {
  const key = name + JSON.stringify(mods);
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, name, price, imgId, mods, qty: 1 });
  }
  saveCart();
  showToast(`🛒 ${name} agregado al carrito`, 'success');
  animateCartBtn();
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
}

function updateQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(key);
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCartSidebar();
  showToast('🗑 Carrito vacío', 'warning');
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function animateCartBtn() {
  const btn = document.getElementById('cartBtn');
  if (!btn) return;
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => { btn.style.transform = ''; }, 300);
}

// ── TOAST ────────────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? '' : type}`;
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── AUTH HELPERS ─────────────────────────────────
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem('gcm_user')); }
  catch { return null; }
}

function requireAuth() {
  if (!getCurrentUser()) {
    showToast('Inicia sesión para ordenar 🔐', 'warning');
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem('gcm_user');
  window.location.href = 'login.html';
}

// ── NAV UPDATES ──────────────────────────────────
function initNav() {
  updateCartBadge();
  const user = getCurrentUser();
  const loginBtn  = document.getElementById('loginBtn');
  const profileBtn = document.getElementById('profileBtn');
  const navUserName = document.getElementById('navUserName');

  if (user) {
    const name = user.nombre || user.name || user.email?.split('@')[0] || 'Usuario';
    if (loginBtn)   { loginBtn.textContent = 'Salir'; loginBtn.href = '#'; loginBtn.onclick = () => logout(); }
    if (profileBtn) { profileBtn.style.display = 'inline-flex'; }
    if (navUserName) { navUserName.textContent = name.split(' ')[0]; }
  }

  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    nav.style.background = window.scrollY > 40
      ? 'rgba(10,10,15,0.99)'
      : 'rgba(10,10,15,0.96)';
  });
}

document.addEventListener('DOMContentLoaded', initNav);
