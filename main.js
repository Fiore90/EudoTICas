/* script.js - animaciones seguras, reveal, form submit y ripple */

/* Mostrar mensaje bienvenida cuando DOM listo */
// ✨ Bienvenida mágica tipo "Lumos!"
window.addEventListener('DOMContentLoaded', () => {
  const mensaje = document.getElementById('mensaje-bienvenida');
  if (mensaje) {
    mensaje.textContent = "Lumos!";
    mensaje.style.opacity = '1';
    setTimeout(() => {
      mensaje.textContent = "Bienvenidos!";
    }, 1500);
    setTimeout(() => {
      mensaje.style.opacity = '0';
    }, 500);
  }
});
  // Inicializar reveals (tarjetas)
  revealOnLoad();
  window.addEventListener('scroll', revealOnLoad);

  // Inicializar ripple en botones
  initButtonRipples();

  // Inicializar envío de formulario (Formspree)
  initFormSubmit();

/* Revelar tarjetas al hacer scroll */
function revealOnLoad() {
  const elems = document.querySelectorAll('.tarjeta, .tarjeta-recurso');
  const trigger = window.innerHeight * 0.85;
  elems.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add('visible');
  });
}

/* Ripple */
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

/* Formspree submit (fetch) */
function initFormSubmit() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Enviando...';
    status.style.color = '#fff';
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        status.textContent = '¡Gracias! Te contactaremos pronto.';
        status.style.color = '#aeefff';
        form.reset();
      } else {
        status.textContent = 'Hubo un error al enviar. Intentá de nuevo.';
        status.style.color = '#ffb3b3';
      }
    } catch (err) {
      status.textContent = 'Error de conexión. Revisá tu internet.';
      status.style.color = '#ffb3b3';
    }
  });
}

/* particles config - pega esto en js/main.js (después de cargar particles.min.js) */
particlesJS("particles-js", {
  particles: {
    number: { value: 90, density: { enable: true, value_area: 800 } },
    color: { value: "#00ffff" }, // Azul brillante más saturado
    shape: { type: "circle" },
    opacity: { value: 1, random: false }, // 100% visibles
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 140,
      color: "#1c4549ff", // más luminoso aún
      opacity: 0.8,
      width: 2, // líneas más gruesas
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 120, duration: 0.5 },
      push: { particles_nb: 3 }
    }
  },
  retina_detect: true
});

/* Efecto escritura en el título "Sobre mí" */
document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.getElementById("titulo-sobre-mi");
  const texto = "Sobre mí";
  let i = 0;

  function escribir() {
    if (i < texto.length) {
      titulo.textContent += texto.charAt(i);
      i++;
      setTimeout(escribir, 150);
    }
  }
  escribir();
});

const frases = [
  "Creatividad y tecnología para el aula",
  "Aprender haciendo y explorando",
  "Educación tecnológica en movimiento"
];
let i = 0;
setInterval(() => {
  document.getElementById("texto-dinamico").textContent = frases[i];
  i = (i + 1) % frases.length;
}, 3000)

// js/backtotop.js
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('visible'); else btn.classList.remove('visible');
  });
});

// js/reveal.js
document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll('.reveal');
  function show(){
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 80) el.classList.add('visible');
    });
  }
  show();
  window.addEventListener('scroll', show);
});

document.addEventListener("DOMContentLoaded", () => {
});
  // Ver si hay un modo guardado en localStorage
  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "oscuro") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  // Cambiar tema al hacer clic

  // js/theme-toggle.js

/* =======================
   BOTÓN MODO OSCURO / CLARO
   ======================= */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "modo-toggle";
  toggleBtn.textContent = "🌙";
  document.body.appendChild(toggleBtn);

  const body = document.body;
  const modoGuardado = localStorage.getItem("modo");

  // Restaurar modo guardado
  if (modoGuardado === "oscuro") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  // Cambiar tema al hacer clic
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️";
      localStorage.setItem("modo", "oscuro");
    } else {
      toggleBtn.textContent = "🌙";
      localStorage.setItem("modo", "claro");
    }
  });
});

// 🪄 Easter egg secreto: accio
let buffer = '';
document.addEventListener('keydown', e => {
  buffer += e.key.toLowerCase();
  if (buffer.includes('accio')) {
    alert('🪄 ¡Hechizo invocado con éxito, Fiorella!');
    buffer = '';
  }
  if (buffer.length > 10) buffer = '';
});

window.addEventListener('DOMContentLoaded', () => {
  const sonidoLumus = new Audio('sonidos/lumus.mp3'); // poné tu sonido acá
  sonidoLumus.volume = 0.4;
  sonidoLumus.play().catch(() => {});
});
/* ==== EFECTO LUMUS QUE “ENCIENDE” EL SITIO ==== */
window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const intro = document.getElementById("intro");
  const mainContent = document.querySelector("main") || document.body;

  // Bloquear scroll y ocultar contenido al inicio
  body.classList.add("inicio-bloqueado");
  mainContent.style.opacity = "0";

  // Reproducir sonido opcional
  const lumusSound = new Audio("sonidos/lumus.mp3"); // opcional
  lumusSound.volume = 0.4;
  lumusSound.play().catch(() => {});

  // Esperar 3.5s y “encender” la página
  setTimeout(() => {
    intro.style.display = "none";
    body.classList.remove("inicio-bloqueado");
    mainContent.style.transition = "opacity 1s ease-in-out";
    mainContent.style.opacity = "1";
  }, 3500);
});

