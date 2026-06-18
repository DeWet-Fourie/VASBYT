const cfg = window.STORE_CONFIG || {};
const products = (window.PRODUCTS || []).filter(p => p.active !== false);
const collections = (window.MENU_COLLECTIONS || [])
  .filter(c => c.active !== false)
  .sort((a, b) => (a.sort || 999) - (b.sort || 999));

const synonyms = {
  bakkie: ['vehicle', '4x4', 'roof', 'rack', 'interior', 'exterior', 'storage'],
  truck: ['vehicle', '4x4', 'bakkie'],
  camp: ['camping', 'chair', 'light', 'wagon', 'outdoor', 'overland'],
  camping: ['camp', 'chair', 'light', 'wagon', 'outdoor', 'overland'],
  light: ['lighting', 'rechargeable', 'solar', 'power', 'lamp'],
  lights: ['lighting', 'rechargeable', 'solar', 'power', 'lamp'],
  stuck: ['recovery', 'traction', 'snatch', 'tow', 'mud', 'sand'],
  mud: ['recovery', 'traction', 'snatch', 'tow', '4x4'],
  sand: ['recovery', 'traction', 'tracks', 'boards', '4x4'],
  electricity: ['solar', 'power', 'battery', 'charging', '12v'],
  power: ['solar', 'battery', 'charging', '12v', 'light'],
  clothes: ['apparel', 'jacket', 'cap', 'shirt', 'hoodie'],
  clothing: ['apparel', 'jacket', 'cap', 'shirt', 'hoodie'],
  winter: ['jacket', 'apparel', 'cold'],
  cheap: ['sale', 'discount', 'marked down'],
};

const state = {
  search: '',
  collection: getParam('collection') || 'all',
  sort: 'featured',
  visible: 24,
  quote: JSON.parse(localStorage.getItem('vasbytQuote') || '[]'),
};

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function money(value) {
  if (!value && value !== 0) return 'POA';
  return `${cfg.currency || 'R'}${Number(value).toLocaleString('en-ZA')}`;
}

function slugToCollection(id) {
  return collections.find(c => c.id === id);
}

function productUrl(product) {
  return `product.html?id=${encodeURIComponent(product.id)}`;
}

