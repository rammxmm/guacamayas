/* ================================================
   menu.js — Guacamayas Querétaro: Menu & Cart Logic
   ================================================ */

// ── CATALOG DATA ─────────────────────────────────
const CATALOG = {
  guacamayas: [
    {
      id: 'g1',
      name: 'Guacamaya Clásica',
      desc: 'Chicharrón prensado, salsa roja, aguacate y limón en bolillo artesanal',
      price: 42,
      img: 'img/guacamaya-classic.png',
      badges: ['badge-hot'],
      labels: ['🔥 La Original'],
      calories: '480 kcal',
    },
    {
      id: 'g2',
      name: 'Guacamaya Especial',
      desc: 'Doble chicharrón, extra salsa habanero, queso fresco, jalapeño y aguacate',
      price: 68,
      img: 'img/guacamaya-especial.png',
      badges: ['badge-new'],
      labels: ['✨ Chef\'s Choice'],
      calories: '620 kcal',
    },
    {
      id: 'g3',
      name: 'Guacamaya Mini',
      desc: 'Versión pequeña de la clásica, perfecta como botana',
      price: 28,
      img: 'img/guacamaya-classic.png',
      badges: [],
      labels: ['🐥 Mini'],
      calories: '280 kcal',
    },
    {
      id: 'g4',
      name: 'Guacamaya Xtra Picante',
      desc: 'Para los valientes: chicharrón, salsa de chile de árbol, serrano y habanero',
      price: 52,
      img: 'img/guacamaya-especial.png',
      badges: ['badge-hot'],
      labels: ['🌶️🌶️🌶️ Extrema'],
      calories: '510 kcal',
    },
  ],
  combos: [
    {
      id: 'c1',
      name: 'Combo Clásico',
      desc: 'Guacamaya Clásica + Agua de Jamaica 500ml + Papas saladitas',
      price: 69,
      img: 'img/drinks.png',
      badges: ['badge-new'],
      labels: ['💰 Ahorra $18'],
      calories: '780 kcal',
    },
    {
      id: 'c2',
      name: 'Combo Familiar',
      desc: '3 Guacamayas Clásicas + 3 Aguas frescas + 2 bolsas de papas',
      price: 189,
      img: 'img/guacamaya-classic.png',
      badges: [],
      labels: ['👨‍👩‍👧 Para 3 personas'],
      calories: 'Varía',
    },
    {
      id: 'c3',
      name: 'Combo Especial',
      desc: 'Guacamaya Especial + Refresco 355ml + Elote en vaso',
      price: 89,
      img: 'img/guacamaya-especial.png',
      badges: ['badge-hot'],
      labels: ['🔥 Lo más pedido'],
      calories: '890 kcal',
    },
  ],
  bebidas: [
    {
      id: 'b1',
      name: 'Agua de Jamaica',
      desc: 'Refrescante agua de flor de jamaica natural, sin azúcar añadida',
      price: 22,
      img: 'img/drinks.png',
      badges: [],
      labels: ['🌺 Natural'],
      calories: '45 kcal',
    },
    {
      id: 'b2',
      name: 'Agua de Horchata',
      desc: 'Horchata con canela y arroz, receta tradicional',
      price: 22,
      img: 'img/drinks.png',
      badges: [],
      labels: ['🌾 Tradicional'],
      calories: '120 kcal',
    },
    {
      id: 'b3',
      name: 'Agua de Tamarindo',
      desc: 'Tamarindo natural con un toque de chile y limón',
      price: 22,
      img: 'img/drinks.png',
      badges: ['badge-hot'],
      labels: ['🌶️ Con chile'],
      calories: '80 kcal',
    },
    {
      id: 'b4',
      name: 'Coca-Cola',
      desc: 'Refresco de cola, presentación 355ml (lata) o 600ml (botella)',
      price: 18,
      img: 'img/drinks.png',
      badges: [],
      labels: ['🥤 355ml'],
      calories: '140 kcal',
    },
    {
      id: 'b5',
      name: 'Agua Mineral',
      desc: 'Agua mineral natural 600ml',
      price: 15,
      img: 'img/drinks.png',
      badges: [],
      labels: ['💧 600ml'],
      calories: '0 kcal',
    },
    {
      id: 'b6',
      name: 'Michelada (NA)',
      desc: 'Preparado de clamato, limón, chile y sal. Presentación sin alcohol',
      price: 32,
      img: 'img/drinks.png',
      badges: ['badge-hot'],
      labels: ['🍺 Sin alcohol'],
      calories: '95 kcal',
    },
  ],
  extras: [
    {
      id: 'e1',
      name: 'Papas Saladitas',
      desc: 'Bolsa individual de papas fritas con limón y chile',
      price: 12,
      img: 'img/guacamaya-classic.png',
      badges: [],
      labels: ['🥔'],
      calories: '160 kcal',
    },
    {
      id: 'e2',
      name: 'Elote en Vaso',
      desc: 'Elote desgranado con crema, queso, mayonesa y chile',
      price: 25,
      img: 'img/guacamaya-classic.png',
      badges: ['badge-new'],
      labels: ['🌽 Querétaro style'],
      calories: '210 kcal',
    },
    {
      id: 'e3',
      name: 'Salsa Extra',
      desc: 'Vasito de salsa: elige roja, verde o habanero',
      price: 8,
      img: 'img/guacamaya-classic.png',
      badges: [],
      labels: ['🌶️'],
      calories: '20 kcal',
    },
    {
      id: 'e4',
      name: 'Chicharrón Extra',
      desc: 'Porción extra de chicharrón prensado para tu guacamaya',
      price: 18,
      img: 'img/guacamaya-especial.png',
      badges: [],
      labels: ['💪 Extra'],
      calories: '240 kcal',
    },
  ],
};

