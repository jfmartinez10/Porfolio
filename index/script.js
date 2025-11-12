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