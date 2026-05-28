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
    ghost.style.boxSizing = 'border-box';
    ghost.style.overflow = 'hidden';
    document.body.appendChild(ghost);
    return ghost;
  };

  const animateSwap = (currentFeaturedItem, nextItem) => {
    if (isAnimating) return;
    isAnimating = true;

    const currentStartRect = currentFeaturedItem.getBoundingClientRect();
    const nextStartRect = nextItem.getBoundingClientRect();
    const nextSlotClass = getSlotClass(nextItem);

    const currentGhost = createGhost(currentFeaturedItem, currentStartRect);
    const nextGhost = createGhost(nextItem, nextStartRect);

    currentFeaturedItem.style.visibility = 'hidden';
    nextItem.style.visibility = 'hidden';

    let cleanedUp = false;
    const finalizeSwap = () => {
      setSlotClass(currentFeaturedItem, nextSlotClass);
      setSlotClass(nextItem, 'c-featured__item--slot-featured');

      currentFeaturedItem.classList.remove(featuredClass);
      currentFeaturedItem.classList.remove(revealClass);
      nextItem.classList.add(featuredClass);
      nextItem.classList.add(revealClass);

      currentFeaturedItem.style.visibility = '';
      nextItem.style.visibility = '';
      isAnimating = false;
    };

    const cleanup = () => {
      if (cleanedUp) return;
      cleanedUp = true;

      currentGhost.removeEventListener('transitionend', cleanup);
      nextGhost.removeEventListener('transitionend', cleanup);
      currentGhost.removeEventListener('transitioncancel', cleanup);
      nextGhost.removeEventListener('transitioncancel', cleanup);
      window.clearTimeout(cleanupTimer);
      currentGhost.remove();
      nextGhost.remove();
      finalizeSwap();
    };

    const transitionValue =
      'left 0.45s cubic-bezier(0.22, 1, 0.36, 1), top 0.45s cubic-bezier(0.22, 1, 0.36, 1), width 0.45s cubic-bezier(0.22, 1, 0.36, 1), height 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, filter 0.35s ease';

    const cleanupTimer = window.setTimeout(cleanup, 700);

    requestAnimationFrame(() => {
      currentGhost.style.transition = transitionValue;
      nextGhost.style.transition = transitionValue;

      currentGhost.style.left = `${nextStartRect.left}px`;
      currentGhost.style.top = `${nextStartRect.top}px`;
      currentGhost.style.width = `${nextStartRect.width}px`;
      currentGhost.style.height = `${nextStartRect.height}px`;
      currentGhost.style.boxShadow = getComputedStyle(nextItem).boxShadow;

      nextGhost.style.left = `${currentStartRect.left}px`;
      nextGhost.style.top = `${currentStartRect.top}px`;
      nextGhost.style.width = `${currentStartRect.width}px`;
      nextGhost.style.height = `${currentStartRect.height}px`;
      nextGhost.style.boxShadow =
        getComputedStyle(currentFeaturedItem).boxShadow;
    });

    currentGhost.addEventListener('transitionend', cleanup);
    nextGhost.addEventListener('transitionend', cleanup);
    currentGhost.addEventListener('transitioncancel', cleanup);
    nextGhost.addEventListener('transitioncancel', cleanup);
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
