function initFeaturedGrid() {
  const grid = document.querySelector('.c-featured__grid');
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll('.c-featured__item'));

  const slotClasses = [
    'c-featured__item--slot-featured',
    'c-featured__item--slot-top',
    'c-featured__item--slot-mid',
    'c-featured__item--slot-bottom',
  ];
  const featuredClass = 'c-featured__item--featured';
  const revealClass = 'c-featured__item--reveal';
  let isAnimating = false;

  const getSlotClass = (item) =>
    slotClasses.find((slotClass) => item.classList.contains(slotClass));

  const setSlotClass = (item, slotClass) => {
    slotClasses.forEach((currentSlotClass) => {
      item.classList.remove(currentSlotClass);
    });

    item.classList.add(slotClass);
  };

  const createGhost = (item, rect) => {
    const ghost = item.cloneNode(true);
    ghost.classList.add('c-featured__item--ghost');
    ghost.style.position = 'fixed';
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.margin = '0';
    ghost.style.zIndex = '20';
    ghost.style.pointerEvents = 'none';
    ghost.style.transition = 'none';
    ghost.style.transform = 'none';
    ghost.style.willChange = 'left, top, width, height';
    ghost.style.backfaceVisibility = 'hidden';
    ghost.style.contain = 'paint';
    ghost.style.borderRadius = getComputedStyle(item).borderRadius;
    ghost.style.opacity = '1';
    ghost.style.boxSizing = 'border-box';
    ghost.style.overflow = 'hidden';
    document.body.appendChild(ghost);
    return ghost;
  };

  const animateSwap = (currentFeaturedItem, nextItem) => {
    if (isAnimating) return;
    isAnimating = true;

    // Hide descriptions first so the text change does not compete with
    // the layout movement.
    currentFeaturedItem.classList.remove(revealClass);
    nextItem.classList.remove(revealClass);

    const currentStartRect = currentFeaturedItem.getBoundingClientRect();
    const nextStartRect = nextItem.getBoundingClientRect();
    const nextSlotClass = getSlotClass(nextItem);

    const currentGhost = createGhost(currentFeaturedItem, currentStartRect);
    const nextGhost = createGhost(nextItem, nextStartRect);

    currentFeaturedItem.style.opacity = '0';
    nextItem.style.opacity = '0';

    setSlotClass(currentFeaturedItem, nextSlotClass);
    setSlotClass(nextItem, 'c-featured__item--slot-featured');

    currentFeaturedItem.classList.remove(featuredClass);
    nextItem.classList.add(featuredClass);

    let cleanedUp = false;
    const finalizeSwap = () => {
      currentFeaturedItem.classList.remove(revealClass);
      nextItem.classList.add(revealClass);

      currentFeaturedItem.style.opacity = '';
      nextItem.style.opacity = '';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          currentGhost.remove();
          nextGhost.remove();
          isAnimating = false;
        });
      });
    };

    const cleanup = () => {
      if (cleanedUp) return;
      cleanedUp = true;
      window.clearTimeout(cleanupTimer);
      finalizeSwap();
    };

    const cleanupTimer = window.setTimeout(() => {
      cleanup();
    }, 560);

    requestAnimationFrame(() => {
      const currentEndRect = currentFeaturedItem.getBoundingClientRect();
      const nextEndRect = nextItem.getBoundingClientRect();

      const currentDeltaX = currentEndRect.left - currentStartRect.left;
      const currentDeltaY = currentEndRect.top - currentStartRect.top;
      const currentScaleX = currentEndRect.width / currentStartRect.width;
      const currentScaleY = currentEndRect.height / currentStartRect.height;

      const nextDeltaX = nextEndRect.left - nextStartRect.left;
      const nextDeltaY = nextEndRect.top - nextStartRect.top;
      const nextScaleX = nextEndRect.width / nextStartRect.width;
      const nextScaleY = nextEndRect.height / nextStartRect.height;

      currentGhost.style.transition =
        'left 0.55s cubic-bezier(0.22, 1, 0.36, 1), top 0.55s cubic-bezier(0.22, 1, 0.36, 1), width 0.55s cubic-bezier(0.22, 1, 0.36, 1), height 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
      nextGhost.style.transition =
        'left 0.55s cubic-bezier(0.22, 1, 0.36, 1), top 0.55s cubic-bezier(0.22, 1, 0.36, 1), width 0.55s cubic-bezier(0.22, 1, 0.36, 1), height 0.55s cubic-bezier(0.22, 1, 0.36, 1)';

      currentGhost.style.left = `${currentEndRect.left}px`;
      currentGhost.style.top = `${currentEndRect.top}px`;
      currentGhost.style.width = `${currentEndRect.width}px`;
      currentGhost.style.height = `${currentEndRect.height}px`;

      nextGhost.style.left = `${nextEndRect.left}px`;
      nextGhost.style.top = `${nextEndRect.top}px`;
      nextGhost.style.width = `${nextEndRect.width}px`;
      nextGhost.style.height = `${nextEndRect.height}px`;
    });
  };

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const currentFeaturedItem = grid.querySelector(
        '.c-featured__item--featured',
      );

      if (!currentFeaturedItem || item === currentFeaturedItem) {
        return;
      }

      animateSwap(currentFeaturedItem, item);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeaturedGrid);
} else {
  initFeaturedGrid();
}
