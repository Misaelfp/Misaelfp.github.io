/* ── AOS init ── */
AOS.init({ duration:700, easing:'ease-out-cubic', once:true, offset:50 });

/* ── Navbar sticky ── */
(function(){
  const n = document.getElementById('nav');
  const onS = () => n.classList.toggle('stuck', window.scrollY > 50);
  window.addEventListener('scroll', onS, { passive:true });
  onS();
})();

/* ── Cerrar navbar móvil al hacer click en link ── */
document.querySelectorAll('#navmenu .nav-link').forEach(l => {
  l.addEventListener('click', () => {
    const c = document.getElementById('navmenu');
    if(c.classList.contains('show'))
      document.querySelector('.navbar-toggler').click();
  });
});

/* ── Smooth scroll para tabs de servicios ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior:'smooth' });
    }
  });
});

/* ── Highlight nav quick-tabs on scroll ── */
(function(){
  const anchors = ['obras','geomatica','certificacion','generales'];
  const tabs = document.querySelectorAll('[href^="#"]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        tabs.forEach(t => {
          t.style.background = '';
          t.style.borderColor = '';
          t.style.color = '';
        });
        const id = e.target.id;
        const active = document.querySelector(`[href="#${id}"]`);
        if(active && active.classList.contains('btn-out')){
          active.style.background = 'var(--g)';
          active.style.borderColor = 'var(--g)';
          active.style.color = '#fff';
        }
      }
    });
  }, { threshold:.3 });
  anchors.forEach(id => {
    const el = document.getElementById(id);
    if(el) io.observe(el);
  });
})();