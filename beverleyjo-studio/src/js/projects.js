import { PROJECTS } from '../data/projects.js';
import { t, getLang, projectField } from './i18n.js';

const PER_PAGE = 6;

const grid    = document.getElementById('projectsGrid');
const prevBtn = document.getElementById('projectsPrev');
const nextBtn = document.getElementById('projectsNext');
const pagesEl = document.getElementById('projectsPages');

let currentFilter = 'all';
let currentPage   = 1;

function filtered() {
  if (currentFilter === 'all') return PROJECTS;
  return PROJECTS.filter(p => p.tags.includes(currentFilter));
}

function render(direction = 'none') {
  const items      = filtered();
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;

  const pageItems = items.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  grid.innerHTML = '';
  pageItems.forEach((project, i) => {
    const pos  = i + 1;
    const card = document.createElement('div');
    card.className = 'c-projects__card';
    card.dataset.pos = pos;
    card.style.animationDelay = `${i * 0.07}s`;
    if (direction === 'next')      card.classList.add('c-projects__card--in-right');
    else if (direction === 'prev') card.classList.add('c-projects__card--in-left');
    else                           card.classList.add('c-projects__card--in-up');

    const name = projectField(project, 'name');

    card.innerHTML = `
      <a href="./project.html?slug=${project.slug}" class="c-projects__card-link">
        <div class="c-projects__card-img" style="background-image: url('${project.featuredImage}')"></div>
        <div class="c-projects__card-body">
          <div class="c-projects__card-tags">
            ${project.tags.map(tag => `<span class="c-projects__card-tag c-projects__card-tag--${tag}">${t('tag.' + tag)}</span>`).join('')}
          </div>
          <h3 class="c-projects__card-name">${name}</h3>
          <span class="c-projects__card-cta">${t('projects.cta')} <span class="c-projects__card-arrow">→</span></span>
        </div>
      </a>`;
    grid.appendChild(card);
  });

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  pagesEl.innerHTML = '';
  for (let p = 1; p <= totalPages; p++) {
    const dot = document.createElement('button');
    dot.className  = 'c-projects__pag-dot' + (p === currentPage ? ' c-projects__pag-dot--active' : '');
    dot.textContent = p;
    dot.addEventListener('click', () => {
      if (p !== currentPage) {
        const dir = p > currentPage ? 'next' : 'prev';
        currentPage = p;
        render(dir);
      }
    });
    pagesEl.appendChild(dot);
  }
}

document.querySelectorAll('.c-projects__filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.c-projects__filter').forEach(b => b.classList.remove('c-projects__filter--active'));
    btn.classList.add('c-projects__filter--active');
    currentFilter = btn.dataset.filter;
    currentPage   = 1;
    render('up');
  });
});

function scrollToSection() {
  document.getElementById('projecten')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) { currentPage--; render('prev'); scrollToSection(); }
});
nextBtn.addEventListener('click', () => {
  const total = Math.ceil(filtered().length / PER_PAGE);
  if (currentPage < total) { currentPage++; render('next'); scrollToSection(); }
});

window.addEventListener('langchange', () => render());

render();
