const PROJECTS = [
  { id: 1, name: 'E-commerce redesign',   img: './honing-visite.jpg', tags: ['stage'], link: '#' },
  { id: 2, name: 'Portfolio website',     img: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg', tags: ['eigen'], link: '#' },
  { id: 3, name: 'Brand identity systeem',img: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/rdr-2.jpg',   tags: ['school'], link: '#' },
  { id: 4, name: 'Dashboard UI kit',      img: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/pubg.jpg',    tags: ['stage'], link: '#' },
  { id: 5, name: 'Mobile app concept',    img: './honing-visite.jpg', tags: ['school'], link: '#' },
  { id: 6, name: 'WordPress platform',    img: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg', tags: ['eigen'], link: '#' },
  { id: 7, name: 'Social media campagne', img: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/rdr-2.jpg',   tags: ['school'], link: '#' },
  { id: 8, name: 'Webshop redesign',      img: 'https://www.yudiz.com/codepen/expandable-animated-card-slider/pubg.jpg',    tags: ['stage'], link: '#' },
  { id: 9, name: 'Logo & huisstijl',      img: './honing-visite.jpg', tags: ['eigen'], link: '#' },
];

const TAG_LABELS = { school: 'School', stage: 'Stage', eigen: 'Eigen project', ux: 'UX Design', dev: 'Development', brand: 'Branding' };
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

    card.innerHTML = `
      <a href="${project.link}" class="c-projects__card-link">
        <div class="c-projects__card-img" style="background-image: url('${project.img}')"></div>
        <div class="c-projects__card-body">
          <div class="c-projects__card-tags">
            ${project.tags.map(t => `<span class="c-projects__card-tag c-projects__card-tag--${t}">${TAG_LABELS[t] || t}</span>`).join('')}
          </div>
          <h3 class="c-projects__card-name">${project.name}</h3>
          <span class="c-projects__card-cta">Project bekijken <span class="c-projects__card-arrow">→</span></span>
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

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) { currentPage--; render('prev'); }
});
nextBtn.addEventListener('click', () => {
  const t = Math.ceil(filtered().length / PER_PAGE);
  if (currentPage < t) { currentPage++; render('next'); }
});

render();
