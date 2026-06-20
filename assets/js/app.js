const cfg = window.STORE_CONFIG || {};
const products = (window.PRODUCTS || []).filter(p => p.active !== false);
const collections = (window.MENU_COLLECTIONS || []).filter(c => c.active !== false).sort((a,b)=>(a.sort||999)-(b.sort||999));

const synonyms = {
  bakkie:['vehicle','4x4','roof','rack','interior','exterior','storage','hilux','cruiser'],
  truck:['vehicle','4x4','bakkie','roof','rack'],
  camp:['camping','chair','light','wagon','outdoor','overland','tent','braai'],
  camping:['camp','chair','light','wagon','outdoor','overland','tent','braai'],
  lights:['lighting','rechargeable','solar','power','lamp'],
  light:['lighting','rechargeable','solar','power','lamp'],
  stuck:['recovery','traction','snatch','tow','mud','sand','tracks'],
  mud:['recovery','traction','snatch','tow','4x4'],
  sand:['recovery','traction','tracks','boards','4x4'],
  electricity:['solar','power','battery','charging','12v'],
  power:['solar','battery','charging','12v','light'],
  clothes:['apparel','jacket','cap','shirt','hoodie'],
  clothing:['apparel','jacket','cap','shirt','hoodie'],
  winter:['jacket','apparel','cold'],
  cheap:['sale','discount','marked down'],
  overlanding:['overland','camping','vehicle','roof','rack','power'],
  adventure:['camping','recovery','vehicle','outdoor']
};

const state = {
  search: '',
  collection: getParam('collection') || 'all',
  sort: 'featured',
  visible: 24,
  quote: JSON.parse(localStorage.getItem('vasbytQuote') || '[]')
};

