// Langue FR / EN (mémorisée dans le navigateur)
const root = document.documentElement;

function setLang(lang) {
  root.lang = lang;
  document.title = lang === 'fr'
    ? 'Mohamed BEJI | Étudiant BTS SIO SLAM'
    : 'Mohamed BEJI | BTS SIO Software Development Student';
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) {}
if (saved === 'fr' || saved === 'en') setLang(saved);

document.getElementById('lang-toggle').addEventListener('click', () => {
  setLang(root.lang === 'fr' ? 'en' : 'fr');
});

// Menu mobile
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// Apparition des éléments au défilement
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.querySelectorAll('.bar').forEach(bar => bar.classList.add('on'));
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();
