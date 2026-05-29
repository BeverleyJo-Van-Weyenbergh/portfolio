const FORMSPREE_URL = 'https://formspree.io/f/mredjwwj';

const form        = document.getElementById('contactForm');
const submitBtn   = form.querySelector('.c-contact__submit');
const textSpan    = form.querySelector('.c-contact__submit-text');
const sendingSpan = form.querySelector('.c-contact__submit-sending');
const successMsg  = form.querySelector('.c-contact__feedback--success');
const errorMsg    = form.querySelector('.c-contact__feedback--error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  successMsg.hidden  = true;
  errorMsg.hidden    = true;
  textSpan.hidden    = true;
  sendingSpan.hidden = false;
  submitBtn.disabled = true;

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      successMsg.hidden = false;
      form.reset();
    } else {
      errorMsg.hidden = false;
    }
  } catch {
    errorMsg.hidden = false;
  } finally {
    textSpan.hidden    = false;
    sendingSpan.hidden = true;
    submitBtn.disabled = false;
  }
});
