// Feather icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.feather) feather.replace();
});

// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (light/dark via :root class)
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  const root = document.documentElement;
  root.classList.toggle('dark');
  // Swap icon
  const isDark = root.classList.contains('dark');
  themeToggle.innerHTML = isDark ? '<i data-feather="sun"></i>' : '<i data-feather="moon"></i>';
  if (window.feather) feather.replace();
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// 3D tilt on cards
const calcTilt = (e, el) => {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  const midX = rect.width / 2, midY = rect.height / 2;
  const rotX = ((y - midY) / midY) * -6; // tilt range
  const rotY = ((x - midX) / midX) * 6;
  el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
};
document.querySelectorAll('.tilt').forEach((card) => {
  card.addEventListener('mousemove', (e) => calcTilt(e, card));
  card.addEventListener('mouseleave', () => (card.style.transform = ''));
});

// Background particles canvas (subtle)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let w, h, dots;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  dots = Array.from({ length: Math.min(120, Math.floor((w * h) / 24000)) }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  }));
}
window.addEventListener('resize', resize);
resize();

function tick() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  const links = 90; // link distance
  // move
  for (const p of dots) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    ctx.fillRect(p.x, p.y, 1.2, 1.2);
  }
  // connect
  ctx.strokeStyle = 'rgba(167,139,250,0.10)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const d = Math.hypot(dx, dy);
      if (d < links) {
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
      }
    }
  }
  ctx.stroke();
  requestAnimationFrame(tick);
}
tick();

// Fake send handler for the demo contact form
document.getElementById('sendBtn')?.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('msg').value.trim();
  const note = document.getElementById('formNote');
  if (!name || !email || !msg) {
    note.textContent = 'Please fill out all fields.';
    note.style.color = '#fca5a5';
    return;
  }
  note.textContent = 'Thanks! I will get back to you soon.';
  note.style.color = '';
});
