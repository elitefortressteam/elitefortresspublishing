// ELITE FORTRESS PUBLISHING & MARKETING
// script.js

/* LOADER */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) { loader.classList.add('hidden'); setTimeout(() => loader.remove(), 800); }
    document.querySelectorAll('.hero .fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 150);
    });
  }, 2000);
});

/* NAVBAR */
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backTop')?.classList.toggle('visible', window.scrollY > 400);
});

/* MOBILE MENU */
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('mobileMenu')?.classList.toggle('open');
});
function closeMobile() { document.getElementById('mobileMenu')?.classList.remove('open'); }

/* HERO SLIDER */
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

setInterval(() => goToSlide(currentSlide + 1), 5000);

/* SCROLL ANIMATIONS */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement?.children || []];
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
  if (!el.closest('.hero')) observer.observe(el);
});

/* COUNTER ANIMATION */
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const step = target / 80;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 20);
      countObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => countObs.observe(el));

/* PORTFOLIO FILTER */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.port-item').forEach(item => {
      const show = filter === 'all' || item.getAttribute('data-cat') === filter;
      item.style.display = show ? '' : 'none';
    });
  });
});

/* TESTIMONIAL SLIDER */
let testiIdx = 0;
function slideTesti(dir) {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.testi-card');
  const visible = window.innerWidth <= 768 ? 1 : 2;
  testiIdx = Math.max(0, Math.min(testiIdx + dir, cards.length - visible));
  const w = cards[0].offsetWidth + 20;
  track.style.transform = `translateX(-${testiIdx * w}px)`;
}
setInterval(() => {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.testi-card');
  const visible = window.innerWidth <= 768 ? 1 : 2;
  if (testiIdx >= cards.length - visible) { testiIdx = 0; track.style.transform = 'translateX(0)'; }
  else slideTesti(1);
}, 6000);

/* FAQ */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* CONTACT FORM */
function submitForm() {
  const name = document.getElementById('fname')?.value.trim();
  const email = document.getElementById('femail')?.value.trim();
  if (!name || !email) { alert('Please fill in your name and email address.'); return; }
  const phone = document.getElementById('fphone')?.value.trim();
  const country = document.getElementById('fcountry')?.value.trim();
  const book = document.getElementById('fbook')?.value.trim();
  const status = document.getElementById('fstatus')?.value;
  const service = document.getElementById('fservice')?.value;
  const budget = document.getElementById('fbudget')?.value;
  const message = document.getElementById('fmessage')?.value.trim();
  const subject = encodeURIComponent(`New Project Inquiry from ${name} — Elite Fortress`);
  const body = encodeURIComponent(`Full Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\n\nBook Title: ${book}\nPublishing Status: ${status}\nServices Needed: ${service}\nBudget: ${budget}\n\nMessage:\n${message}`);
  window.location.href = `mailto:elitefortress2@gmail.com?subject=${subject}&body=${body}`;
  const s = document.getElementById('formSuccess');
  if (s) { s.style.display = 'block'; setTimeout(() => s.style.display = 'none', 5000); }
}

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' }); }
  });
});
