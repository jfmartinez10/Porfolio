// Sistema de menú interactivo
const container = document.getElementById("menuContainer");
const logo = document.getElementById("logo");

// Intro automática
setTimeout(() => {
  container.classList.add("active"); // despliega menú
}, 1200);

setTimeout(() => {
  container.classList.remove("active"); // vuelve logo al centro
}, 4000);

// Interacción del usuario
logo.addEventListener("click", () => {
  container.classList.toggle("active");
});

// Texto animado
const typedText = document.getElementById("typed");
const frases = [
  "Desarrollador Front-End 💻",
  "Apasionado por la tecnología ⚡",
  "Diseñador digital creativo 🎨"
];
let i = 0, j = 0, borrando = false;

// Efecto de escritura y borrado
function typeEffect() {
  if (!borrando && j < frases[i].length) {
    typedText.textContent += frases[i][j++];
    setTimeout(typeEffect, 80);
  } else if (borrando && j > 0) {
    typedText.textContent = frases[i].substring(0, --j);
    setTimeout(typeEffect, 40);
  } else {
    borrando = !borrando;
  if (!borrando) i = (i + 1) % frases.length;
    setTimeout(typeEffect, 1000);
  }
}
typeEffect();

// Sistema de partículas de fondo
const canvas = document.getElementById("particulas");
const ctx = canvas.getContext("2d");

// Ajustar tamaño del canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Crear partículas
const particles = [];
const totalParticles = 90; 

for (let i = 0; i < totalParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

// Partículas de fondo
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// FADE-SCROLL
let prevScrollY = window.scrollY;
let lastScrollY = window.scrollY;

// Actualizamos lastScrollY en cada scroll
window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;

    if (entry.isIntersecting) {
      // Determinamos dirección comparando lastScrollY con prevScrollY
      const direction = lastScrollY > prevScrollY ? 'down' : 'up';
      const from = direction === 'down' ? '40px' : '-40px';

      // Aplicamos la animación desde la dirección correspondiente
      el.style.setProperty('--translateY', from);
      void el.offsetWidth;
      el.classList.add('visible');
    } else {
      // Al salir, simplemente ocultamos el elemento
      el.classList.remove('visible');
    }
  });

  // Guardamos la posición previa para la próxima comparación
  prevScrollY = lastScrollY;
}, {
  threshold: 0.15 
});

// Observamos todos los elementos .fade-scroll
document.querySelectorAll('.fade-scroll').forEach(el => observer.observe(el));

// EFECTO GLOW
function activarGlow(selector) {
  const cards = document.querySelectorAll(selector);

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--glow-x", `${x}px`);
      card.style.setProperty("--glow-y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
      // Al salir, eliminamos el glow INMEDIATAMENTE
      card.style.removeProperty("--glow-x");
      card.style.removeProperty("--glow-y");
    });
  });
}

// Solo activamos glow en tarjetas de proyectos y habilidades
activarGlow(".proyecto");
activarGlow(".habilidad-tarjeta");
activarGlow(".contenedor-sobre-mi");

// Botón "volver arriba" con scroll suave
(function () {
  const btn = document.getElementById('btn-arriba');
  if (!btn) return;

  const targetEl = document.getElementById('inicio') || document.body;
  const SHOW_THRESHOLD = 320;

  // Actualiza visibilidad del botón según scroll
  function updateButtonVisibility() {
    if (window.scrollY > SHOW_THRESHOLD) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }

  // Scroll suave hacia el elemento objetivo
  function scrollToTop() {
    if (targetEl && typeof targetEl.scrollIntoView === 'function') {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Escucha eventos de scroll
  window.addEventListener('scroll', updateButtonVisibility, { passive: true });

  // Click en el botón
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    scrollToTop();
    const focusTarget = document.getElementById('inicio') || document.body;
    if (focusTarget && focusTarget !== document.body) {
      const prevTabIndex = focusTarget.getAttribute('tabindex');
      focusTarget.setAttribute('tabindex', '-1');
      focusTarget.focus({ preventScroll: true });
      if (prevTabIndex === null) {
        window.setTimeout(() => focusTarget.removeAttribute('tabindex'), 1000);
      } else {
        focusTarget.setAttribute('tabindex', prevTabIndex);
      }
    }
  });

  // Accesibilidad: activar con Espacio
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });
  window.addEventListener('load', () => {
    btn.classList.remove('show');
  });
 

  // detecta cuando el último section está fuera de vista
  const lastSection = document.querySelector('section:last-of-type');
  if (lastSection && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) {
          btn.classList.add('show');
        } else {
          if (window.scrollY <= SHOW_THRESHOLD) btn.classList.remove('show');
        }
      });
    }, { threshold: 0.15 });
    io.observe(lastSection);
  }

})();