// Custom cursor
const cur = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});
(function animateCursor() {
  rx += (mx - rx) * .11;
  ry += (my - ry) * .11;
  curR.style.left = rx + 'px';
  curR.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

// Cursor hover effects
document.querySelectorAll('a,button,.rc,.cc,.pc,.bc,.tc,.mi').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '4px';
    cur.style.height = '4px';
    curR.style.width = '50px';
    curR.style.height = '50px';
    curR.style.opacity = '.65';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '9px';
    cur.style.height = '9px';
    curR.style.width = '34px';
    curR.style.height = '34px';
    curR.style.opacity = '.4';
  });
});

// Nav scroll - glassmorphism on hero, solid when scrolled
const nb = document.getElementById('nb');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nb.style.background = 'rgba(255,255,255,.96)'
    nb.style.backdropFilter = 'blur(14px)'
    nb.style.borderBottom = '1px solid rgba(12,12,12,.09)'
    nb.style.boxShadow = '0 2px 20px rgba(0,0,0,.06)'
    document.querySelectorAll('.nav-links>li>a').forEach(a => a.style.color = '')
    document.querySelector('.logo img').style.filter = ''
    document.querySelector('.btn-ghost').style.color = ''
    document.querySelector('.btn-ghost').style.borderColor = ''
  } else {
    nb.style.background = 'rgba(255,255,255,.08)'
    nb.style.backdropFilter = 'blur(20px)'
    nb.style.borderBottom = '1px solid rgba(255,255,255,.15)'
    nb.style.boxShadow = 'none'
    document.querySelectorAll('.nav-links>li>a').forEach(a => a.style.color = 'rgba(255,255,255,.85)')
    document.querySelector('.logo img').style.filter = 'brightness(0) invert(1)'
    document.querySelector('.btn-ghost').style.color = 'white'
    document.querySelector('.btn-ghost').style.borderColor = 'rgba(255,255,255,.4)'
  }
});

// Scroll-in animation
const obs = new IntersectionObserver(
  entries => entries.forEach(x => { if (x.isIntersecting) x.target.classList.add('vis'); }),
  { threshold: .07, rootMargin: '0px 0px -28px 0px' }
);
document.querySelectorAll('.fu').forEach(el => obs.observe(el));

// Product page: options
document.querySelectorAll('.pp-opt').forEach(o => o.addEventListener('click', function () {
  document.querySelectorAll('.pp-opt').forEach(x => x.classList.remove('act'));
  this.classList.add('act');
}));

// Product page: color swatches
document.querySelectorAll('.pp-col').forEach(c => c.addEventListener('click', function () {
  document.querySelectorAll('.pp-col').forEach(x => x.classList.remove('act'));
  this.classList.add('act');
}));

// Product page: thumbnail gallery
document.querySelectorAll('.pp-th').forEach(t => t.addEventListener('click', function () {
  document.querySelectorAll('.pp-th').forEach(x => x.classList.remove('act'));
  this.classList.add('act');
}));

// Mega menu
document.querySelectorAll('.mega-l a').forEach(a => a.addEventListener('mouseenter', function () {
  document.querySelectorAll('.mega-l a').forEach(x => x.classList.remove('act'));
  this.classList.add('act');
}));

