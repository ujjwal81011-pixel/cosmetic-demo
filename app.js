/* ==========================================================================
   [Your Brand Name] - Cosmetics Boutique Core Application Logic
   ========================================================================== */

// --- Global State ---
const state = {
  currency: localStorage.getItem('cosmetic_currency') || 'INR', // 'INR' or 'USD'
  rateUSD: 0.012, // Conversion rate for simulated multi-currency display
  cart: JSON.parse(localStorage.getItem('cosmetic_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('cosmetic_wishlist')) || [],
  appliedPromo: null,
  activeCategory: 'all',
  quizAnswers: {}
};

// --- Products Database (Equipped with clean Placeholders) ---
const PRODUCTS = [
  {
    id: 'prod-01',
    name: '[Luminous Peptide Glow Serum]',
    category: 'skincare',
    badge: '[Best Seller]',
    badgeClass: '',
    rating: 4.9,
    reviews: 248,
    priceINR: 1499,
    mrpINR: 1999,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    benefit: 'Targeted hydration infused with multi-molecular peptides & 2% Hyaluronic acid for glass-skin radiance.',
    shades: null,
    sizes: ['30ml', '50ml (Value Size)'],
    ingredients: 'Hyaluronic Acid, Copper Peptides, Damask Rose Extract, Niacinamide'
  },
  {
    id: 'prod-02',
    name: '[Velvet Cloud Matte Lipstick]',
    category: 'lips',
    badge: '[Trending]',
    badgeClass: 'sale',
    rating: 4.8,
    reviews: 192,
    priceINR: 899,
    mrpINR: 1199,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    benefit: '12-hour weightless matte finish enriched with organic argan oil and vitamin E.',
    shades: ['#B84A48', '#8E2827', '#C46B63', '#964B3B', '#D98282'],
    sizes: ['3.8g'],
    ingredients: 'Argan Kernel Oil, Shea Butter, Vitamin E, Botanical Mineral Pigments'
  },
  {
    id: 'prod-03',
    name: '[Silk Radiance Liquid Foundation]',
    category: 'makeup',
    badge: '[12 Shades]',
    badgeClass: '',
    rating: 4.9,
    reviews: 310,
    priceINR: 1899,
    mrpINR: 2399,
    image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=800&q=80',
    benefit: 'Medium-to-full buildable coverage with a luminous, second-skin finish that breathes.',
    shades: ['#F3DECC', '#E8C7A5', '#DBAC83', '#B88258', '#8A5633'],
    sizes: ['35ml'],
    ingredients: 'Squalane, Jojoba Seed Oil, Centella Asiatica, SPF 25 Non-Nano Zinc'
  },
  {
    id: 'prod-04',
    name: '[Rosehip & Bakuchiol Night Elixir]',
    category: 'skincare',
    badge: '[100% Organic]',
    badgeClass: 'organic',
    rating: 5.0,
    reviews: 178,
    priceINR: 1799,
    mrpINR: 2299,
    image: 'https://images.unsplash.com/photo-1608248597359-00f72365eb5c?auto=format&fit=crop&w=800&q=80',
    benefit: 'Plant-powered retinol alternative that accelerates overnight skin repair without redness.',
    shades: null,
    sizes: ['30ml'],
    ingredients: 'Cold-Pressed Wild Rosehip Oil, 1% Bakuchiol, Vitamin C Ester, Squalane'
  },
  {
    id: 'prod-05',
    name: '[Eau De Parfum - Amber Jasmine]',
    category: 'fragrance',
    badge: '[Signature Scent]',
    badgeClass: '',
    rating: 4.9,
    reviews: 142,
    priceINR: 2499,
    mrpINR: 2999,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    benefit: 'A hypnotic blend of organic wild jasmine, warm amber resin, and creamy Mysore sandalwood.',
    shades: null,
    sizes: ['50ml', '100ml'],
    ingredients: 'Pure Perfume Oil, Organic Grain Alcohol, Natural Jasmine Absolute'
  },
  {
    id: 'prod-06',
    name: '[Hydra-Plump Peptide Lip Glaze]',
    category: 'lips',
    badge: '[New Arrival]',
    badgeClass: '',
    rating: 4.7,
    reviews: 96,
    priceINR: 699,
    mrpINR: 899,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    benefit: 'Glassy high-shine peptide treatment that visibly plumps and cushions chapped lips.',
    shades: ['#F8CCD2', '#E28E9A', '#D16075'],
    sizes: ['15ml Tube'],
    ingredients: 'Tri-Peptide 1, Sunflower Seed Wax, Hyaluronic Spheres, Vanilla Pod Extract'
  },
  {
    id: 'prod-07',
    name: '[Deep Moisture Barrier Cream]',
    category: 'skincare',
    badge: '[Dermatologist Choice]',
    badgeClass: 'organic',
    rating: 4.9,
    reviews: 215,
    priceINR: 1299,
    mrpINR: 1699,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    benefit: 'Ceramide-rich barrier restorative moisturizer delivering 72 hours of uninterrupted hydration.',
    shades: null,
    sizes: ['50g Jar'],
    ingredients: 'Ceramide NP, Madecassoside, Colloidal Oatmeal, Shea Butter'
  },
  {
    id: 'prod-08',
    name: '[Enchanted Sunset Eyeshadow Palette]',
    category: 'makeup',
    badge: '[Limited Edition]',
    badgeClass: 'sale',
    rating: 4.8,
    reviews: 164,
    priceINR: 1999,
    mrpINR: 2499,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    benefit: '9 buttery, high-pigment shades featuring velvet mattes and duochrome metallic shimmers.',
    shades: ['#D67C65', '#B84534', '#E6B072', '#C98A5B', '#4A2A22'],
    sizes: ['9 Pan Palette'],
    ingredients: 'Mica, Organic Coconut Triglycerides, Botanical Jojoba Esters'
  }
];

// --- Currency Formatter Helper ---
function formatPrice(amountINR) {
  if (state.currency === 'USD') {
    const usd = (amountINR * state.rateUSD).toFixed(2);
    return `$ ${usd}`;
  }
  return `₹ ${amountINR.toLocaleString('en-IN')}`;
}

// --- DOM Content Loaded Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initNoticeBanner();
  initStickyHeader();
  initCurrencyToggle();
  initProductsGrid();
  initCategoryTabs();
  initCartDrawer();
  initWishlist();
  initSearchOverlay();
  initMobileDrawer();
  initRoutineQuiz();
  initModals();
  initForms();
  updateBadges();
});

