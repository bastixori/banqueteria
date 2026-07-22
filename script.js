/* ==========================================================================
   PIMIENTA GUAYABITA – INTERACTIVE ENGINE
   Developer: Antigravity AI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (menuToggle.querySelector('i')) {
          menuToggle.querySelector('i').classList.add('fa-bars');
          menuToggle.querySelector('i').classList.remove('fa-times');
        }
      });
    });
  }

  // 2. Product Gallery Tab Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Cotización Form Submission -> WhatsApp Auto Generator (+56 9 4730 1489)
  const cotizacionForm = document.getElementById('cotizacionForm');

  if (cotizacionForm) {
    cotizacionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('cotNombre').value.trim();
      const whatsapp = document.getElementById('cotWhatsapp').value.trim();
      const correo = document.getElementById('cotCorreo').value.trim();
      const comuna = document.getElementById('cotComuna').value.trim();
      const fechaCumple = document.getElementById('cotCumple').value.trim();
      const fechaEvento = document.getElementById('cotFechaEvento').value.trim();
      const servicio = document.getElementById('cotServicio').value;
      const presupuesto = document.getElementById('cotPresupuesto').value.trim();
      const comentarios = document.getElementById('cotComentarios').value.trim();

      if (!nombre || !whatsapp || !fechaEvento || !servicio) {
        showToast('Por favor completa los campos requeridos (*)', 'error');
        return;
      }

      // Build WhatsApp Message
      let mensaje = `*¡Hola Yermary! Quiero solicitar una cotización para Pimienta Guayabita 🍰*\n\n`;
      mensaje += `👤 *Nombre:* ${nombre}\n`;
      mensaje += `📱 *WhatsApp Client:* ${whatsapp}\n`;
      if (correo) mensaje += `✉️ *Correo:* ${correo}\n`;
      if (comuna) mensaje += `📍 *Comuna:* ${comuna}\n`;
      if (fechaCumple) mensaje += `🎂 *Fecha de Cumpleaños:* ${fechaCumple}\n`;
      mensaje += `📅 *Fecha del Evento:* ${fechaEvento}\n`;
      mensaje += `✨ *Servicio:* ${servicio}\n`;
      if (presupuesto) mensaje += `💰 *Presupuesto Aprox:* ${presupuesto}\n`;
      if (comentarios) mensaje += `📝 *Comentarios/Detalle:* ${comentarios}\n`;

      const whatsappNumber = '56947301489'; // Official WhatsApp number
      const encodedMsg = encodeURIComponent(mensaje);
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

      showToast('¡Cotización lista! Redirigiendo a WhatsApp...', 'success');

      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 1200);
    });
  }

  // 4. Course Lead Capture Form
  const cursoForm = document.getElementById('cursoForm');

  if (cursoForm) {
    cursoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('cursoNombre').value.trim();
      const email = document.getElementById('cursoEmail').value.trim();

      if (!nombre || !email) {
        showToast('Ingresa tu nombre y correo para enviarte la información.', 'error');
        return;
      }

      showToast(`¡Gracias ${nombre}! Te hemos anotado para recibir la agenda de próximos cursos.`, 'success');
      cursoForm.reset();
    });
  }

  // 5. Club Pimienta Subscription Form
  const clubForm = document.getElementById('clubForm');

  if (clubForm) {
    clubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('clubEmail').value.trim();

      if (!email) {
        showToast('Ingresa tu correo para unirte al Club Pimienta.', 'error');
        return;
      }

      showToast('🎉 ¡Bienvenido al Club Pimienta! Pronto recibirás tus primeros beneficios exclusivos.', 'success');
      clubForm.reset();
    });
  }

  // 6. Pre-select service in Cotización
  window.selectServiceForQuote = function(serviceName) {
    const cotServicio = document.getElementById('cotServicio');
    if (cotServicio) {
      cotServicio.value = serviceName;
    }
    const cotSection = document.getElementById('cotizacion');
    if (cotSection) {
      cotSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toast System
  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';

    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

});