function cloudinaryUrl(publicId, width = 700) {
  if (!publicId) return '';
  const cloud = cfg.cloudinaryCloudName || 'demo';
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_${width}/${publicId}`;
}

function productImage(product, width = 700) {
  return cloudinaryUrl(product.cloudinaryPublicId, width);
}

function placeholder(label = 'V', tone = '') {
  return `<div class="placeholder-art ${escapeHtml(tone)}" aria-label="Image placeholder"><span>${escapeHtml(label[0] || 'V')}</span></div>`;
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[char]));
}

function tokenize(query) {
  const raw = String(query || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const expanded = new Set(raw);
  raw.forEach(term => (synonyms[term] || []).forEach(s => expanded.add(s)));
  return [...expanded];
}

function searchText(product) {
  const collection = slugToCollection(product.collection);
  return [
    product.name, product.brand, product.collection, collection?.label,
    product.short, product.description, product.dimensions, product.stock,
    ...(product.keywords || []), ...(collection?.keywords || [])
  ].join(' ').toLowerCase();
}

function scoreProduct(product, query) {
  const terms = tokenize(query);
  if (!terms.length) return product.featured ? 4 : 1;
  const hay = searchText(product);
  let score = 0;
  terms.forEach(term => {
    if (product.name?.toLowerCase().includes(term)) score += 8;
    if (product.brand?.toLowerCase().includes(term)) score += 6;
    if ((product.keywords || []).join(' ').toLowerCase().includes(term)) score += 5;
    if (hay.includes(term)) score += 2;
  });
  // Fallback for vague list-like searches: reward products that match multiple terms lightly.
  const uniqueMatches = terms.filter(term => hay.includes(term)).length;
  score += uniqueMatches * uniqueMatches;
  if (product.featured) score += 1;
  return score;
}

function getFilteredProducts() {
  let list = [...products];
  if (state.collection !== 'all') list = list.filter(p => p.collection === state.collection);
  if (state.search.trim()) {
    list = list.map(p => ({ ...p, _score: scoreProduct(p, state.search) }))
      .filter(p => p._score > 0)
      .sort((a, b) => b._score - a._score);
  }
  if (!state.search.trim()) {
    if (state.sort === 'featured') list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    if (state.sort === 'price-low') list.sort((a, b) => (a.salePrice || a.price || 0) - (b.salePrice || b.price || 0));
    if (state.sort === 'price-high') list.sort((a, b) => (b.salePrice || b.price || 0) - (a.salePrice || a.price || 0));
    if (state.sort === 'az') list.sort((a, b) => a.name.localeCompare(b.name));
  }
  return list;
}

function renderNav() {
  const navTargets = document.querySelectorAll('[data-nav]');
  const collectionLinks = collections.map(c => `
    <a class="nav-collection" data-collection-nav="${escapeHtml(c.id)}" href="shop.html?collection=${encodeURIComponent(c.id)}">
      <span>${escapeHtml(c.navLabel || c.label)}</span>
    </a>`).join('');
  navTargets.forEach(nav => {
    nav.innerHTML = `
      <a class="nav-core" href="index.html">Home</a>
      <a class="nav-core" href="shop.html">All Gear</a>
      <span class="nav-divider"></span>
      ${collectionLinks}
      <span class="nav-divider"></span>
      <a class="nav-core" href="about.html">About</a>
      <a class="nav-core" href="contact.html">Contact</a>
    `;
  });
}

function renderCollections() {
  const grid = document.querySelector('[data-collections]');
  if (!grid) return;
  grid.innerHTML = collections.map(c => `
    <a class="collection-card" data-collection-card="${escapeHtml(c.id)}" href="shop.html?collection=${encodeURIComponent(c.id)}">
      <div>
        <span class="eyebrow">Collection</span>
        <h3>${escapeHtml(c.label)}</h3>
        <p>${escapeHtml(c.subtitle)}</p>
      </div>
      <span class="arrow">→</span>
    </a>
  `).join('');
}

function renderChips() {
  const row = document.querySelector('[data-filter-chips]');
  const select = document.querySelector('[data-collection-select]');
  if (row) {
    row.innerHTML = `<button class="chip ${state.collection === 'all' ? 'active' : ''}" data-chip="all">All Gear</button>` +
      collections.map(c => `<button class="chip ${state.collection === c.id ? 'active' : ''}" data-chip="${escapeHtml(c.id)}">${escapeHtml(c.navLabel || c.label)}</button>`).join('');
  }
  if (select) {
    select.innerHTML = `<option value="all">All collections</option>` + collections.map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.label)}</option>`).join('');
    select.value = state.collection;
  }
}

function renderProductCard(product) {
  const image = productImage(product, 620);
  const sale = product.salePrice && product.salePrice < product.price;
  const label = sale ? 'Marked Down' : product.stock;
  return `
    <article class="product-card" data-product-collection="${escapeHtml(product.collection)}">
      <a class="product-media" href="${productUrl(product)}">
        ${image ? `<img src="${image}" alt="${escapeHtml(product.name)}" loading="lazy">` : placeholder(product.name, product.collection)}
        <span class="badge">${escapeHtml(label)}</span>
      </a>
      <div class="product-body">
        <span class="eyebrow">${escapeHtml(product.brand || 'VASBYT')}</span>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.short || '')}</p>
        <div class="price-row">
          <span class="price">${money(product.salePrice || product.price)}</span>
          ${sale ? `<span class="was">${money(product.price)}</span>` : ''}
        </div>
        <div class="product-actions">
          <a class="btn btn-dark" href="${productUrl(product)}">View</a>
          <button class="btn btn-accent" data-add-quote="${escapeHtml(product.id)}">Add quote</button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const grid = document.querySelector('[data-products]');
  const meta = document.querySelector('[data-search-meta]');
  const loadMore = document.querySelector('[data-load-more]');
  if (!grid) return;
  const list = getFilteredProducts();
  const visible = list.slice(0, state.visible);
  if (!visible.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">No matching products found. Try words like “camping”, “bakkie”, “stuck”, “solar”, “winter” or “lights”.</div>`;
  } else {
    grid.innerHTML = visible.map(renderProductCard).join('');
  }
  if (meta) {
    const queryText = state.search.trim() ? ` for “${escapeHtml(state.search.trim())}”` : '';
    const collectionText = state.collection !== 'all' ? ` in ${escapeHtml(slugToCollection(state.collection)?.label || state.collection)}` : '';
    meta.innerHTML = `Showing ${Math.min(visible.length, list.length)} of ${list.length} products${queryText}${collectionText}.`;
  }
  if (loadMore) loadMore.style.display = list.length > state.visible ? 'inline-flex' : 'none';
}

