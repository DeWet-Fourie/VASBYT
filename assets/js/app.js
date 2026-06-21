(function(){
  const cfg = window.STORE_CONFIG || {};
  const collections = (window.MENU_COLLECTIONS || []).filter(c => c.active).sort((a,b)=>(a.sort||0)-(b.sort||0));
  const products = (window.PRODUCTS || []).filter(p => p.active).sort((a,b)=>(a.sortOrder||0)-(b.sortOrder||0));
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const money = n => `${cfg.currency || 'R'}${Number(n||0).toLocaleString('en-ZA')}`.replace(',', ' ');
  const collectionById = id => collections.find(c=>c.id===id) || {};
  const imageUrl = (item, width=900) => {
    if(item && item.imagePublicId && cfg.cloudinaryCloudName){
      return `https://res.cloudinary.com/${cfg.cloudinaryCloudName}/image/upload/f_auto,q_auto,w_${width}/${item.imagePublicId}`;
    }
    return (item && item.fallbackImage) || cfg.heroImages?.action || 'assets/img/hero-action.webp';
  };
  const productImage = (p,w=800) => imageUrl({imagePublicId:p.imagePublicId, fallbackImage:p.fallbackImage || collectionById(p.collectionId).fallbackImage},w);

  const synonyms = {
    stuck:['recovery','traction','tracks','strap','tow','sand','mud'], sand:['recovery','traction','tracks'], mud:['recovery','traction','tow'], recover:['recovery','strap','tracks'], tow:['recovery','strap'], winch:['recovery'],
    bakkie:['vehicle','exterior','interior','roof','storage','hilux'], hilux:['vehicle','exterior','roof','rack'], 'land cruiser':['vehicle','exterior','touring'], ranger:['vehicle','exterior'],
    roof:['rack','platform','exterior','load'], rack:['roof','platform','exterior'], load:['roof','rack','platform'],
    camp:['camping','chair','light','braai','fridge'], tent:['camping'], chair:['camping','furniture'], braai:['camping'], fridge:['camping','power'],
    light:['lighting','camping','power','solar'], led:['light','lighting'], night:['light','camping'], spotlight:['light','exterior'],
    solar:['power','battery','charge','off-grid'], battery:['solar','power','charge'], charge:['solar','power'], power:['solar','lighting','battery'],
    storage:['interior','organiser','drawer'], organiser:['interior','storage'], drawer:['interior','storage'], seatback:['interior','storage'],
    jacket:['apparel','winter','cold'], winter:['jacket','apparel','cold'], cold:['jacket','apparel'], cap:['apparel']
  };
  function textForProduct(p){
    const c = collectionById(p.collectionId);
    return [p.name,p.brand,p.category,p.subcategory,p.shortDescription,p.longDescription,p.dimensions,(p.specs||[]).join(' '),(p.keywords||[]).join(' '),c.title,(c.keywords||[]).join(' ')].join(' ').toLowerCase();
  }
  function scoreProduct(p, raw){
    const q = raw.trim().toLowerCase();
    if(!q) return 1;
    const hay = textForProduct(p);
    const terms = q.split(/\s+/).filter(Boolean);
    let score = 0;
    if(p.name.toLowerCase().includes(q)) score += 70;
    if((p.keywords||[]).join(' ').toLowerCase().includes(q)) score += 45;
    terms.forEach(t=>{
      if(p.name.toLowerCase().includes(t)) score += 24;
      if((p.keywords||[]).join(' ').toLowerCase().includes(t)) score += 18;
      if((p.category||'').toLowerCase().includes(t) || (p.subcategory||'').toLowerCase().includes(t)) score += 12;
      if(hay.includes(t)) score += 6;
      (synonyms[t]||[]).forEach(s=>{ if(hay.includes(s)) score += 13; });
    });
    Object.keys(synonyms).forEach(key=>{
      if(q.includes(key)) synonyms[key].forEach(s=>{ if(hay.includes(s)) score += 10; });
    });
    return score;
  }

  function renderHeader(){
    const target = $('#siteHeader'); if(!target) return;
    target.innerHTML = `<div class="container nav">
      <a class="brand" href="index.html" aria-label="VASBYT home"><span class="mark">V</span><span>${cfg.brandName || 'VASBYT'}</span></a>
      <div class="nav-actions">
        <a class="nav-link shop-link" href="shop.html">Shop Gear</a>
        <button class="nav-link" data-open-menu aria-label="Open menu"><span style="display:flex;align-items:center;gap:8px"><span class="icon-lines"><span></span><span></span><span></span></span>Menu</span></button>
        <button class="nav-link" data-open-quote>Quote <span class="count" data-quote-count>0</span></button>
      </div></div>`;
  }
  function renderDrawer(){
    const drawer = $('#menuDrawer'); if(!drawer) return;
    drawer.innerHTML = `<div class="drawer-top"><div><div class="eyebrow">Menu</div><h2>Choose<br>a route.</h2></div><button class="close-btn" data-close-menu aria-label="Close menu">×</button></div>
      <div class="drawer-routes">${collections.map(c=>`<a class="drawer-route" href="shop.html?collection=${encodeURIComponent(c.id)}"><img src="${imageUrl(c,500)}" alt="${c.title}" loading="lazy"><div><h3>${c.title}</h3><p>${c.shortDescription}</p></div></a>`).join('')}</div>
      <div class="drawer-links"><a href="shop.html">All Gear</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="terms.html">Terms</a><a href="contact.html#shipping">Shipping</a><a href="https://wa.me/${cfg.whatsappNumber||''}">WhatsApp</a></div>`;
  }
  function renderFooter(){
    const f = $('#siteFooter'); if(!f) return;
    f.innerHTML = `<div class="container footer-grid">
      <div><h4>${cfg.brandName||'VASBYT'}</h4><p>${cfg.tagline||'Gear for the long road.'}<br>Fast product discovery, WhatsApp-first ordering and Cloudinary-ready media.</p></div>
      <div><h4>Shop</h4><a href="shop.html">All Gear</a>${collections.slice(0,4).map(c=>`<a href="shop.html?collection=${c.id}">${c.navLabel}</a>`).join('')}</div>
      <div><h4>Support</h4><a href="contact.html">Contact</a><a href="contact.html#shipping">Shipping</a><a href="terms.html#returns">Returns</a><a href="https://wa.me/${cfg.whatsappNumber||''}">WhatsApp</a></div>
      <div><h4>Legal</h4><a href="terms.html">Terms & Conditions</a><a href="terms.html#privacy">Privacy Policy</a><a href="terms.html#returns">Returns Policy</a></div>
      <div><h4>System</h4><a href="README.md">Client workflow</a><a href="README.md">README</a></div>
    </div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} ${cfg.brandName||'VASBYT'}.</span><span>WhatsApp-first catalogue system.</span></div>`;
  }

  function renderHome(){
    const routes = $('#homeCollections'); if(routes){
      routes.innerHTML = collections.map((c,i)=>`<a class="route-card reveal" style="--i:${i}" href="shop.html?collection=${c.id}"><img src="${imageUrl(c,900)}" alt="${c.title}" loading="lazy"><div class="route-body"><div><div class="route-no">${String(i+1).padStart(2,'0')}</div><div class="eyebrow">Collection</div><h3>${c.title}</h3><p>${c.shortDescription}</p></div><span class="route-action">Explore →</span></div></a>`).join('');
    }
    const grid = $('#featuredProducts'); if(grid){ renderProducts(products.filter(p=>p.featured).slice(0,6), grid); }
  }
  function productCard(p,i=0){
    const sale = p.salePrice && p.salePrice > p.price;
    return `<article class="product-card reveal" style="--i:${i}">
      <div class="product-media"><img src="${productImage(p,800)}" alt="${p.name}" loading="lazy"><span class="badge">${sale?'Marked down':'Gear'}</span><span class="stock">${p.stockStatus||'Confirm stock'}</span></div>
      <div class="product-body"><div class="meta">${p.brand || p.category}</div><h3>${p.name}</h3><p>${p.shortDescription||''}</p><div class="price-row"><span class="price">${money(p.price)}</span>${sale?`<span class="was">${money(p.salePrice)}</span>`:''}</div><div class="card-actions"><a class="btn" href="product.html?id=${encodeURIComponent(p.id)}">View</a><button class="btn btn-orange" data-add-quote="${p.id}">Add quote</button></div></div>
    </article>`;
  }
  function renderProducts(list, root){
    root.innerHTML = list.length ? list.map(productCard).join('') : `<div class="empty-state"><h3>No direct matches.</h3><p>Try searching by trip, problem, product type or collection.</p></div>`;
    setRevealIndexes(root);
  }
  function renderShop(){
    const grid = $('#productGrid'); if(!grid) return;
    const chips = $('#collectionChips');
    const select = $('#collectionSelect');
    const search = $('#searchInput');
    const sort = $('#sortSelect');
    const note = $('#resultsNote');
    const params = new URLSearchParams(location.search);
    const initialCollection = params.get('collection') || 'all';
    if(select){ select.innerHTML = `<option value="all">All collections</option>` + collections.map(c=>`<option value="${c.id}">${c.title}</option>`).join(''); select.value = initialCollection; }
    if(chips){ chips.innerHTML = `<button class="chip active" data-chip="all">All Gear</button>` + collections.map(c=>`<button class="chip" data-chip="${c.id}">${c.navLabel}</button>`).join(''); $(`[data-chip="${initialCollection}"]`,chips)?.classList.add('active'); $('[data-chip="all"]',chips)?.classList.toggle('active', initialCollection==='all'); }
    const run = () => {
      const q = (search?.value || '').trim(); const col = select?.value || 'all';
      let list = products.map(p=>({p,score:scoreProduct(p,q)})).filter(x=>!q || x.score>0).map(x=>Object.assign({},x.p,{_score:x.score}));
      if(col !== 'all') list = list.filter(p=>p.collectionId === col);
      const s = sort?.value || 'featured';
      if(q) list.sort((a,b)=>b._score-a._score || (a.sortOrder||0)-(b.sortOrder||0));
      else if(s === 'price-low') list.sort((a,b)=>a.price-b.price);
      else if(s === 'price-high') list.sort((a,b)=>b.price-a.price);
      else list.sort((a,b)=>(b.featured===true)-(a.featured===true) || (a.sortOrder||0)-(b.sortOrder||0));
      renderProducts(list, grid);
      if(note) note.textContent = q ? `Recommended gear for “${q}” — ${list.length} result${list.length===1?'':'s'}.` : `Showing ${list.length} product${list.length===1?'':'s'}.`;
    };
    search?.addEventListener('input', run); select?.addEventListener('change',()=>{ updateChip(select.value); run(); }); sort?.addEventListener('change', run);
    chips?.addEventListener('click', e=>{ const b=e.target.closest('[data-chip]'); if(!b)return; select.value=b.dataset.chip; updateChip(b.dataset.chip); run(); });
    function updateChip(val){ $$('[data-chip]',chips).forEach(c=>c.classList.toggle('active',c.dataset.chip===val)); }
    run();
  }
  function renderProductPage(){
    const root = $('#productDetail'); if(!root) return;
    const id = new URLSearchParams(location.search).get('id');
    const p = products.find(x=>x.id===id) || products[0];
    if(!p){ root.innerHTML = `<div class="content-card"><h2>Product not found.</h2><p>Return to the catalogue and choose another product.</p><a class="btn btn-orange" href="shop.html">Shop gear</a></div>`; return; }
    const sale = p.salePrice && p.salePrice > p.price;
    root.innerHTML = `<div class="detail-media reveal"><img src="${productImage(p,1200)}" alt="${p.name}"></div><div class="detail-info reveal"><div class="eyebrow">${p.brand}</div><h1>${p.name}</h1><p class="paper-lead">${p.longDescription}</p><div class="price-row"><span class="price">${money(p.price)}</span>${sale?`<span class="was">${money(p.salePrice)}</span>`:''}</div><p><strong>Stock:</strong> ${p.stockStatus}</p><p><strong>Dimensions:</strong> ${p.dimensions||'Confirm with Vasbyt'}</p><ul class="specs">${(p.specs||[]).map(s=>`<li>${s}</li>`).join('')}</ul><div class="hero-ctas"><button class="btn btn-orange" data-add-quote="${p.id}">Add to quote</button><a class="btn" href="shop.html">Back to gear</a></div></div>`;
  }

  let quote = JSON.parse(localStorage.getItem('vasbytQuote') || '{}');
  function saveQuote(){ localStorage.setItem('vasbytQuote', JSON.stringify(quote)); updateQuoteCount(); renderQuote(); }
  function updateQuoteCount(){ const total = Object.values(quote).reduce((a,b)=>a+b,0); $$('[data-quote-count]').forEach(el=>el.textContent=total); }
  function addQuote(id){ quote[id]=(quote[id]||0)+1; saveQuote(); document.body.classList.add('quote-open'); }
  function renderQuote(){
    const list = $('#quoteList'); if(!list) return;
    const items = Object.entries(quote).map(([id,qty])=>({product:products.find(p=>p.id===id),qty})).filter(x=>x.product);
    if(!items.length){ list.innerHTML = `<div class="empty-quote">Your quote is empty. Add gear from the catalogue and send it to Vasbyt for stock, fitment and courier confirmation.</div>`; $('#quoteTotal').textContent = money(0); return; }
    list.innerHTML = items.map(({product:p,qty})=>`<div class="quote-item"><div><h4>${p.name}</h4><p>${money(p.price)} each</p></div><div class="qty"><button data-qty-minus="${p.id}">−</button><span>${qty}</span><button data-qty-plus="${p.id}">+</button><button data-qty-remove="${p.id}">×</button></div></div>`).join('');
    $('#quoteTotal').textContent = money(items.reduce((sum,x)=>sum+(x.product.price*x.qty),0));
  }
  function sendWhatsApp(){
    const items = Object.entries(quote).map(([id,qty])=>({product:products.find(p=>p.id===id),qty})).filter(x=>x.product);
    if(!items.length) return;
    if(!cfg.whatsappNumber || cfg.whatsappNumber === '27000000000') alert('Please add the WhatsApp number in STORE_CONFIG before presenting this live.');
    const total = items.reduce((sum,x)=>sum+(x.product.price*x.qty),0);
    const lines = [`Hi Vasbyt, I’m interested in the following gear:`, ``].concat(items.map(x=>`${x.qty}x ${x.product.name} — ${money(x.product.price)} each`), [``, `Estimated total: ${money(total)}`, ``, `Please confirm stock, fitment, courier cost and payment method.`]);
    window.open(`https://wa.me/${cfg.whatsappNumber||''}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank');
  }

  function setupEvents(){
    document.addEventListener('click', e=>{
      if(e.target.closest('[data-open-menu]')) document.body.classList.add('drawer-open');
      if(e.target.closest('[data-close-menu]') || e.target.classList.contains('drawer-backdrop')) document.body.classList.remove('drawer-open');
      if(e.target.closest('[data-open-quote]')) document.body.classList.add('quote-open');
      if(e.target.closest('[data-close-quote]') || e.target.classList.contains('quote-backdrop')) document.body.classList.remove('quote-open');
      const add=e.target.closest('[data-add-quote]'); if(add) addQuote(add.dataset.addQuote);
      const plus=e.target.closest('[data-qty-plus]'); if(plus){ quote[plus.dataset.qtyPlus]=(quote[plus.dataset.qtyPlus]||0)+1; saveQuote(); }
      const minus=e.target.closest('[data-qty-minus]'); if(minus){ const id=minus.dataset.qtyMinus; quote[id]=Math.max(0,(quote[id]||0)-1); if(!quote[id]) delete quote[id]; saveQuote(); }
      const rem=e.target.closest('[data-qty-remove]'); if(rem){ delete quote[rem.dataset.qtyRemove]; saveQuote(); }
      if(e.target.closest('[data-clear-quote]')){ quote={}; saveQuote(); }
      if(e.target.closest('[data-send-whatsapp]')) sendWhatsApp();
    });
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') document.body.classList.remove('drawer-open','quote-open'); });
    window.addEventListener('scroll',()=> $('#siteHeader')?.classList.toggle('is-scrolled', scrollY>10),{passive:true});
  }
  function setupReveal(){
    const obs = new IntersectionObserver(entries=>entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); obs.unobserve(en.target); } }),{threshold:.12});
    $$('.reveal').forEach(el=>obs.observe(el));
  }
  function setRevealIndexes(root=document){ $$('.stagger > *, .product-grid > *',root).forEach((el,i)=>el.style.setProperty('--i', i)); setupReveal(); }
  function renderQuoteShell(){
    const q=$('#quoteDrawer'); if(!q) return;
    q.innerHTML = `<div class="quote-top"><div><div class="eyebrow">WhatsApp-first checkout</div><h2>Your<br>quote.</h2></div><button class="close-btn" data-close-quote aria-label="Close quote">×</button></div><div id="quoteList" class="quote-list"></div><div class="quote-total"><strong>Estimated total</strong><strong id="quoteTotal">${money(0)}</strong></div><div class="quote-actions"><button class="btn btn-orange" data-send-whatsapp>Send on WhatsApp</button><button class="btn btn-ghost" data-clear-quote>Clear quote</button></div>`;
  }

  document.addEventListener('DOMContentLoaded',()=>{
    renderHeader(); renderDrawer(); renderFooter(); renderQuoteShell(); renderHome(); renderShop(); renderProductPage(); setupEvents(); updateQuoteCount(); renderQuote(); setRevealIndexes();
  });
})();
