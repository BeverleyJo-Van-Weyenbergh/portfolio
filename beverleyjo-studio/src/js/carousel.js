import { PROJECTS } from '../data/projects.js';

// ── FEATURED CARD SWAP (FLIP ghost animation) ─────────
const FEATURED_SLOT = 'c-featured__item--slot-featured';
const FEATURED_MOD  = 'c-featured__item--featured';
const REVEAL_MOD    = 'c-featured__item--reveal';
const SLOTS         = ['slot-featured', 'slot-top', 'slot-mid', 'slot-bottom'];

function getSlot(el) {
  for (const s of SLOTS) {
    if (el.classList.contains(`c-featured__item--${s}`)) return s;
  }
  return null;
}

function swapCards(clickedItem) {
  const grid    = document.querySelector('.c-featured__grid');
  if (!grid) return;

  const featured = grid.querySelector(`.${FEATURED_SLOT}`);
  if (!featured || clickedItem === featured) return;

  // 1. Record positions BEFORE swap (FLIP: First)
  const featRect   = featured.getBoundingClientRect();
  const clickRect  = clickedItem.getBoundingClientRect();

  // 2. Swap slot classes
  const featSlot   = getSlot(featured);
  const clickSlot  = getSlot(clickedItem);

  featured.classList.remove(`c-featured__item--${featSlot}`);
  featured.classList.add(`c-featured__item--${clickSlot}`);
  featured.classList.remove(FEATURED_SLOT, FEATURED_MOD, REVEAL_MOD);

  clickedItem.classList.remove(`c-featured__item--${clickSlot}`);
  clickedItem.classList.add(FEATURED_SLOT, FEATURED_MOD, REVEAL_MOD);

  // 3. Record positions AFTER swap (FLIP: Last)
  const featRectAfter  = featured.getBoundingClientRect();
  const clickRectAfter = clickedItem.getBoundingClientRect();

  // Freeze CSS transitions on both items so box-shadow/transform don't interfere
  featured.style.transition    = 'none';
  clickedItem.style.transition = 'none';

  // 4. Create ghost clones at old positions (FLIP: Invert)
  function makeGhost(el, from, to) {
    const ghost = el.cloneNode(true);
    ghost.style.cssText = `
      position: fixed;
      left: ${from.left}px;
      top: ${from.top}px;
      width: ${from.width}px;
      height: ${from.height}px;
      margin: 0;
      pointer-events: none;
      z-index: 999;
      border-radius: 16px;
      background-image: ${getComputedStyle(el).backgroundImage};
      background-size: cover;
      background-position: center;
      transition: left 0.52s cubic-bezier(0.22,1,0.36,1),
                  top  0.52s cubic-bezier(0.22,1,0.36,1),
                  width  0.52s cubic-bezier(0.22,1,0.36,1),
                  height 0.52s cubic-bezier(0.22,1,0.36,1);
    `;
    document.body.appendChild(ghost);

    // Hide the real element while ghost animates
    el.style.opacity = '0';

    // Animate ghost to new position (FLIP: Play)
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ghost.style.left   = `${to.left}px`;
      ghost.style.top    = `${to.top}px`;
      ghost.style.width  = `${to.width}px`;
      ghost.style.height = `${to.height}px`;
    }));

    return ghost;
  }

  const ghostFeat  = makeGhost(featured,     featRect,  featRectAfter);
  const ghostClick = makeGhost(clickedItem,  clickRect, clickRectAfter);

  // 5. After animation: restore opacity, re-enable transitions, remove ghosts
  setTimeout(() => {
    featured.style.transition    = '';
    clickedItem.style.transition = '';
    featured.style.opacity    = '';
    clickedItem.style.opacity = '';
    ghostFeat.remove();
    ghostClick.remove();
  }, 560);
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.c-featured__grid');
  if (!grid) return;

  // ── RENDER FEATURED FROM DATA ──────────────────────────
  const featured = PROJECTS.filter(p => p.featured).slice(0, 4);
  const slots = ['slot-featured', 'slot-top', 'slot-mid', 'slot-bottom'];

  featured.forEach((project, i) => {
    const item = document.createElement('div');
    item.className = `c-featured__item c-featured__item--${slots[i]}`;
    if (i === 0) item.classList.add('c-featured__item--featured', 'c-featured__item--reveal', 'c-featured__item--slot-featured');
    item.style.backgroundImage = `url('${project.featuredImage}')`;
    item.innerHTML = `
      <div class="c-featured__desc">
        <h3>${project.name}</h3>
        <p>${project.descriptionShort}</p>
        <a href="./project.html?slug=${project.slug}" class="c-featured__link">Project bekijken <span class="c-featured__arrow">→</span></a>
      </div>`;
    grid.appendChild(item);
  });

  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.c-featured__item');
    if (!item) return;
    if (!item.classList.contains(FEATURED_SLOT)) {
      swapCards(item);
    }
  });
});