function renderFeatured() {
  const grid = document.querySelector('[data-featured]');
  if (!grid) return;
  grid.innerHTML = products.filter(p => p.featured).slice(0, 8).map(renderProductCard).join('');
}

function renderCollectionHero() {
  const title = document.querySelector('[data-shop-title]');
  const subtitle = document.querySelector('[data-shop-subtitle]');
  if (!title || !subtitle) return;
  const col = slugToCollection(state.collection);
  title.textContent = col ? col.label : 'Shop the long road';
  subtitle.textContent = col ? col.hero : 'Search and browse curated outdoor, 4x4, camping and lifestyle gear. Confirm stock, fitment and courier details directly through WhatsApp.';
}

function addToQuote(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = state.quote.find(item => item.id === productId);
  if (existing) existing.qty += 1;
  else state.quote.push({ id: productId, qty: 1 });
  saveQuote();
  openQuote();
}

function saveQuote() {
  localStorage.setItem('vasbytQuote', JSON.stringify(state.quote));
  renderQuote();
}

function removeFromQuote(productId) {
  state.quote = state.quote.filter(item => item.id !== productId);
  saveQuote();
}

function quoteMessage() {
  const lines = state.quote.map(item => {
    const p = products.find(prod => prod.id === item.id);
    return p ? `${item.qty}x ${p.name} — ${money(p.salePrice || p.price)}` : '';
  }).filter(Boolean);
  return `Hi ${cfg.brand || 'Vasbyt'}, I am interested in:%0A%0A${encodeURIComponent(lines.join('\n'))}%0A%0APlease confirm stock and delivery to my area.`;
}

function renderQuote() {
  const count = document.querySelectorAll('[data-quote-count]');
  count.forEach(el => el.textContent = state.quote.reduce((sum, item) => sum + item.qty, 0));
  const list = document.querySelector('[data-quote-items]');
  const action = document.querySelector('[data-whatsapp-quote]');
  if (!list) return;
  if (!state.quote.length) {
    list.innerHTML = '<p style="color: var(--muted);">No products added yet.</p>';
    if (action) action.href = whatsappUrl('Hi, I would like help finding the right gear.');
    return;
  }
  list.innerHTML = state.quote.map(item => {
    const p = products.find(prod => prod.id === item.id);
    if (!p) return '';
    return `<div class="quote-item"><div><strong>${item.qty}x ${escapeHtml(p.name)}</strong><br><span>${money(p.salePrice || p.price)}</span></div><button data-remove-quote="${escapeHtml(p.id)}">Remove</button></div>`;
  }).join('');
  if (action) action.href = `https://wa.me/${cfg.whatsappNumber}?text=${quoteMessage()}`;
}

function whatsappUrl(message) {
  return `https://wa.me/${cfg.whatsappNumber || ''}?text=${encodeURIComponent(message)}`;
}

function openQuote() {
  document.querySelector('[data-drawer]')?.classList.add('open');
}
function closeQuote() {
  document.querySelector('[data-drawer]')?.classList.remove('open');
}

