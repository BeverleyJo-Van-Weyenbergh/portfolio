let body, toggle;
const init = function () {
  body = document.body;
  toggle = document.querySelector('.js-toggle');
  toggle.addEventListener('change', function () {
    toggleDarkmode();
    saveToLocalStorage();
  });

  if (localStorage.getItem('darkMode')) {
    if (localStorage.getItem('darkMode') == 'dark') {
      toggle.checked = true;
      toggleDarkmode();
    }
  } else if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
    toggle.checked = true;
    toggleDarkmode();
  }
};
document.addEventListener('DOMContentLoaded', init);

const toggleDarkmode = function () {
  console.log('listentoggle');
  body.classList.toggle('o-darkmode');
};

const saveToLocalStorage = function () {
  const toggleScheme = toggle.checked ? 'dark' : 'light';
  localStorage.setItem('darkMode', toggleScheme);
};