// ==========================================================================
// 1. Notice Banner & Sticky Header
// ==========================================================================
function initNoticeBanner() {
  const notice = document.getElementById('placeholder-notice');
  const closeBtn = document.getElementById('close-guide');
  
  if (localStorage.getItem('cosmetic_guide_dismissed') === 'true') {
    if (notice) notice.style.display = 'none';
  }

  if (closeBtn && notice) {
    closeBtn.addEventListener('click', () => {
      notice.style.display = 'none';
      localStorage.setItem('cosmetic_guide_dismissed', 'true');
    });
  }
}

function initStickyHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================================================
// 2. Currency Switcher (INR vs USD)
// ==========================================================================
function initCurrencyToggle() {
  const btn = document.getElementById('currency-toggle');
  if (!btn) return;

  function updateButtonLabel() {
    btn.textContent = state.currency === 'INR' ? '₹ INR (Click for $)' : '$ USD (Click for ₹)';
  }

  updateButtonLabel();

  btn.addEventListener('click', () => {
    state.currency = state.currency === 'INR' ? 'USD' : 'INR';
    localStorage.setItem('cosmetic_currency', state.currency);
    updateButtonLabel();
    renderProducts();
    renderCart();
    showToast(`Currency changed to ${state.currency}`);
  });
}

