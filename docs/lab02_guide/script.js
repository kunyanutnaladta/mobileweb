/* ===== Canvas Logo Animation ===== */
const canvas = document.getElementById("logoCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

const logo = new Image();
logo.src = "images/KKU Guide Logo Design.png"; // ชื่อไฟล์ต้องตรง

let time = 0;

function animateLogo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  time += 0.015;                 // ความช้า (ยิ่งน้อยยิ่งช้า)
  const y = Math.sin(time) * 4;  // ระยะลอย

  ctx.drawImage(logo, 0, y, canvas.width, canvas.height);
  requestAnimationFrame(animateLogo);
}

logo.onload = animateLogo;


/* ===== Header Fade เมื่อ Scroll ===== */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const max = 300;

  const opacity = Math.max(1 - scrollY / max, 0);
  header.style.opacity = opacity;
  header.style.transform = `translateY(${scrollY * 0.25}px)`;

  if (opacity <= 0.05) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
});