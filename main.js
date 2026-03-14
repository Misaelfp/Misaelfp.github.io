/* ─────── Inicializar AOS ─────── */
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60
});

/* ─────── Navbar al hacer scroll ─────── */
const nav = document.getElementById('mainNav');
const onScroll = () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ─────── Active link al hacer scroll ─────── */
const sections = document.querySelectorAll('section[id], div[id="hero"]');
const navLinks = document.querySelectorAll('.nav-link:not(.btn-cotizar)');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

/* ─────── Contador animado (hero stats) ─────── */
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = '+' + current + suffix;
    if (current >= target) clearInterval(timer);
  }, 28);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.hero-stat .num').forEach(el => {
        const raw = el.textContent.replace(/[^0-9]/g, '');
        animateCount(el, parseInt(raw));
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsWrap = document.querySelector('.hero-stats');
if (statsWrap) statsObserver.observe(statsWrap);

/* ─────── Formulario de contacto ─────── */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const fb = document.getElementById('formFeedback');
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (!nombre || !correo || !mensaje) {
    fb.style.display = 'block';
    fb.innerHTML = '<div class="alert alert-danger" style="border-radius:10px;font-size:.88rem;">Por favor complete todos los campos requeridos.</div>';
    return;
  }

  // Simula envío (aquí integrar con backend o servicio como FormSpree / EmailJS)
  fb.style.display = 'block';
  fb.innerHTML = `<div class="alert alert-success" style="border-radius:10px;font-size:.88rem;background:rgba(31,164,99,.15);border-color:var(--green);color:#fff;">
    ✓ ¡Mensaje enviado! Nos comunicaremos con usted a la brevedad, <strong>${nombre}</strong>.
  </div>`;
  this.reset();
});

/* ─────── Cerrar navbar móvil al seleccionar enlace ─────── */
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');
    if (collapse.classList.contains('show')) toggler.click();
  });
});