// ==========================================================================
// 3. Products Grid Rendering & Filter Tabs
// ==========================================================================
function initProductsGrid() {
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const filtered = state.activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === state.activeCategory);

  grid.innerHTML = filtered.map(product => {
    const isFav = state.wishlist.includes(product.id);
    const shadeDots = product.shades 
      ? `<div class="shade-swatches">
          ${product.shades.map(s => `<span class="shade-dot" style="background-color: ${s};" title="Shade"></span>`).join('')}
         </div>`
      : '';

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-image-box">
          <span class="product-badge ${product.badgeClass}">${product.badge}</span>
          <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleWishlist('${product.id}')" aria-label="Add to Wishlist">
            ${isFav ? '❤️' : '🤍'}
          </button>
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <button class="quick-view-btn" onclick="openQuickView('${product.id}')">Quick View</button>
        </div>

        <div class="card-content">
          <span class="product-category-meta">[Category: ${product.category.toUpperCase()}]</span>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-benefit">${product.benefit}</p>

          <div class="product-rating-row">
            <span class="rating-stars-small">★★★★★</span>
            <span class="rating-count">${product.rating} (${product.reviews} reviews)</span>
          </div>

          ${shadeDots}

          <div class="card-footer-row">
            <div class="price-box">
              <span class="price-current">${formatPrice(product.priceINR)}</span>
              <span class="price-mrp">${formatPrice(product.mrpINR)}</span>
            </div>
            <button class="add-cart-btn" onclick="addToCart('${product.id}')">
              <span>+ Add to Bag</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function initCategoryTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeCategory = tab.getAttribute('data-filter');
      renderProducts();
    });
  });
}

// Global category trigger (e.g. from category cards)
window.filterByCategory = function(category) {
  state.activeCategory = category;
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(t => {
    if (t.getAttribute('data-filter') === category) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
  renderProducts();
  const el = document.getElementById('bestsellers');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// ==========================================================================
// 4. Cart Drawer Logic & Checkout
// ==========================================================================
function initCartDrawer() {
  const cartBtn = document.getElementById('cart-toggle-btn');
  const mCartBtn = document.getElementById('m-cart-trigger');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const promoBtn = document.getElementById('apply-promo-btn');
  const checkoutBtn = document.getElementById('checkout-btn');

  function openCart() {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    renderCart();
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (mCartBtn) mCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  // Promo Code Handler
  if (promoBtn) {
    promoBtn.addEventListener('click', () => {
      const codeInput = document.getElementById('promo-code-input');
      const promoMsg = document.getElementById('promo-message');
      const code = codeInput.value.trim().toUpperCase();

      if (code === 'GLOW20') {
        state.appliedPromo = { code: 'GLOW20', discount: 0.20 };
        promoMsg.className = 'promo-msg success';
        promoMsg.textContent = '🎉 20% Discount Code [GLOW20] Applied!';
        showToast('Promo code GLOW20 applied! 20% saved.');
      } else if (code === '') {
        promoMsg.className = 'promo-msg error';
        promoMsg.textContent = 'Please enter a coupon code.';
      } else {
        promoMsg.className = 'promo-msg error';
        promoMsg.textContent = 'Invalid promo code. Try using [GLOW20]!';
      }
      renderCart();
    });
  }

  // Checkout Handler
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Your shopping bag is empty!');
        return;
      }
      closeCart();
      const checkoutModal = document.getElementById('checkout-modal');
      if (checkoutModal) checkoutModal.classList.add('open');

      // Clear cart after checkout
      state.cart = [];
      state.appliedPromo = null;
      localStorage.setItem('cosmetic_cart', JSON.stringify(state.cart));
      updateBadges();
      renderCart();
    });
  }

  const continueBtn = document.getElementById('continue-shopping-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const checkoutModal = document.getElementById('checkout-modal');
      if (checkoutModal) checkoutModal.classList.remove('open');
    });
  }

  renderCart();
}

window.addToCart = function(productId, qty = 1, shade = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.id === productId && item.shade === shade);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      priceINR: product.priceINR,
      image: product.image,
      qty: qty,
      shade: shade || (product.shades ? product.shades[0] : null)
    });
  }

  localStorage.setItem('cosmetic_cart', JSON.stringify(state.cart));
  updateBadges();
  renderCart();
  showToast(`Added ${product.name} to your bag! 🛍️`);

  // Open cart drawer
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
  }
};

window.updateCartQty = function(id, shade, delta) {
  const item = state.cart.find(i => i.id === id && i.shade === shade);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => !(i.id === id && i.shade === shade));
  }

  localStorage.setItem('cosmetic_cart', JSON.stringify(state.cart));
  updateBadges();
  renderCart();
};