// ── MODAL ──────────────────────────────────────────────────────────────
const modalHTML = `
<div id="r-modal" style="display:none;position:fixed;inset:0;z-index:500;align-items:center;justify-content:center">
  <div id="r-modal-bg" style="position:absolute;inset:0;backdrop-filter:blur(12px);background:rgba(0,0,0,.7)"></div>
  <div id="r-modal-box" style="position:relative;z-index:501;background:#0C0C0C;width:90vw;max-width:1100px;max-height:90vh;overflow-y:auto;display:flex;flex-direction:column">
    
    <!-- close -->
    <button id="r-modal-close" style="position:absolute;top:20px;right:20px;background:none;border:none;color:white;font-size:28px;cursor:pointer;z-index:10;line-height:1">×</button>

    <!-- hero image -->
    <div id="r-modal-hero" style="width:100%;height:55vh;background-size:cover;background-position:center;position:relative;flex-shrink:0">
      <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(12,12,12,1) 0%,rgba(0,0,0,0) 60%)"></div>
      <div style="position:absolute;bottom:32px;left:40px;right:40px">
        <div id="r-modal-tag" style="font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:10px">Réalisation · Stock Bureaux</div>
        <div id="r-modal-title" style="font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,52px);font-weight:300;color:white;line-height:1.05;margin-bottom:16px"></div>
        <div id="r-modal-meta" style="display:flex;gap:28px"></div>
      </div>
    </div>

    <!-- body -->
    <div style="display:grid;grid-template-columns:1fr 260px;gap:48px;padding:40px">
      <div>
        <div style="font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#003CC7;margin-bottom:16px;display:flex;align-items:center;gap:10px"><span style="width:20px;height:1px;background:#003CC7;display:inline-block"></span>À propos</div>
        <p id="r-modal-desc" style="font-size:15px;line-height:1.85;color:rgba(255,255,255,.6);font-weight:300"></p>
        <div style="margin-top:32px">
          <a href="#devis" id="r-modal-cta" style="display:inline-flex;align-items:center;gap:8px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:white;background:#003CC7;border:1px solid #003CC7;padding:11px 24px;text-decoration:none;transition:all .2s" onclick="closeModal()">Demander un devis similaire →</a>
        </div>
      </div>
      <div style="border-top:2px solid #003CC7;padding-top:20px">
        <div style="font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:#003CC7;margin-bottom:16px">Détails</div>
        <div id="r-modal-details"></div>
      </div>
    </div>

    <!-- gallery -->
    <div id="r-modal-gallery" style="padding:0 40px 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:3px"></div>
  </div>
</div>
`
document.body.insertAdjacentHTML('beforeend', modalHTML)

document.getElementById('r-modal-close').onclick = closeModal
document.getElementById('r-modal-bg').onclick = closeModal
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal() })

function openModal(r) {
  const images = r.images && r.images.length > 0 ? r.images : (r.image_url ? [r.image_url] : [])
  
  document.getElementById('r-modal-hero').style.backgroundImage = `url('${images[0] || ''}')`
  document.getElementById('r-modal-title').textContent = r.titre
  
  // meta
  const metaEl = document.getElementById('r-modal-meta')
  metaEl.innerHTML = [
    r.ville ? `<div><div style="font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:3px">Ville</div><div style="font-size:13px;color:white">${r.ville}</div></div>` : '',
    r.surface ? `<div><div style="font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:3px">Surface</div><div style="font-size:13px;color:white">${r.surface}</div></div>` : '',
    r.annee ? `<div><div style="font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:3px">Année</div><div style="font-size:13px;color:white">${r.annee}</div></div>` : '',
  ].join('')

  // desc
  document.getElementById('r-modal-desc').textContent = r.description || 'Aucune description disponible.'

  // details
  const details = document.getElementById('r-modal-details')
  details.innerHTML = [
    ['Projet', r.titre],
    ['Ville', r.ville],
    ['Surface', r.surface],
    ['Année', r.annee],
  ].filter(([,v]) => v).map(([k,v]) => `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.07)">
      <span style="font-size:12px;color:rgba(255,255,255,.35)">${k}</span>
      <span style="font-size:13px;color:white;font-weight:500">${v}</span>
    </div>
  `).join('')

  // gallery
  const gallery = document.getElementById('r-modal-gallery')
  if (images.length > 1) {
    gallery.style.display = 'grid'
    gallery.innerHTML = images.map((url, i) => `
      <div onclick="openLightbox('${url}')" style="aspect-ratio:4/3;overflow:hidden;cursor:pointer">
        <img src="${url}" style="width:100%;height:100%;object-fit:cover;transition:transform .5s" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
      </div>
    `).join('')
  } else {
    gallery.style.display = 'none'
    gallery.innerHTML = ''
  }

  const modal = document.getElementById('r-modal')
  modal.style.display = 'flex'
  document.body.style.overflow = 'hidden'
  document.getElementById('r-modal-box').scrollTop = 0
}

function closeModal() {
  document.getElementById('r-modal').style.display = 'none'
  document.body.style.overflow = ''
}

// lightbox inside modal
const lbHTML = `
<div id="lb" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:600;align-items:center;justify-content:center" onclick="closeLb()">
  <img id="lb-img" src="" style="max-width:90vw;max-height:90vh;object-fit:contain">
  <button style="position:absolute;top:20px;right:28px;background:none;border:none;color:white;font-size:32px;cursor:pointer" onclick="closeLb()">×</button>
</div>`
document.body.insertAdjacentHTML('beforeend', lbHTML)

