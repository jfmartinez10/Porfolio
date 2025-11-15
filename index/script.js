// --- SISTEMA DE MENÚ Y TEXTO ANIMADO --- //
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

// --- SISTEMA DE PARTÍCULAS --- //
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