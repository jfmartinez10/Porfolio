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