// ── CUSTOMIZER OPTIONS ───────────────────────────
const CUSTOMIZER_OPTIONS = {
  tamano: {
    label: 'Tamaño', required: true, type: 'radio',
    options: [
      { value: 'mediana', label: 'Mediana', extra: 0 },
      { value: 'grande',  label: 'Grande',  extra: 10 },
    ]
  },
  salsa: {
    label: 'Salsa', required: true, type: 'radio',
    options: [
      { value: 'roja',     label: '🌶️ Roja (media)', extra: 0 },
      { value: 'verde',    label: '🟢 Verde (suave)', extra: 0 },
      { value: 'habanero', label: '🔥 Habanero (picante)', extra: 0 },
      { value: 'xpicante', label: '💀 Xtra picante', extra: 0 },
    ]
  },
  extras: {
    label: 'Extras (opcionales)', required: false, type: 'checkbox',
    options: [
      { value: 'aguacate',  label: '🥑 Extra aguacate',  extra: 8 },
      { value: 'queso',     label: '🧀 Queso fresco',    extra: 10 },
      { value: 'jalapeno',  label: '🌶️ Jalapeño',        extra: 5 },
      { value: 'chicharron',label: '💪 +Chicharrón',     extra: 18 },
    ]
  },
};

// ── CURRENT ITEM STATE (Customizer) ──────────────
let currentItem = null;
let custQuantity = 1;
let selectedOptions = {};

// ── RENDER FUNCTIONS ─────────────────────────────
function renderMenuSection(items, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.onclick = () => openCustomizer(item);

    const badgesHtml = item.labels.map((l, i) => {
      const cls = item.badges[i] || '';
      return `<span class="badge ${cls}" style="font-size:0.72rem">${l}</span>`;
    }).join('');

    card.innerHTML = `
      <div class="menu-item-body">
        <div class="menu-item-badges">${badgesHtml}</div>
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-desc">${item.desc}</div>
        <div class="menu-item-footer">
          <span class="price" style="font-size:1.15rem">$${item.price}</span>
          <button class="item-add-btn" onclick="event.stopPropagation();openCustomizer(${JSON.stringify(item).replace(/"/g,"'")})" title="Agregar">+</button>
        </div>
      </div>
      <img class="menu-item-img" src="${item.img}" alt="${item.name}" loading="lazy">
    `;
    grid.appendChild(card);
  });
}

function initMenu() {
  renderMenuSection(CATALOG.guacamayas, 'menuGrid');
  renderMenuSection(CATALOG.combos, 'combosGrid');
  renderMenuSection(CATALOG.bebidas, 'bebidasGrid');
  renderMenuSection(CATALOG.extras, 'extrasGrid');
  renderCartSidebar();
}

