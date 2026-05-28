let body, toggle, hamburgerInput, navLinks, logo;

const LOGO_LIGHT = '/logo-dark.png';
const LOGO_DARK = '/logo-light.png';

if (typeof window.$ !== 'undefined') {
  const $ = window.$;

  if ($.fn && $.fn.owlCarousel) {
    $('.c-featured__carousel').owlCarousel({
      autoWidth: true,
      loop: true,
    });
  }

  // Initialize click behavior for carousel items
  $(function () {
    $('.c-featured__carousel .item').on('click', function () {
      $('.c-featured__carousel .item').not(this).removeClass('active');
      $(this).toggleClass('active');
    });
  });
}

const init = function () {
  body = document.body;
  toggle = document.querySelector('.js-toggle');
  hamburgerInput = document.querySelector('.menu--2 input');
  navLinks = document.querySelector('.c-nav__links');
  logo = document.querySelector('.c-nav__img');

  // theme toggle
  if (toggle) {
    toggle.addEventListener('change', function () {
      toggleDarkmode();
      saveToLocalStorage();
    });
  }

  // hamburger toggle
  if (hamburgerInput && navLinks) {
    hamburgerInput.addEventListener('change', function () {
      const isOpen = hamburgerInput.checked;
      navLinks.classList.toggle('is-open', isOpen);
    });
  }

  // restore saved theme on load
  const saved = localStorage.getItem('darkMode');
  if (saved === 'dark') {
    if (toggle) toggle.checked = true;
    body.classList.add('o-darkmode');
  } else if (
    !saved &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    if (toggle) toggle.checked = true;
    body.classList.add('o-darkmode');
  }

  // always update logo on load after theme is set
  updateLogo();
};

document.addEventListener('DOMContentLoaded', init);

const toggleDarkmode = function () {
  body.classList.toggle('o-darkmode');
  updateLogo();
};

const updateLogo = function () {
  if (!logo) return;
  logo.src = body.classList.contains('o-darkmode') ? LOGO_DARK : LOGO_LIGHT;
};

const saveToLocalStorage = function () {
  const scheme = toggle && toggle.checked ? 'dark' : 'light';
  localStorage.setItem('darkMode', scheme);
};