window.removeFromCart = function(id, shade) {
  state.cart = state.cart.filter(i => !(i.id === id && i.shade === shade));
  localStorage.setItem('cosmetic_cart', JSON.stringify(state.cart));
  updateBadges();
  renderCart();
  showToast('Item removed from shopping bag.');
};

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const countText = document.getElementById('cart-item-count-text');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const discountRow = document.getElementById('discount-row');
  const discountEl = document.getElementById('cart-discount-val');
  const shippingEl = document.getElementById('cart-shipping-val');
  const totalEl = document.getElementById('cart-total-val');
  const shippingFill = document.getElementById('shipping-progress-fill');
  const shippingText = document.getElementById('shipping-progress-text');

  if (!container) return;

  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (countText) countText.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-icon">🛍️</div>
        <h4>Your shopping bag is empty</h4>
        <p>Explore our clean beauty formulas to start glowing.</p>
        <button class="btn btn-outline" onclick="document.getElementById('close-cart-btn').click();">Start Shopping</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    if (discountRow) discountRow.style.display = 'none';
    if (shippingEl) shippingEl.textContent = formatPrice(0);
    if (totalEl) totalEl.textContent = formatPrice(0);
    if (shippingFill) shippingFill.style.width = '0%';
    return;
  }

  container.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-price">${formatPrice(item.priceINR)}</div>
        ${item.shade ? `<small style="color: var(--text-muted);">Shade: <span style="display:inline-block;width:10px;height:10px;background:${item.shade};border-radius:50%;vertical-align:middle;"></span></small>` : ''}
        
        <div class="cart-item-actions">
          <div class="qty-counter">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', '${item.shade}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', '${item.shade}', 1)">+</button>
          </div>
          <button class="remove-item-btn" onclick="removeFromCart('${item.id}', '${item.shade}')">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  // Calculations
  const subtotalINR = state.cart.reduce((sum, item) => sum + (item.priceINR * item.qty), 0);
  let discountINR = 0;
  if (state.appliedPromo) {
    discountINR = Math.round(subtotalINR * state.appliedPromo.discount);
    if (discountRow) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `- ${formatPrice(discountINR)}`;
    }
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  const freeThresholdINR = 999;
  const isFreeShipping = subtotalINR >= freeThresholdINR;
  const shippingINR = isFreeShipping ? 0 : 99;

  if (shippingEl) {
    shippingEl.textContent = isFreeShipping ? 'FREE ✨' : formatPrice(shippingINR);
  }

  if (shippingFill && shippingText) {
    const progress = Math.min(100, Math.round((subtotalINR / freeThresholdINR) * 100));
    shippingFill.style.width = `${progress}%`;
    if (isFreeShipping) {
      shippingText.innerHTML = `🎉 You unlocked <strong>FREE Luxury Shipping</strong>!`;
    } else {
      const rem = freeThresholdINR - subtotalINR;
      shippingText.innerHTML = `Add <strong>${formatPrice(rem)}</strong> more for <strong>FREE Luxury Shipping</strong> 🎁`;
    }
  }

  const finalTotalINR = Math.max(0, subtotalINR - discountINR + shippingINR);
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotalINR);
  if (totalEl) totalEl.textContent = formatPrice(finalTotalINR);
}

// ==========================================================================
// 5. Wishlist System
// ==========================================================================
function initWishlist() {
  const wishlistBtn = document.getElementById('wishlist-toggle-btn');
  const mWishlistBtn = document.getElementById('m-wishlist-trigger');

  function openWishlistToast() {
    if (state.wishlist.length === 0) {
      showToast('Your wishlist is empty. Tap ❤️ on any product to save!');
    } else {
      showToast(`You have ${state.wishlist.length} item(s) saved in your wishlist ❤️`);
    }
  }

  if (wishlistBtn) wishlistBtn.addEventListener('click', openWishlistToast);
  if (mWishlistBtn) mWishlistBtn.addEventListener('click', openWishlistToast);
}

window.toggleWishlist = function(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from wishlist 🤍');
  } else {
    state.wishlist.push(productId);
    showToast('Saved to wishlist ❤️');
  }

  localStorage.setItem('cosmetic_wishlist', JSON.stringify(state.wishlist));
  updateBadges();
  renderProducts();
};

