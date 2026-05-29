// ── SCROLL REVEAL ──────────────────────────────────────
// Add data-sr to any element to fade+slide it in on scroll.
// Add data-sr-delay="0.2" to override the delay (seconds).
// Add data-sr-stagger to a parent to auto-stagger its direct children.

const SR_CLASS   = 'sr--visible';
const SR_ATTR    = 'data-sr';
const STAGGER_MS = 80;

function initScrollReveal() {
  // Mark all [data-sr-stagger] children with data-sr + auto delay
  document.querySelectorAll('[data-sr-stagger]').forEach(parent => {
    Array.from(parent.children).forEach((child, i) => {
      child.setAttribute('data-sr', '');
      if (!child.hasAttribute('data-sr-delay')) {
        child.setAttribute('data-sr-delay', (i * STAGGER_MS) / 1000);
      }
    });
  });

  const targets = document.querySelectorAll(`[${SR_ATTR}]`);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = el.dataset.srDelay || 0;
        setTimeout(() => el.classList.add(SR_CLASS), parseFloat(delay) * 1000);
        observer.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initScrollReveal);