function getParam(name){ return new URLSearchParams(window.location.search).get(name); }
function money(value){ if(!value && value!==0) return 'POA'; return `${cfg.currency || 'R'}${Number(value).toLocaleString('en-ZA')}`; }
function esc(str=''){ return String(str).replace(/[&<>'"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function collectionById(id){ return collections.find(c=>c.id===id); }
function productById(id){ return products.find(p=>p.id===id); }
function productUrl(product){ return `product.html?id=${encodeURIComponent(product.id)}`; }
function cloudinaryUrl(publicId,width=760){ if(!publicId) return ''; const cloud = cfg.cloudinaryCloudName || 'demo'; return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_${width}/${publicId}`; }
function productImage(product,width=760){ return cloudinaryUrl(product.cloudinaryPublicId,width); }
function collectionImage(collectionId){ return collectionById(collectionId)?.image || 'assets/img/theme/trail-action-sm.webp'; }

function tokenize(query){
  const raw = String(query||'').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const expanded = new Set(raw);
  raw.forEach(t => (synonyms[t]||[]).forEach(s=>expanded.add(s)));
  return [...expanded];
}
function searchText(product){
  const c = collectionById(product.collection);
  return [product.name, product.brand, product.collection, c?.label, product.short, product.description, product.dimensions, product.stock, ...(product.keywords||[]), ...(c?.keywords||[])].join(' ').toLowerCase();
}
function scoreProduct(product, query){
  const terms = tokenize(query); if(!terms.length) return product.featured ? 4 : 1;
  const hay = searchText(product); let score = 0;
  terms.forEach(term => {
    if(product.name?.toLowerCase().includes(term)) score += 10;
    if(product.brand?.toLowerCase().includes(term)) score += 7;
    if((product.keywords||[]).join(' ').toLowerCase().includes(term)) score += 6;
    if(hay.includes(term)) score += 2;
  });
  const unique = terms.filter(t => hay.includes(t)).length;
  score += unique * unique;
  if(product.featured) score += 1;
  return score;
}
function filteredProducts(){
  let list = [...products];
  if(state.collection !== 'all') list = list.filter(p => p.collection === state.collection);
  if(state.search.trim()){
    list = list.map(p => ({...p, _score:scoreProduct(p,state.search)})).filter(p => p._score > 0).sort((a,b)=>b._score-a._score);
  } else {
    if(state.sort === 'featured') list.sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
    if(state.sort === 'price-low') list.sort((a,b)=>(a.salePrice||a.price||0)-(b.salePrice||b.price||0));
    if(state.sort === 'price-high') list.sort((a,b)=>(b.salePrice||b.price||0)-(a.salePrice||a.price||0));
    if(state.sort === 'az') list.sort((a,b)=>a.name.localeCompare(b.name));
  }
  return list;
}

function setupMenu(){
  const drawer = document.querySelector('[data-menu-drawer]');
  const overlay = document.querySelector('.menu-overlay');
  const toggles = document.querySelectorAll('[data-menu-toggle]');
  const close = () => { document.body.classList.remove('menu-open'); toggles.forEach(b=>b.setAttribute('aria-expanded','false')); };
  toggles.forEach(btn => btn.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
  }));
  overlay?.addEventListener('click', close);
  document.querySelectorAll('[data-menu-close]').forEach(el => el.addEventListener('click', close));
  if(drawer){
    const links = collections.map(c => `
      <a class="drawer-collection" href="shop.html?collection=${encodeURIComponent(c.id)}" data-menu-close>
        <span class="drawer-collection__image" style="background-image:url('${esc(c.image||'')}')"></span>
        <span><b>${esc(c.label)}</b><small>${esc(c.subtitle)}</small></span>
        <i>→</i>
      </a>`).join('');
    drawer.innerHTML = `
      <div class="drawer-head">
        <div><span class="micro">Catalogue navigation</span><h2>Choose terrain.</h2></div>
        <button class="icon-close" data-menu-close aria-label="Close menu">×</button>
      </div>
      <div class="drawer-core">
        <a href="index.html" data-menu-close>Home</a>
        <a href="shop.html" data-menu-close>All Gear</a>
        <a href="about.html" data-menu-close>About</a>
        <a href="contact.html" data-menu-close>Contact</a>
      </div>
      <details class="accordion" open>
        <summary>Collections <span>${collections.length}</span></summary>
        <div class="drawer-collections">${links}</div>
      </details>
      <details class="accordion">
        <summary>Support <span>Info</span></summary>
        <div class="drawer-core drawer-core--stacked">
          <a href="terms.html" data-menu-close>Terms & Conditions</a>
          <a href="contact.html#shipping" data-menu-close>Shipping & Returns</a>
          <a href="contact.html" data-menu-close>WhatsApp / Email</a>
        </div>
      </details>`;
  }
}

function renderCollections(){
  const grid = document.querySelector('[data-collections]'); if(!grid) return;
  grid.innerHTML = collections.map((c,i) => `
    <a class="terrain-card" href="shop.html?collection=${encodeURIComponent(c.id)}" style="--terrain:url('${esc(c.image||'')}')">
      <span class="terrain-card__count">0${i+1}</span>
      <div><span class="micro">Collection</span><h3>${esc(c.label)}</h3><p>${esc(c.subtitle)}</p></div>
      <b>Explore →</b>
    </a>`).join('');
}
function renderChips(){
  const row = document.querySelector('[data-filter-chips]'); const select = document.querySelector('[data-collection-select]');
  if(row){ row.innerHTML = `<button class="chip ${state.collection==='all'?'active':''}" data-chip="all">All Gear</button>` + collections.map(c=>`<button class="chip ${state.collection===c.id?'active':''}" data-chip="${esc(c.id)}">${esc(c.navLabel||c.label)}</button>`).join(''); }
  if(select){ select.innerHTML = `<option value="all">All collections</option>` + collections.map(c=>`<option value="${esc(c.id)}">${esc(c.label)}</option>`).join(''); select.value = state.collection; }
}
function cardPlaceholder(product){
  const c = collectionById(product.collection);
  const img = c?.image || 'assets/img/theme/trail-action-sm.webp';
  return `<div class="product-art" style="background-image:url('${esc(img)}')"><span>${esc((product.name||'V')[0])}</span></div>`;
}
function renderProductCard(product){
  const image = productImage(product, 680);
  const sale = product.salePrice && product.salePrice < product.price;
  return `<article class="product-card">
    <a class="product-media" href="${productUrl(product)}">
      ${image ? `<img src="${image}" alt="${esc(product.name)}" loading="lazy">` : cardPlaceholder(product)}
      <span class="badge">${esc(sale?'Marked Down':product.stock)}</span>
    </a>
    <div class="product-body">
      <span class="micro">${esc(product.brand||'VASBYT')}</span>
      <h3>${esc(product.name)}</h3>
      <p>${esc(product.short||'')}</p>
      <div class="price-row"><span class="price">${money(product.salePrice||product.price)}</span>${sale?`<span class="was">${money(product.price)}</span>`:''}</div>
      <div class="product-actions"><a class="btn btn-steel" href="${productUrl(product)}">View</a><button class="btn btn-copper" data-add-quote="${esc(product.id)}">Add quote</button></div>
    </div>
  </article>`;
}
function renderProducts(){
  const grid = document.querySelector('[data-products]'); if(!grid) return;
  const list = filteredProducts(); const visible = list.slice(0,state.visible);
  grid.innerHTML = visible.length ? visible.map(renderProductCard).join('') : `<div class="empty-state">No matching products. Try “stuck in sand”, “bakkie storage”, “camp light”, “winter jacket” or “solar”.</div>`;
  const meta = document.querySelector('[data-search-meta]');
  if(meta){ meta.textContent = `Showing ${Math.min(visible.length,list.length)} of ${list.length} products${state.search.trim()?` for “${state.search.trim()}”`:''}.`; }
  const more = document.querySelector('[data-load-more]'); if(more) more.style.display = list.length > state.visible ? 'inline-flex' : 'none';
}
function renderFeatured(){ const grid = document.querySelector('[data-featured]'); if(grid) grid.innerHTML = products.filter(p=>p.featured).slice(0,8).map(renderProductCard).join(''); }
function renderCollectionHero(){
  const title = document.querySelector('[data-shop-title]'); const subtitle = document.querySelector('[data-shop-subtitle]'); const hero = document.querySelector('[data-shop-visual]');
  if(!title || !subtitle) return;
  const c = collectionById(state.collection);
  title.textContent = c ? c.label : 'Gear finder.';
  subtitle.textContent = c ? c.hero : 'Search the catalogue by product, problem or trip type. Build a WhatsApp quote instead of forcing a cold checkout.';
  if(hero) hero.style.backgroundImage = `url('${esc(c?.image || cfg.heroAltImage || 'assets/img/theme/storm-valley.webp')}')`;
}
function renderProductDetail(){
  const target = document.querySelector('[data-product-detail]'); if(!target) return;
  const product = productById(getParam('id')) || products[0]; const c = collectionById(product.collection);
  const image = productImage(product,1200);
  target.innerHTML = `<section class="product-detail-grid">
    <div class="detail-media">${image?`<img src="${image}" alt="${esc(product.name)}">`:cardPlaceholder(product)}<span class="badge">${esc(product.stock)}</span></div>
    <div class="detail-copy"><span class="micro">${esc(c?.label||'VASBYT')} / ${esc(product.brand||'')}</span><h1>${esc(product.name)}</h1><p class="lead">${esc(product.short)}</p><div class="price-row detail-price"><span class="price">${money(product.salePrice||product.price)}</span>${product.salePrice&&product.salePrice<product.price?`<span class="was">${money(product.price)}</span>`:''}</div><div class="spec-panel"><b>Description</b><p>${esc(product.description)}</p><b>Dimensions</b><p>${esc(product.dimensions)}</p><b>Order flow</b><p>Stock, fitment, courier cost and payment are confirmed through WhatsApp before payment.</p></div><button class="btn btn-copper btn-wide" data-add-quote="${esc(product.id)}">Add to WhatsApp quote</button><a class="btn btn-ghost btn-wide" href="shop.html?collection=${encodeURIComponent(product.collection)}">Back to ${esc(c?.label||'shop')}</a></div>
  </section>`;
  document.title = `${product.name} | ${cfg.brand||'VASBYT'}`;
}

function addToQuote(id){ const product = productById(id); if(!product) return; const existing = state.quote.find(i=>i.id===id); if(existing) existing.qty += 1; else state.quote.push({id, qty:1}); saveQuote(); openQuote(); }
function saveQuote(){ localStorage.setItem('vasbytQuote', JSON.stringify(state.quote)); updateQuoteCount(); }
function updateQuoteCount(){ document.querySelectorAll('[data-quote-count]').forEach(el => el.textContent = state.quote.reduce((s,i)=>s+i.qty,0)); }
function quoteMessage(){
  const lines = state.quote.map(item => { const p = productById(item.id); return p ? `${item.qty}x ${p.name} — ${money(p.salePrice||p.price)}` : ''; }).filter(Boolean);
  return `Hi ${cfg.brand || 'Vasbyt'}, I am interested in:\n\n${lines.join('\n')}\n\nPlease confirm stock, fitment and courier to: ____`;
}
function openQuote(){
  let modal = document.querySelector('[data-quote-modal]'); if(!modal) return;
  const items = state.quote.map(item => { const p = productById(item.id); if(!p) return ''; return `<div class="quote-item"><span><b>${esc(p.name)}</b><small>${money(p.salePrice||p.price)} each</small></span><div><button data-dec="${esc(item.id)}">−</button><b>${item.qty}</b><button data-inc="${esc(item.id)}">+</button><button data-remove="${esc(item.id)}">×</button></div></div>`; }).join('');
  const href = `https://wa.me/${cfg.whatsappNumber || ''}?text=${encodeURIComponent(quoteMessage())}`;
  modal.innerHTML = `<div class="modal-backdrop" data-close-quote></div><div class="quote-panel"><div class="drawer-head"><div><span class="micro">WhatsApp-first checkout</span><h2>Your quote.</h2></div><button class="icon-close" data-close-quote>×</button></div>${items || '<p class="muted">No products added yet.</p>'}<div class="quote-actions"><a class="btn btn-copper btn-wide" href="${href}" target="_blank" rel="noopener">Send on WhatsApp</a><button class="btn btn-ghost btn-wide" data-clear-quote>Clear quote</button></div></div>`;
  document.body.classList.add('quote-open');
}
function closeQuote(){ document.body.classList.remove('quote-open'); }
function bindEvents(){
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-add-quote]'); if(add) addToQuote(add.dataset.addQuote);
    const chip = e.target.closest('[data-chip]'); if(chip){ state.collection = chip.dataset.chip; state.visible=24; renderChips(); renderCollectionHero(); renderProducts(); }
    if(e.target.closest('[data-open-quote]')) openQuote();
    if(e.target.closest('[data-close-quote]')) closeQuote();
    const inc = e.target.closest('[data-inc]'); if(inc){ const item=state.quote.find(i=>i.id===inc.dataset.inc); if(item)item.qty++; saveQuote(); openQuote(); }
    const dec = e.target.closest('[data-dec]'); if(dec){ const item=state.quote.find(i=>i.id===dec.dataset.dec); if(item){ item.qty--; if(item.qty<=0) state.quote=state.quote.filter(i=>i.id!==dec.dataset.dec);} saveQuote(); openQuote(); }
    const rem = e.target.closest('[data-remove]'); if(rem){ state.quote=state.quote.filter(i=>i.id!==rem.dataset.remove); saveQuote(); openQuote(); }
    if(e.target.closest('[data-clear-quote]')){ state.quote=[]; saveQuote(); openQuote(); }
    if(e.target.closest('[data-load-more]')){ state.visible += 24; renderProducts(); }
  });
  const search = document.querySelector('[data-search]'); if(search) search.addEventListener('input', e=>{ state.search = e.target.value; state.visible=24; renderProducts(); });
  const select = document.querySelector('[data-collection-select]'); if(select) select.addEventListener('change', e=>{ state.collection=e.target.value; state.visible=24; renderChips(); renderCollectionHero(); renderProducts(); });
  const sort = document.querySelector('[data-sort]'); if(sort) sort.addEventListener('change', e=>{ state.sort=e.target.value; renderProducts(); });
}
function injectHeroImages(){
  document.querySelectorAll('[data-hero-bg]').forEach(el => el.style.backgroundImage = `url('${esc(cfg.heroImage || 'assets/img/theme/trail-action.webp')}')`);
  document.querySelectorAll('[data-alt-bg]').forEach(el => el.style.backgroundImage = `url('${esc(cfg.heroAltImage || 'assets/img/theme/hilux-sunset.webp')}')`);
  document.querySelectorAll('[data-footer-bg]').forEach(el => el.style.backgroundImage = `url('${esc(cfg.footerImage || 'assets/img/theme/mud-water.webp')}')`);
}
function init(){ setupMenu(); injectHeroImages(); renderCollections(); renderChips(); renderCollectionHero(); renderProducts(); renderFeatured(); renderProductDetail(); updateQuoteCount(); bindEvents(); }
document.addEventListener('DOMContentLoaded', init);
