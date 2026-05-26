/* home.js — Guacamayas Querétaro: Landing Page Logic */

// Animate product cards on scroll
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .step, .review-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Quick add from homepage
function addToCart(name, price, imgId) {
  const key = name;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, name, price, imgId, mods: [], qty: 1 });
  }
  saveCart();
  showToast(`🛒 ${name} agregado — <a href="cart.html" style="color:var(--dorado)">Ver carrito</a>`, 'success');
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
