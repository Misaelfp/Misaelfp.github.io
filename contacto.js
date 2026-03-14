/* ════════════════════════════════════════
   AOS — animaciones al hacer scroll
════════════════════════════════════════ */
AOS.init({ duration:700, easing:'ease-out-cubic', once:true, offset:50 });

/* ════════════════════════════════════════
   NAVBAR — sticky al hacer scroll
════════════════════════════════════════ */
(function(){
  const n = document.getElementById('nav');
  const fn = () => n.classList.toggle('stuck', window.scrollY > 50);
  window.addEventListener('scroll', fn, { passive:true });
  fn();
})();

/* ════════════════════════════════════════
   NAVBAR — cerrar menú móvil al click
════════════════════════════════════════ */
document.querySelectorAll('#navmenu .nav-link').forEach(l => {
  l.addEventListener('click', () => {
    const c = document.getElementById('navmenu');
    if(c.classList.contains('show'))
      document.querySelector('.navbar-toggler').click();
  });
});

/* ════════════════════════════════════════
   SMOOTH SCROLL — botón del navbar
════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior:'smooth' });
    }
  });
});

/* ════════════════════════════════════════
   FORMULARIO DE CONTACTO
   Aquí conectar con servicio real:
   - FormSpree: https://formspree.io
   - EmailJS:   https://emailjs.com
   - Backend propio con PHP/Node.js
════════════════════════════════════════ */
document.getElementById('formContacto').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre  = document.getElementById('c-nombre').value.trim();
  const correo  = document.getElementById('c-correo').value.trim();
  const tipo    = document.getElementById('c-tipo').value;
  const mensaje = document.getElementById('c-mensaje').value.trim();
  const alert   = document.getElementById('alertContacto');

  /* Validación básica */
  if(!nombre || !correo || !tipo || !mensaje){
    alert.className = 'form-alert error';
    alert.style.display = 'block';
    alert.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Por favor completa todos los campos requeridos.';
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)){
    alert.className = 'form-alert error';
    alert.style.display = 'block';
    alert.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Por favor ingresa un correo electrónico válido.';
    return;
  }

  /* ─── INTEGRACIÓN REAL ──────────────────────────────
     Descomenta y configura según tu servicio:

     // FormSpree:
     const res = await fetch('https://formspree.io/f/TU_ID', {
       method:'POST', headers:{'Content-Type':'application/json'},
       body: JSON.stringify({ nombre, correo, tipo, mensaje })
     });

     // EmailJS:
     emailjs.send('SERVICE_ID','TEMPLATE_ID',{ nombre, correo, tipo, mensaje });
  ────────────────────────────────────────────────── */

  /* Simulación de envío exitoso */
  const btn = this.querySelector('.btn-submit');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';

  setTimeout(() => {
    alert.className = 'form-alert success';
    alert.style.display = 'block';
    alert.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>¡Mensaje enviado, <strong>${nombre}</strong>! Nos comunicaremos pronto.`;
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Enviar mensaje';
    this.reset();
  }, 1500);
});

/* ════════════════════════════════════════
   FORMULARIO DE COTIZACIÓN
════════════════════════════════════════ */
document.getElementById('formCotizacion').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre   = document.getElementById('q-nombre').value.trim();
  const correo   = document.getElementById('q-correo').value.trim();
  const telefono = document.getElementById('q-telefono').value.trim();
  const servicio = document.getElementById('q-servicio').value;
  const desc     = document.getElementById('q-desc').value.trim();
  const alert    = document.getElementById('alertCotizacion');

  /* Validación */
  if(!nombre || !correo || !telefono || !servicio || !desc){
    alert.className = 'form-alert error';
    alert.style.display = 'block';
    alert.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Por favor completa todos los campos requeridos.';
    return;
  }

  /* Opción: enviar cotización directamente por WhatsApp */
  const waMsg = encodeURIComponent(
    `Hola Plasencia & Asociados,\n\n` +
    `*Solicitud de cotización*\n` +
    `• Nombre: ${nombre}\n` +
    `• Correo: ${correo}\n` +
    `• Teléfono: ${telefono}\n` +
    `• Servicio: ${servicio}\n` +
    `• Proyecto: ${desc}`
  );

  const btn = this.querySelector('.btn-submit');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Procesando...';

  setTimeout(() => {
    alert.className = 'form-alert success';
    alert.style.display = 'block';
    alert.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>¡Cotización recibida, <strong>${nombre}</strong>! Te contactaremos en breve. <a href="https://wa.me/51948685057?text=${waMsg}" target="_blank" rel="noopener" style="color:var(--g);font-weight:600;text-decoration:underline;margin-left:4px;">También puedes confirmar por WhatsApp →</a>`;
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-calculator-fill me-2"></i>Solicitar Cotización';
    this.reset();
  }, 1500);
});