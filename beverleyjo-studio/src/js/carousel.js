function initFeaturedGrid() {
  const grid = document.querySelector('.c-featured__grid');
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll('.c-featured__item'));

  const refreshItems = () =>
    Array.from(grid.querySelectorAll('.c-featured__item'));

  const animateSwap = (activeItem, nextItem) => {
    const beforeRects = new Map(
      items.map((item) => [item, item.getBoundingClientRect()]),
    );

    grid.insertBefore(nextItem, activeItem);

    const afterRects = new Map(
      items.map((item) => [item, item.getBoundingClientRect()]),
    );

    items.forEach((item) => {
      const beforeRect = beforeRects.get(item);
      const afterRect = afterRects.get(item);
      const deltaX = beforeRect.left - afterRect.left;
      const deltaY = beforeRect.top - afterRect.top;

      item.style.transition = 'none';
      item.style.transformOrigin = 'top left';
      item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      requestAnimationFrame(() => {
        item.style.transition = '';
        item.style.transform = '';
      });
    });
  };

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const currentItems = refreshItems();
      const activeItem = currentItems[0];

      currentItems.forEach((currentItem) => {
        currentItem.classList.remove('c-featured__item--active');
      });

      if (item !== activeItem) {
        animateSwap(activeItem, item);
      }

      item.classList.add('c-featured__item--active');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeaturedGrid);
} else {
  initFeaturedGrid();
}