// ── CATEGORY FILTER ──────────────────────────────
function filterCategory(cat) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-cat="${cat}"]`)?.classList.add('active');

  const sections = document.querySelectorAll('.menu-section');
  sections.forEach(sec => {
    if (cat === 'all' || sec.dataset.section === cat) {
      sec.style.display = '';
    } else {
      sec.style.display = 'none';
    }
  });
}

// ── CUSTOMIZER ───────────────────────────────────
function openCustomizer(item) {
  if (typeof item === 'string') item = JSON.parse(item.replace(/'/g, '"'));
  currentItem = item;
  custQuantity = 1;
  selectedOptions = { tamano: 'mediana', extras: [] };

  // Header
  document.getElementById('customizerHeader').innerHTML = `
    <img class="customizer-img" src="${item.img}" alt="${item.name}">
    <div>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <div style="margin-top:0.5rem">
        <span class="price" style="font-size:1.2rem">$${item.price}</span>
        <span style="font-size:0.8rem;color:var(--gris);margin-left:0.5rem">${item.calories || ''}</span>
      </div>
    </div>
  `;

  // Body — only show customizer for guacamayas
  const isGuacamaya = CATALOG.guacamayas.find(g => g.id === item.id);
  let bodyHtml = '';

  if (isGuacamaya) {
    Object.entries(CUSTOMIZER_OPTIONS).forEach(([key, group]) => {
      const reqBadge = group.required
        ? `<span class="req">Requerido</span>`
        : '';

      const optionsHtml = group.options.map(opt => {
        const extraLabel = opt.extra > 0 ? `<span class="option-extra">+$${opt.extra}</span>` : '';
        return `
          <label class="option-chip" id="chip-${key}-${opt.value}" onclick="selectOption('${key}','${opt.value}','${group.type}')">
            <span>${opt.label}</span>
            ${extraLabel}
          </label>
        `;
      }).join('');

      bodyHtml += `
        <div class="customizer-section">
          <h4>${group.label} ${reqBadge}</h4>
          <div class="options-grid">${optionsHtml}</div>
        </div>
      `;
    });

    // Pre-select defaults
    setTimeout(() => {
      selectOption('tamano', 'mediana', 'radio');
    }, 50);
  }

  document.getElementById('customizerBody').innerHTML = bodyHtml;
  updateCustTotal();

  document.getElementById('custQtyNum').textContent = 1;
  document.getElementById('customizerModal').classList.add('open');
}

function closeCustomizer() {
  document.getElementById('customizerModal').classList.remove('open');
  currentItem = null;
}

function selectOption(key, value, type) {
  if (type === 'radio') {
    // Deselect all in group
    document.querySelectorAll(`[id^="chip-${key}-"]`).forEach(el => el.classList.remove('selected'));
    document.getElementById(`chip-${key}-${value}`)?.classList.add('selected');
    selectedOptions[key] = value;
  } else {
    // Toggle checkbox
    const chip = document.getElementById(`chip-${key}-${value}`);
    if (!selectedOptions[key]) selectedOptions[key] = [];

    const idx = selectedOptions[key].indexOf(value);
    if (idx > -1) {
      selectedOptions[key].splice(idx, 1);
      chip?.classList.remove('selected');
    } else {
      selectedOptions[key].push(value);
      chip?.classList.add('selected');
    }
  }
  updateCustTotal();
}

function custQty(delta) {
  custQuantity = Math.max(1, custQuantity + delta);
  document.getElementById('custQtyNum').textContent = custQuantity;
  updateCustTotal();
}

function updateCustTotal() {
  if (!currentItem) return;
  let extra = 0;

  // Tamaño extra
  if (selectedOptions.tamano === 'grande') extra += 10;

  // Extras checkbox
  const extrasSelected = selectedOptions.extras || [];
  extrasSelected.forEach(val => {
    const opt = CUSTOMIZER_OPTIONS.extras.options.find(o => o.value === val);
    if (opt) extra += opt.extra;
  });

  const total = (currentItem.price + extra) * custQuantity;
  document.getElementById('custTotal').textContent = `$${total}`;
}

function addCustomized() {
  if (!currentItem) return;

  // Validate required
  if (CATALOG.guacamayas.find(g => g.id === currentItem.id) && !selectedOptions.tamano) {
    showToast('Por favor selecciona el tamaño 📏', 'warning');
    return;
  }

  let extra = 0;
  const mods = [];

  if (selectedOptions.tamano) {
    if (selectedOptions.tamano === 'grande') extra += 10;
    mods.push(`Tamaño: ${selectedOptions.tamano}`);
  }

  if (selectedOptions.salsa) mods.push(`Salsa: ${selectedOptions.salsa}`);

  (selectedOptions.extras || []).forEach(val => {
    const opt = CUSTOMIZER_OPTIONS.extras.options.find(o => o.value === val);
    if (opt) { extra += opt.extra; mods.push(`+${opt.label}`); }
  });

  const finalPrice = currentItem.price + extra;

  for (let i = 0; i < custQuantity; i++) {
    addToCart(currentItem.name, finalPrice, currentItem.imgId || 1, mods);
  }

  closeCustomizer();
  renderCartSidebar();
}

// ── CART SIDEBAR RENDER ───────────────────────────
function renderCartSidebar() {
  const list = document.getElementById('cartItemsList');
  const empty = document.getElementById('cartEmpty');
  const summary = document.getElementById('cartSummary');
  const count = document.getElementById('sidebarCount');

  if (!list) return;

  const total = cart.reduce((s, i) => s + i.qty, 0);
  if (count) count.textContent = `${total} item${total !== 1 ? 's' : ''}`;

  if (cart.length === 0) {
    if (empty) empty.style.display = '';
    if (summary) summary.style.display = 'none';
    list.innerHTML = '';
    list.appendChild(empty || createEmptyEl());
    return;
  }

  if (empty) empty.style.display = 'none';
  if (summary) summary.style.display = '';

  list.innerHTML = '';
  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    const modsHtml = item.mods && item.mods.length
      ? `<div class="cart-row-mods">${item.mods.join(' · ')}</div>`
      : '';

    row.innerHTML = `
      <div>
        <div class="cart-row-name">${item.name}</div>
        ${modsHtml}
      </div>
      <div class="cart-row-qty">
        <button class="cart-qty-btn" onclick="cartAdjust('${item.key}',-1)">−</button>
        <span class="cart-qty-num">${item.qty}</span>
        <button class="cart-qty-btn" onclick="cartAdjust('${item.key}',1)">+</button>
      </div>
      <span class="cart-row-price">$${(item.price * item.qty)}</span>
    `;
    list.appendChild(row);
  });

  updateSummary();
}

function cartAdjust(key, delta) {
  updateQty(key, delta);
  renderCartSidebar();
}

let promoDiscount = 0;

function updateSummary() {
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 35 : 0;
  const total = subtotal + shipping - promoDiscount;

  const el = id => document.getElementById(id);
  if (el('subtotalPrice')) el('subtotalPrice').textContent = `$${subtotal}`;
  if (el('shippingPrice')) el('shippingPrice').textContent = subtotal > 0 ? '$35' : '$0';
  if (el('totalPrice'))    el('totalPrice').textContent = `$${total}`;

  if (el('discountRow')) {
    el('discountRow').style.display = promoDiscount > 0 ? 'flex' : 'none';
    if (el('discountPrice')) el('discountPrice').textContent = `-$${promoDiscount}`;
  }
}

function applyPromo() {
  const code = document.getElementById('promoInput')?.value.trim().toUpperCase();
  const PROMOS = { 'BIENVENIDO10': 0.10, 'GUACAMAYA15': 0.15, 'LEON20': 0.20 };

  if (PROMOS[code]) {
    promoDiscount = Math.round(getCartTotal() * PROMOS[code]);
    showToast(`🎉 Descuento del ${PROMOS[code]*100}% aplicado: -$${promoDiscount}`, 'success');
    updateSummary();
  } else {
    showToast('Código de promo inválido ❌', 'error');
  }
}

function goToCheckout() {
  if (cart.length === 0) {
    showToast('Agrega algo a tu carrito primero 🛒', 'warning');
    return;
  }
  if (!requireAuth()) return;
  window.location.href = 'cart.html';
}

// ── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMenu();

  // Close modal on overlay click
  document.getElementById('customizerModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeCustomizer();
  });

  // Mobile cart toggle
  const sidebar = document.getElementById('cartSidebar');
  const cartBtn = document.getElementById('cartBtn');
  if (sidebar && window.innerWidth < 1100) {
    const handle = document.createElement('div');
    handle.style.cssText = 'height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:var(--marron);border-radius:24px 24px 0 0';
    handle.innerHTML = '<div style="width:40px;height:4px;background:rgba(255,255,255,0.3);border-radius:2px"></div>';
    sidebar.insertBefore(handle, sidebar.firstChild);
    handle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
});