function openLightbox(url) {
  document.getElementById('lb-img').src = url
  document.getElementById('lb').style.display = 'flex'
}
function closeLb() {
  document.getElementById('lb').style.display = 'none'
}

// ── LOAD REALISATIONS ──────────────────────────────────────────────────
async function loadRealisations() {
  const { data } = await sbClient.from('realisations').select('*').order('created_at', { ascending: false }).limit(3)
  if (!data || data.length === 0) return
  const pg = document.querySelector('.pg')
  if (!pg) return
  pg.innerHTML = ''
  data.forEach((r, i) => {
    const isLg = i === 0
    const div = document.createElement('div')
    div.className = `pc ${isLg ? 'lg' : ''} fu vis`
    div.style.cursor = 'pointer'
div.onclick = () => { window.location.href = `categorie.html?id=${cat.id}` }
    div.innerHTML = `
      <div class="pb" style="background-image:url('${r.image_url}');background-size:cover;background-position:center"></div>
      ${isLg ? '<div class="ptag">Projet Signature</div>' : ''}
      <div class="po">
        <div class="pt">${r.description || ''}</div>
        <div class="pn">${r.titre}</div>
        <div class="pm">${r.ville || ''} ${r.surface ? '· ' + r.surface : ''} ${r.annee ? '· ' + r.annee : ''}</div>
      </div>
    `
    div.onclick = () => openModal(r)
    pg.appendChild(div)
  })
}

loadRealisations()
// Load dynamic mega menu
async function loadMegaMenu() {
  const [{ data: cats }, { data: sous }] = await Promise.all([
    sbClient.from('categories').select('*').order('nom'),
    sbClient.from('sous_categories').select('*').order('nom'),
  ])
  if (!cats || cats.length === 0) return

  const megaL = document.querySelector('.mega-l')
  const megaR = document.querySelector('.mega-r')
  if (!megaL || !megaR) return

  const colors = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12']

  // build left categories
  megaL.innerHTML = ''
  cats.forEach((cat, i) => {
    const a = document.createElement('a')
    a.href = `categorie.html?id=${cat.id}`
    a.textContent = cat.nom
    if (i === 0) a.classList.add('act')
    a.addEventListener('mouseenter', () => {
      document.querySelectorAll('.mega-l a').forEach(x => x.classList.remove('act'))
      a.classList.add('act')
      renderSous(cat.id, cat)
    })
    megaL.appendChild(a)
  })

  // render sous-categories for a given category
  function renderSous(catId, cat) {
    const filtered = sous.filter(s => s.categorie_id === catId)
    megaR.innerHTML = ''
    filtered.forEach((s, i) => {
      const a = document.createElement('a')
      a.className = 'mi'
      a.href = `categorie.html?id=${catId}`
      a.onclick = async (e) => {
        e.preventDefault()
        const res = await sbClient.from('sous_sous_categories').select('id').eq('sous_categorie_id', s.id).limit(1)
        if (res.data && res.data.length > 0) {
          window.location.href = `sous-categorie.html?sous_id=${s.id}&cat_id=${catId}`
        } else {
          window.location.href = `produits.html?sous_id=${s.id}&cat_id=${catId}`
        }
      }
      a.innerHTML = `<div class="mi-img ${colors[i % colors.length]}"></div><div class="mi-lbl">${s.nom}</div>`
      megaR.appendChild(a)
    })
    // add catalogue card
    const cat = document.createElement('a')
    cat.className = 'mi'
    cat.href = '#'
    cat.style.gridColumn = 'span 2'
    cat.innerHTML = `<div class="mi-img" style="background:var(--blue);display:flex;align-items:center;justify-content:center;gap:12px;padding:0 24px"><span style="font-family:var(--serif);font-size:22px;color:white;font-weight:300">Catalogue 2024–2025</span><span style="font-size:11px;color:rgba(255,255,255,.6);letter-spacing:.1em;text-transform:uppercase">PDF gratuit</span></div><div class="mi-lbl" style="background:var(--ink);color:white;border:none">Télécharger le catalogue complet →</div>`
    megaR.appendChild(cat)
  }

  // render first category by default
  renderSous(cats[0].id, cats[0])
}

