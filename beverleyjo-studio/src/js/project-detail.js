import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../scss/main.scss';
import './darkmode.js';
import './animations.js';
import { PROJECTS, TAG_LABELS } from '../data/projects.js';

const slug = new URLSearchParams(window.location.search).get('slug');
const project = PROJECTS.find(p => p.slug === slug);

const detail = document.getElementById('projectDetail');

if (!project) {
  detail.innerHTML = `
    <div class="c-detail__not-found container">
      <a class="c-detail__back" href="/#projecten">← Terug naar projecten</a>
      <h1 class="c-detail__title">Project niet gevonden.</h1>
      <p>Het project dat je zoekt bestaat niet of is verwijderd.</p>
    </div>`;
} else {
  document.title = `${project.name} — Beverley-Jo Studio`;

  const isVideo = src => /\.mp4$/i.test(src);

  const galleryItems = project.images.filter(Boolean);

  function linkLabel(url) {
    try {
      const u = new URL(url);
      const host = u.hostname.replace(/^www\./, '');
      if (host.includes('chromewebstore')) return 'Chrome Web Store';
      const parts = u.pathname.replace(/\/$/, '').split('/').filter(Boolean);
      const last = parts[parts.length - 1];
      if (!last) return host;
      return last.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    } catch { return 'Bekijk live'; }
  }

  const tagsHtml = project.tags
    .map(t => `<span class="c-projects__card-tag c-projects__card-tag--${t}">${TAG_LABELS[t] || t}</span>`)
    .join('');

  const externalArrow = `<svg class="c-detail__link-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="1" y1="10" x2="10" y2="1"/><polyline points="4,1 10,1 10,7"/></svg>`;

  const linksHtml = project.links.length
    ? `<div class="c-detail__links">
        ${project.links.map(l => `
          <a class="c-btn c-btn--secondary c-detail__link" href="${l}" target="_blank" rel="noopener">
            ${linkLabel(l)} ${externalArrow}
          </a>`).join('')}
       </div>`
    : '';

  const galleryHtml = galleryItems.length > 0
    ? `<div class="c-detail__gallery-section">
        <p class="c-detail__gallery-label">Beelden</p>
        <div class="c-detail__gallery" id="detailGallery">
          ${galleryItems.map((src, i) => isVideo(src)
            ? `<div class="c-detail__gallery-item" data-index="${i}">
                 <video class="c-detail__gallery-video" src="${src}" muted loop playsinline></video>
               </div>`
            : `<div class="c-detail__gallery-item" data-index="${i}">
                 <img class="c-detail__gallery-img" src="${src}" alt="${project.name} afbeelding ${i + 1}" loading="lazy">
               </div>`
          ).join('')}
        </div>
       </div>`
    : '';

  const metaRowHtml = `
    <div class="c-detail__meta-row">
      ${project.role ? `<div class="c-detail__meta-item"><span class="c-detail__meta-label">Rol</span><span class="c-detail__meta-value">${project.role}</span></div>` : ''}
      ${project.tools?.length ? `<div class="c-detail__meta-item"><span class="c-detail__meta-label">Tools</span><span class="c-detail__meta-value">${project.tools.map(t => `<span class="c-detail__tool">${t}</span>`).join('')}</span></div>` : ''}
    </div>`;

  detail.innerHTML = `
    <div class="c-detail__body container">
      <a class="c-detail__back" href="/#projecten">← Terug naar projecten</a>

      <div class="c-detail__header">
        <div class="c-detail__meta">
          <div class="c-projects__card-tags">${tagsHtml}</div>
          <h1 class="c-detail__title">${project.name}</h1>
          <p class="c-detail__desc">${project.descriptionLong}</p>
          ${metaRowHtml}
          ${linksHtml}
        </div>
        <div class="c-detail__cover">
          <img class="c-detail__cover-img" src="${project.featuredImage}" alt="${project.name}">
        </div>
      </div>

      ${galleryHtml}
    </div>`;

  // Lightbox
  const lightbox   = document.getElementById('lightbox');
  const lbMedia    = document.getElementById('lightboxMedia');
  const lbClose    = document.getElementById('lightboxClose');
  const lbPrev     = document.getElementById('lightboxPrev');
  const lbNext     = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function showLightbox(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const src = galleryItems[currentIndex];
    lbMedia.innerHTML = isVideo(src)
      ? `<video src="${src}" controls autoplay loop class="c-lightbox__video"></video>`
      : `<img src="${src}" alt="${project.name}" class="c-lightbox__img">`;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbPrev.style.display = galleryItems.length > 1 ? '' : 'none';
    lbNext.style.display = galleryItems.length > 1 ? '' : 'none';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbMedia.innerHTML = '';
  }

  document.getElementById('detailGallery')?.querySelectorAll('.c-detail__gallery-item').forEach(item => {
    item.addEventListener('click', () => showLightbox(+item.dataset.index));
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lbPrev.addEventListener('click', () => showLightbox(currentIndex - 1));
  lbNext.addEventListener('click', () => showLightbox(currentIndex + 1));

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showLightbox(currentIndex - 1);
    if (e.key === 'ArrowRight')  showLightbox(currentIndex + 1);
  });

  // Play gallery videos on hover
  detail.querySelectorAll('.c-detail__gallery-video').forEach(v => {
    v.parentElement.addEventListener('mouseenter', () => v.play());
    v.parentElement.addEventListener('mouseleave', () => v.pause());
  });
}