function updateBadges() {
  const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const cartBadge = document.getElementById('cart-badge');
  const mCartCount = document.getElementById('m-cart-count');
  if (cartBadge) cartBadge.textContent = cartCount;
  if (mCartCount) mCartCount.textContent = cartCount;

  const wishCount = state.wishlist.length;
  const wishBadge = document.getElementById('wishlist-badge');
  const mWishCount = document.getElementById('m-wishlist-count');
  if (wishBadge) wishBadge.textContent = wishCount;
  if (mWishCount) mWishCount.textContent = wishCount;
}

// ==========================================================================
// 6. Quick View Modal
// ==========================================================================
window.openQuickView = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;

  const shadePicker = product.shades ? `
    <div class="modal-options-block">
      <span class="modal-opt-label">Select Color Shade:</span>
      <div class="shade-selectors">
        ${product.shades.map((s, idx) => `
          <div class="modal-shade-circle ${idx === 0 ? 'active' : ''}" style="background-color: ${s};" data-shade="${s}"></div>
        `).join('')}
      </div>
    </div>
  ` : '';

  const sizeOptions = product.sizes ? `
    <div class="modal-options-block">
      <span class="modal-opt-label">Size / Net Weight:</span>
      <p style="font-size:0.88rem;color:var(--text-main);">${product.sizes.join(' • ')}</p>
    </div>
  ` : '';

  modalContent.innerHTML = `
    <div class="modal-body-grid">
      <img src="${product.image}" alt="${product.name}" class="modal-product-img" />
      <div class="modal-product-info">
        <span class="modal-badge">${product.badge} • ${product.category.toUpperCase()}</span>
        <h2 class="modal-title">${product.name}</h2>
        <div class="modal-price-row">
          <span class="modal-price">${formatPrice(product.priceINR)}</span>
          <span class="modal-mrp">${formatPrice(product.mrpINR)}</span>
        </div>
        <p class="modal-desc">${product.benefit}</p>
        
        ${shadePicker}
        ${sizeOptions}

        <div class="modal-options-block">
          <span class="modal-opt-label">Key Botanical Actives:</span>
          <p style="font-size:0.84rem;color:var(--text-muted);">${product.ingredients}</p>
        </div>

        <div class="modal-action-row">
          <button class="btn btn-primary btn-block" id="modal-add-btn">
            <span>Add to Bag • ${formatPrice(product.priceINR)}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');

  // Shade click handler inside modal
  let selectedShade = product.shades ? product.shades[0] : null;
  const shadeCircles = modalContent.querySelectorAll('.modal-shade-circle');
  shadeCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      shadeCircles.forEach(c => c.classList.remove('active'));
      circle.classList.add('active');
      selectedShade = circle.getAttribute('data-shade');
    });
  });

  const addBtn = document.getElementById('modal-add-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart(product.id, 1, selectedShade);
      modal.classList.remove('open');
    });
  }
};

function initModals() {
  const qModal = document.getElementById('quick-view-modal');
  const closeQBtn = document.getElementById('close-modal-btn');
  if (closeQBtn && qModal) {
    closeQBtn.addEventListener('click', () => qModal.classList.remove('open'));
  }
  if (qModal) {
    qModal.addEventListener('click', (e) => {
      if (e.target === qModal) qModal.classList.remove('open');
    });
  }
}

// ==========================================================================
// 7. Interactive Skin Routine Quiz
// ==========================================================================
function initRoutineQuiz() {
  const steps = [
    document.getElementById('quiz-step-1'),
    document.getElementById('quiz-step-2'),
    document.getElementById('quiz-step-3')
  ];
  const progressFill = document.getElementById('quiz-progress-fill');
  const resultBox = document.getElementById('quiz-result-box');
  const retakeBtn = document.getElementById('retake-quiz-btn');
  const bundleAddBtn = document.getElementById('add-routine-bundle-btn');

  let currentStep = 1;

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const stepNum = parseInt(btn.getAttribute('data-step'), 10);
      const val = btn.getAttribute('data-value');
      state.quizAnswers[stepNum] = val;

      if (stepNum < 3) {
        steps[stepNum - 1].classList.remove('active');
        currentStep = stepNum + 1;
        steps[currentStep - 1].classList.add('active');
        if (progressFill) progressFill.style.width = `${(currentStep / 3) * 100}%`;
      } else {
        // Complete Quiz
        steps[2].classList.remove('active');
        if (progressFill) progressFill.style.width = '100%';
        showQuizResults();
      }
    });
  });

  function showQuizResults() {
    if (!resultBox) return;
    resultBox.style.display = 'block';

    // Pick 3 synergistic products based on quiz
    const routineItems = [
      PRODUCTS[0], // Luminous Peptide Serum
      PRODUCTS[6], // Barrier Cream
      PRODUCTS[3]  // Night Elixir
    ];

    const recList = document.getElementById('recommended-products-list');
    if (recList) {
      recList.innerHTML = routineItems.map((item, idx) => `
        <div class="rec-item-card">
          <span class="rec-step-tag">Step 0${idx + 1} Ritual</span>
          <img src="${item.image}" alt="${item.name}" />
          <h4 class="rec-name">${item.name}</h4>
          <span class="rec-price">${formatPrice(item.priceINR)}</span>
        </div>
      `).join('');
    }

    if (bundleAddBtn) {
      bundleAddBtn.onclick = () => {
        routineItems.forEach(item => addToCart(item.id, 1));
        showToast('Complete 3-Step Routine added to bag with 15% discount!');
      };
    }
  }

  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      state.quizAnswers = {};
      currentStep = 1;
      resultBox.style.display = 'none';
      steps.forEach((s, i) => {
        if (i === 0) s.classList.add('active');
        else s.classList.remove('active');
      });
      if (progressFill) progressFill.style.width = '33.33%';
    });
  }
}

// ==========================================================================
// 8. Global Search Overlay
// ==========================================================================
function initSearchOverlay() {
  const searchOverlay = document.getElementById('search-overlay');
  const searchToggle = document.getElementById('search-toggle-btn');
  const mSearchTrigger = document.getElementById('m-search-trigger');
  const closeSearchBtn = document.getElementById('close-search-btn');
  const searchInput = document.getElementById('global-search-input');
  const searchResultsArea = document.getElementById('search-results-area');

  function openSearch() {
    searchOverlay.classList.add('open');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
  }

  function closeSearch() {
    searchOverlay.classList.remove('open');
  }

  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (mSearchTrigger) mSearchTrigger.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

  if (searchOverlay) {
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
  }

  if (searchInput && searchResultsArea) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        searchResultsArea.innerHTML = '<p class="search-hint">Type to search through our luxury collection...</p>';
        return;
      }

      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.benefit.toLowerCase().includes(q) ||
        p.ingredients.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        searchResultsArea.innerHTML = `<p class="search-hint">No cosmetics found matching "<strong>${q}</strong>". Try searching for "Serum", "Lipstick", or "Cream".</p>`;
        return;
      }

      searchResultsArea.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${matches.map(item => `
            <div style="display:flex;align-items:center;gap:12px;padding:8px;border-bottom:1px solid var(--border-light);cursor:pointer;" onclick="closeSearchModalAndOpenProduct('${item.id}')">
              <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;border-radius:6px;object-fit:cover;" />
              <div style="flex:1;">
                <h4 style="font-size:0.95rem;font-family:var(--font-serif);margin:0;">${item.name}</h4>
                <small style="color:var(--text-muted);">${formatPrice(item.priceINR)} • [Category: ${item.category}]</small>
              </div>
              <button class="btn btn-outline" style="padding:6px 14px;font-size:0.78rem;">View</button>
            </div>
          `).join('')}
        </div>
      `;
    });
  }
}

window.closeSearchModalAndOpenProduct = function(productId) {
  const searchOverlay = document.getElementById('search-overlay');
  if (searchOverlay) searchOverlay.classList.remove('open');
  openQuickView(productId);
};

// ==========================================================================
// 9. Mobile Offcanvas Navigation Drawer
// ==========================================================================
function initMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

// ==========================================================================
// 10. Forms & Toast Notifications
// ==========================================================================
function initForms() {
  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      showToast(`Welcome to [Brand VIP Club]! Use code [GLOW20] for 20% off 🎉`);
      newsletterForm.reset();
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast(`Thank you! Our [Brand] beauty concierge will contact you shortly ✨`);
      contactForm.reset();
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}
