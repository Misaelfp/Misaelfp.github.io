/* ── AOS ── */
AOS.init({ duration:700, easing:'ease-out-cubic', once:true, offset:50 });

/* ── Navbar sticky ── */
(function(){
  const n = document.getElementById('nav');
  const fn = () => n.classList.toggle('stuck', window.scrollY > 50);
  window.addEventListener('scroll', fn, { passive:true });
  fn();
})();

/* ── Cerrar navbar móvil ── */
document.querySelectorAll('#navmenu .nav-link').forEach(l => {
  l.addEventListener('click', () => {
    const c = document.getElementById('navmenu');
    if(c.classList.contains('show'))
      document.querySelector('.navbar-toggler').click();
  });
});

/* ══════════════════════════════════════════
   FILTER LOGIC
══════════════════════════════════════════ */
(function(){
  const buttons  = document.querySelectorAll('.filter-btn');
  const items    = document.querySelectorAll('.proj-item');
  const countEl  = document.getElementById('proj-count');
  const noRes    = document.getElementById('noResults');

  function applyFilter(cat) {
    let visible = 0;
    items.forEach(item => {
      const match = cat === 'all' || item.dataset.cat === cat;
      item.classList.toggle('hide', !match);
      if(match) visible++;
    });
    countEl.textContent = visible;
    noRes.style.display = visible === 0 ? 'block' : 'none';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  /* Footer filter links */
  document.querySelectorAll('.ft-filter').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const cat = a.dataset.filter;
      document.getElementById('filter-bar').scrollIntoView({ behavior:'smooth' });
      setTimeout(() => {
        buttons.forEach(b => {
          b.classList.toggle('active', b.dataset.filter === cat);
        });
        applyFilter(cat);
      }, 500);
    });
  });
})();

/* ══════════════════════════════════════════
   PROJECT MODAL
══════════════════════════════════════════ */
(function(){
  const backdrop = document.getElementById('projModal');
  const closeBtn = document.getElementById('modalClose');

  function openModal(item) {
    document.getElementById('modalCat').lastChild.textContent = ' ' + item.dataset.cat;
    document.getElementById('modalTitle').textContent  = item.dataset.title;
    document.getElementById('modalDesc').textContent   = item.dataset.desc;
    document.getElementById('modalLoc').textContent    = item.dataset.loc;
    document.getElementById('modalYear').textContent   = item.dataset.year;
    document.getElementById('modalClient').textContent = item.dataset.client;
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.proj-item').forEach(item => {
    item.addEventListener('click', () => openModal(item));
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => {
    if(e.target === backdrop) closeModal();
  });

  /* Esc key */
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') closeModal();
  });
})();