function initFeaturedGrid() {
  const grid = document.querySelector('.c-featured__grid');
  if (!grid) return;

  const items = Array.from(grid.querySelectorAll('.c-featured__item'));

  items.forEach((item) => {
    item.addEventListener('click', () => {
      items.forEach((currentItem) => {
        currentItem.classList.remove('c-featured__item--active');
      });

      item.classList.add('c-featured__item--active');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFeaturedGrid);
} else {
  initFeaturedGrid();
}
