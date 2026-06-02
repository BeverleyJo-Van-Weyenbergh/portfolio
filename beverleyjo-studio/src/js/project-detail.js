import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../scss/main.scss';
import './darkmode.js';
import './i18n.js';
import './animations.js';
import { PROJECTS } from '../data/projects.js';
import { t, projectField } from './i18n.js';

const slug    = new URLSearchParams(window.location.search).get('slug');
const project = PROJECTS.find(p => p.slug === slug);
const detail  = document.getElementById('projectDetail');

const isVideo = src => /\.mp4$/i.test(src);
const galleryItems = project ? project.images.filter(Boolean) : [];

const externalArrow = `<svg class="c-detail__link-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="1" y1="10" x2="10" y2="1"/><polyline points="4,1 10,1 10,7"/></svg>`;

function linkLabel(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host.includes('chromewebstore')) return 'Chrome Web Store';
    const parts = u.pathname.replace(/\/$/, '').split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    if (!last) return host;
    return last.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  } catch { return t('detail.live'); }
}

function renderContent() {
  if (!project) {
    detail.innerHTML = `
      <div class="c-detail__not-found container">
        <a class="c-detail__back" href="/#projecten">${t('detail.back')}</a>
        <h1 class="c-detail__title">${t('detail.not-found-title')}</h1>
        <p>${t('detail.not-found-desc')}</p>
      </div>`;
    return;
  }

  document.title = `${projectField(project, 'name')} — Beverley-Jo Studio`;

  const tagsHtml = project.tags
    .map(tag => `<span class="c-projects__card-tag c-projects__card-tag--${tag}">${t('tag.' + tag)}</span>`)
    .join('');

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
        <p class="c-detail__gallery-label">${t('detail.gallery')}</p>
        <div class="c-detail__gallery" id="detailGallery">
          ${galleryItems.map((src, i) => isVideo(src)
            ? `<div class="c-detail__gallery-item c-detail__gallery-item--video" data-index="${i}">
                 <video class="c-detail__gallery-video" src="${src}" muted loop playsinline></video>
                 <span class="c-detail__play-btn" aria-hidden="true">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                 </span>
               </div>`
            : `<div class="c-detail__gallery-item" data-index="${i}">
                 <img class="c-detail__gallery-img" src="${src}" alt="${projectField(project, 'name')} ${i + 1}" loading="lazy">
               </div>`
          ).join('')}
        </div>
       </div>`
    : '';

  const metaRowHtml = `
    <div class="c-detail__meta-row">
      ${project.role ? `<div class="c-detail__meta-item"><span class="c-detail__meta-label">${t('detail.role')}</span><span class="c-detail__meta-value">${projectField(project, 'role')}</span></div>` : ''}
      ${project.tools?.length ? `<div class="c-detail__meta-item"><span class="c-detail__meta-label">${t('detail.tools')}</span><span class="c-detail__meta-value">${project.tools.map(tool => `<span class="c-detail__tool">${tool}</span>`).join('')}</span></div>` : ''}
    </div>`;

  detail.innerHTML = `
    <div class="c-detail__body container">
      <a class="c-detail__back" href="/#projecten">${t('detail.back')}</a>

      <div class="c-detail__header">
        <div class="c-detail__meta">
          <div class="c-projects__card-tags">${tagsHtml}</div>
          <h1 class="c-detail__title">${projectField(project, 'name')}</h1>
          <p class="c-detail__desc">${projectField(project, 'descriptionLong')}</p>
          ${metaRowHtml}
          ${linksHtml}
        </div>
        <div class="c-detail__cover">
          <img class="c-detail__cover-img" src="${project.featuredImage}" alt="${projectField(project, 'name')}">
        </div>
      </div>

      ${galleryHtml}
    </div>`;

  bindGallery();
}

function bindGallery() {
  document.getElementById('detailGallery')?.querySelectorAll('.c-detail__gallery-item').forEach(item => {
    item.addEventListener('click', () => showLightbox(+item.dataset.index));
  });

  detail.querySelectorAll('.c-detail__gallery-video').forEach(v => {
    v.parentElement.addEventListener('mouseenter', () => v.play());
    v.parentElement.addEventListener('mouseleave', () => v.pause());
  });
}

// ── LIGHTBOX ────────────────────────────────────────────
const lightbox  = document.getElementById('lightbox');
const lbMedia   = document.getElementById('lightboxMedia');
const lbClose   = document.getElementById('lightboxClose');
const lbPrev    = document.getElementById('lightboxPrev');
const lbNext    = document.getElementById('lightboxNext');
let currentIndex = 0;

function showLightbox(index) {
  currentIndex = (index + galleryItems.length) % galleryItems.length;
  const src = galleryItems[currentIndex];
  lbMedia.innerHTML = isVideo(src)
    ? `<video src="${src}" controls autoplay loop class="c-lightbox__video"></video>`
    : `<img src="${src}" alt="${project?.name}" class="c-lightbox__img">`;
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

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lbPrev.addEventListener('click', () => showLightbox(currentIndex - 1));
lbNext.addEventListener('click', () => showLightbox(currentIndex + 1));

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showLightbox(currentIndex - 1);
  if (e.key === 'ArrowRight') showLightbox(currentIndex + 1);
});

window.addEventListener('langchange', renderContent);

renderContent();
