/* =======================
   MENSAJE BIENVENIDA
======================= */
window.addEventListener('DOMContentLoaded', () => {
  const mensaje = document.getElementById('mensaje-bienvenida');
  if (mensaje) {
    mensaje.style.opacity = '1';
    setTimeout(() => { mensaje.style.opacity = '0'; }, 3000);
  }
});


/* =======================
   REVEAL AL SCROLL
======================= */
function revealOnLoad() {
  const elems = document.querySelectorAll('.tarjeta, .tarjeta-recurso');
  const trigger = window.innerHeight * 0.85;
  elems.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add('visible');
  });
}
window.addEventListener('scroll', revealOnLoad);
revealOnLoad();


/* =======================
   EFECTO RIPPLE EN BOTONES
======================= */
function initButtonRipples() {
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      const size = Math.max(rect.width, rect.height) * 1.2;
      ripple.style.width = ripple.style.height = size + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}
initButtonRipples();


/* =======================
   FORMULARIO FORMSPREE
======================= */
function initFormSubmit() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Enviando...';

    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      status.style.color = res.ok ? '#aeefff' : '#ffb3b3';
      status.textContent = res.ok
        ? '¡Gracias! Te contactaremos pronto.'
        : 'Hubo un error. Intentá de nuevo.';
    } catch {
      status.textContent = 'Error de conexión.';
      status.style.color = '#ffb3b3';
    }
  });
}
initFormSubmit();


/* =======================
   BACK TO TOP BUTTON
======================= */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
});


/* =======================
   MODO OSCURO / CLARO
======================= */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("modo-toggle");
  const body = document.body;

  if (localStorage.getItem("modo") === "oscuro") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const oscuro = body.classList.contains("dark-mode");
    toggleBtn.textContent = oscuro ? "☀️" : "🌙";
    localStorage.setItem("modo", oscuro ? "oscuro" : "claro");
  });
});


/* =======================
   EASTER EGG: "accio"
======================= */
let buffer = '';
document.addEventListener('keydown', e => {
  buffer += e.key.toLowerCase();
  if (buffer.includes('accio')) {
    alert('🪄 ¡Hechizo invocado con éxito, Fiorella!');
    buffer = '';
  }
  if (buffer.length > 10) buffer = '';
});


/* =======================
   EFECTO LUMUS PARA ENTRADA
======================= */
window.addEventListener("load", () => {
  const body = document.body;
  const intro = document.getElementById("intro");

  body.classList.add("inicio-bloqueado");

  setTimeout(() => {
    intro.style.opacity = "0";
    setTimeout(() => {
      intro.remove();
      body.classList.remove("inicio-bloqueado");
    }, 800);
  }, 3000);
});
