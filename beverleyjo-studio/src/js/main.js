import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../scss/main.scss';
import './darkmode.js';
import './i18n.js';
import './carousel.js';
import './animations.js';
import './projects.js';

const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('is-visible', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
