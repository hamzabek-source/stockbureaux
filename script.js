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

// Nav scroll shadow
const nb = document.getElementById('nb');
window.addEventListener('scroll', () => {
  nb.style.boxShadow = window.scrollY > 60 ? '0 2px 20px rgba(0,0,0,.06)' : 'none';
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

// Load realisations from Supabase
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
    div.innerHTML = `
      <div class="pb" style="background-image:url('${r.image_url}');background-size:cover;background-position:center"></div>
      ${isLg ? '<div class="ptag">Projet Signature</div>' : ''}
      <div class="po">
        <div class="pt">${r.description || ''}</div>
        <div class="pn">${r.titre}</div>
        <div class="pm">${r.ville || ''} ${r.surface ? '· ' + r.surface : ''} ${r.annee ? '· ' + r.annee : ''}</div>
      </div>
    `
    pg.appendChild(div)
  })
}
loadRealisations()