function renderProductDetail() {
  const mount = document.querySelector('[data-product-detail]');
  if (!mount) return;
  const id = getParam('id') || products[0]?.id;
  const p = products.find(prod => prod.id === id);
  if (!p) {
    mount.innerHTML = `<div class="empty-state">Product not found. <a href="shop.html">Return to shop</a>.</div>`;
    return;
  }
  const col = slugToCollection(p.collection);
  const image = productImage(p, 1200);
  const sale = p.salePrice && p.salePrice < p.price;
  document.title = `${p.name} | ${cfg.brand || 'Vasbyt'}`;
  mount.innerHTML = `
    <div class="product-detail-media">${image ? `<img src="${image}" alt="${escapeHtml(p.name)}">` : placeholder(p.name, p.collection)}</div>
    <div class="detail-box">
      <span class="eyebrow">${escapeHtml(col?.label || p.collection)}</span>
      <h1>${escapeHtml(p.name)}</h1>
      <p>${escapeHtml(p.description || p.short || '')}</p>
      <div class="price-row" style="margin: 20px 0;">
        <span class="price" style="font-size: 1.8rem;">${money(p.salePrice || p.price)}</span>
        ${sale ? `<span class="was">${money(p.price)}</span>` : ''}
      </div>
      <div class="detail-meta">
        <div class="meta-card"><span>Stock</span><strong>${escapeHtml(p.stock || 'Confirm')}</strong></div>
        <div class="meta-card"><span>Brand</span><strong>${escapeHtml(p.brand || cfg.brand)}</strong></div>
        <div class="meta-card"><span>Dimensions</span><strong>${escapeHtml(p.dimensions || 'Confirm')}</strong></div>
        <div class="meta-card"><span>Ordering</span><strong>WhatsApp confirmation</strong></div>
      </div>
      <div class="hero-actions">
        <button class="btn btn-dark" data-add-quote="${escapeHtml(p.id)}">Add to quote</button>
        <a class="btn btn-accent" href="${whatsappUrl(`Hi ${cfg.brand || 'Vasbyt'}, I am interested in ${p.name}. Please confirm stock and delivery.`)}">Enquire on WhatsApp</a>
      </div>
      <p style="margin-top: 18px; font-size: .92rem;">${escapeHtml(cfg.shippingLine || '')}</p>
    </div>
  `;
}

function bindEvents() {
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add-quote]');
    if (add) addToQuote(add.getAttribute('data-add-quote'));
    const remove = e.target.closest('[data-remove-quote]');
    if (remove) removeFromQuote(remove.getAttribute('data-remove-quote'));
    if (e.target.closest('[data-open-quote]')) openQuote();
    if (e.target.closest('[data-close-quote]')) closeQuote();
    const chip = e.target.closest('[data-chip]');
    if (chip) {
      state.collection = chip.getAttribute('data-chip');
      state.visible = 24;
      renderChips(); renderCollectionHero(); renderProducts();
      history.replaceState(null, '', state.collection === 'all' ? 'shop.html' : `shop.html?collection=${encodeURIComponent(state.collection)}`);
    }
    if (e.target.closest('[data-mobile-toggle]')) document.querySelector('[data-nav]')?.classList.toggle('open');
  });
  const search = document.querySelector('[data-search]');
  if (search) search.addEventListener('input', e => { state.search = e.target.value; state.visible = 24; renderProducts(); });
  const select = document.querySelector('[data-collection-select]');
  if (select) select.addEventListener('change', e => { state.collection = e.target.value; state.visible = 24; renderChips(); renderCollectionHero(); renderProducts(); });
  const sort = document.querySelector('[data-sort-select]');
  if (sort) sort.addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });
  const load = document.querySelector('[data-load-more]');
  if (load) load.addEventListener('click', () => { state.visible += 24; renderProducts(); });
}

function initContactLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach(a => a.href = whatsappUrl(a.dataset.whatsapp || 'Hi, I would like to enquire about your products.'));
  document.querySelectorAll('[data-email]').forEach(a => a.href = `mailto:${cfg.email || ''}`);
  document.querySelectorAll('[data-brand]').forEach(el => el.textContent = cfg.brand || 'VASBYT');
}

function init() {
  renderNav();
  renderCollections();
  renderChips();
  renderCollectionHero();
  renderFeatured();
  renderProducts();
  renderProductDetail();
  renderQuote();
  initContactLinks();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);