loadMegaMenu()

// Load dynamic products/categories section
async function loadCategories() {
  const { data: cats } = await sbClient.from('categories').select('*').order('nom')
  if (!cats || cats.length === 0) return
  const cg = document.querySelector('.cg')
  if (!cg) return
  const colors = ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12']
  const ctaCard = cg.querySelector('.cta-card')
  cg.innerHTML = ''
  cats.forEach((cat, i) => {
    const a = document.createElement('a')
    a.className = 'cc fu vis'
    a.href = `categorie.html?id=${cat.id}`
    a.style.textDecoration = 'none'
    a.innerHTML = `
      <div class="ci">
        ${cat.image_url
          ? `<img src="${cat.image_url}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`
          : `<div class="cs ${colors[i % colors.length]}"><div class="csh" style="width:55%;height:42%;"></div></div>`
        }
      </div>
      <div class="cin">
        <div class="cn">${cat.nom}</div>
        <div class="cco">Voir les produits</div>
      </div>
      <div class="car">→</div>
    `
    cg.appendChild(a)
  })
  if (ctaCard) cg.appendChild(ctaCard)
}
loadCategories()

// Creative scroll animations
function animateOnScroll() {
  // Fade + slide up — section headers
  document.querySelectorAll('.sec-hd, .why-hd, .s-ey, .s-hd, .a-ey, .a-t, .sh-ey, .sh-t, .page-hero-h').forEach(el => {
    el.style.cssText += 'opacity:0;transform:translateY(40px);transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)'
  })

  // Fade + slide left — left cards
  document.querySelectorAll('.rc:first-child, .ctl, .al').forEach(el => {
    el.style.cssText += 'opacity:0;transform:translateX(-40px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)'
  })

  // Fade + slide right — right cards
  document.querySelectorAll('.rc:last-child, .ctr, .sv').forEach(el => {
    el.style.cssText += 'opacity:0;transform:translateX(40px);transition:opacity .8s ease,transform .8s cubic-bezier(.16,1,.3,1)'
  })

  // Scale up — product cards, category cards
  document.querySelectorAll('.cc, .pc, .rl-card').forEach((el, i) => {
    el.style.cssText += `opacity:0;transform:scale(0.92);transition:opacity .6s ease ${i*0.05}s,transform .6s cubic-bezier(.16,1,.3,1) ${i*0.05}s`
  })

  // Stagger slide up — why cards, testimonials
  document.querySelectorAll('.wc, .tc, .apk').forEach((el, i) => {
    el.style.cssText += `opacity:0;transform:translateY(50px);transition:opacity .7s ease ${i*0.08}s,transform .7s cubic-bezier(.16,1,.3,1) ${i*0.08}s`
  })

  // Slide up — pills
  document.querySelectorAll('.pill').forEach((el, i) => {
    el.style.cssText += `opacity:0;transform:translateY(20px);transition:opacity .5s ease ${i*0.1}s,transform .5s ease ${i*0.1}s`
  })

  // Trust bar — blur in
  document.querySelectorAll('.tlo').forEach((el, i) => {
    el.style.cssText += `opacity:0;filter:blur(4px);transition:opacity .5s ease ${i*0.06}s,filter .5s ease ${i*0.06}s`
  })

  // Blog cards — rotate + fade
  document.querySelectorAll('.bc').forEach((el, i) => {
    el.style.cssText += `opacity:0;transform:translateY(30px) rotate(${i%2===0?'-':''}1deg);transition:opacity .7s ease ${i*0.1}s,transform .7s cubic-bezier(.16,1,.3,1) ${i*0.1}s`
  })

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0) translateX(0) scale(1) rotate(0deg)'
        entry.target.style.filter = 'blur(0)'
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.sec-hd,.why-hd,.s-ey,.s-hd,.a-ey,.a-t,.sh-ey,.sh-t,.rc,.ctl,.ctr,.al,.sv,.cc,.pc,.rl-card,.wc,.tc,.apk,.pill,.tlo,.bc').forEach(el => obs.observe(el))
}

animateOnScroll()

// trigger nav state on load
window.dispatchEvent(new Event('scroll'));