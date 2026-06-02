const translations = {
  nl: {
    'nav.featured':      'Uitgelicht',
    'nav.about':         'Over mij',
    'nav.projects':      'Projecten',
    'nav.contact':       'Contact',
    'nav.cv':            'Bekijk CV',

    'hero.title':        'Design dat werkt,<br><em class="c-heading__title--em">code die telt.</em>',
    'hero.subtitle':     'Creatieve developer uit België die esthetiek en techniek combineert tot digitale ervaringen die écht blijven hangen.',
    'hero.cta-primary':  'Bekijk mijn werk',
    'hero.cta-secondary':'Neem contact op',

    'services.heading':       'Mijn services',
    'services.ux.title':      'UI & UX Design',
    'services.ux.desc':       'Van wireframe tot afgewerkt ontwerp. Ik maak interfaces die er goed uitzien én prettig werken.',
    'services.dev.title':     'Web development',
    'services.dev.desc':      'Snelle, toegankelijke websites en applicaties gebouwd met moderne technologieën.',
    'services.visual.title':  'Visueel ontwerp',
    'services.visual.desc':   'Grafisch ontwerp, video en social media content. Van visitekaartje tot promovideo, van print tot reels.',

    'featured.heading': 'Uitgelichte projecten',
    'featured.cta':     'Project bekijken',

    'about.heading':     'Creatief,<br><em>technisch,</em><br>gedreven.',
    'about.bio':         'Ik ben Beverley-Jo, een creatieve front-end developer en designer uit België. Ik hou van projecten waarbij esthetiek en techniek samenkomen. Van een strakke interface tot een social media post of een korte promovideo. Die brede mix is precies wat me anders maakt. Of het nu voor een lokale ondernemer is, een tech-startup of een eigen project — ik gooi er altijd honderd procent in.',
    'about.tech-skills': 'Technische skills',
    'about.soft-skills': 'Soft skills',

    'projects.heading':       'Alle projecten',
    'projects.filter-all':    'Alles',
    'projects.filter-school': 'School',
    'projects.filter-stage':  'Stage',
    'projects.filter-eigen':  'Eigen project',
    'projects.cta':           'Project bekijken',

    'contact.heading':           'Laten we<br><em>samenwerken.</em>',
    'contact.sub':               'Heb je een project in gedachten of wil je gewoon even kennismaken? Ik hoor graag van je.',
    'contact.name':              'Naam',
    'contact.email':             'E-mail',
    'contact.message':           'Bericht',
    'contact.placeholder-name':  'Jouw naam',
    'contact.placeholder-email': 'jouw@email.be',
    'contact.placeholder-msg':   'Vertel me over je project...',
    'contact.submit':            'Verstuur bericht',
    'contact.sending':           'Bezig met verzenden…',
    'contact.success':           'Bedankt! Ik neem zo snel mogelijk contact met je op.',
    'contact.error':             'Er ging iets mis. Probeer het opnieuw of mail me rechtstreeks.',

    'footer.copy': '© 2026 Beverley Jo Studio. Alle rechten voorbehouden.',

    'detail.back':            '← Terug naar projecten',
    'detail.gallery':         'Beelden',
    'detail.role':            'Rol',
    'detail.tools':           'Tools',
    'detail.not-found-title': 'Project niet gevonden.',
    'detail.not-found-desc':  'Het project dat je zoekt bestaat niet of is verwijderd.',
    'detail.live':            'Bekijk live',

    'tag.school':        'School',
    'tag.stage':         'Stage',
    'tag.eigen project': 'Eigen project',
  },

  en: {
    'nav.featured':      'Featured',
    'nav.about':         'About',
    'nav.projects':      'Projects',
    'nav.contact':       'Contact',
    'nav.cv':            'View CV',

    'hero.title':        'Design that works,<br><em class="c-heading__title--em">code that counts.</em>',
    'hero.subtitle':     'Creative developer from Belgium combining aesthetics and technology to build digital experiences that truly resonate.',
    'hero.cta-primary':  'View my work',
    'hero.cta-secondary':'Get in touch',

    'services.heading':       'My services',
    'services.ux.title':      'UI & UX Design',
    'services.ux.desc':       'From wireframe to finished design. I create interfaces that look great and feel intuitive.',
    'services.dev.title':     'Web development',
    'services.dev.desc':      'Fast, accessible websites and applications built with modern technologies.',
    'services.visual.title':  'Visual design',
    'services.visual.desc':   'Graphic design, video and social media content. From business card to promo video, from print to reels.',

    'featured.heading': 'Featured projects',
    'featured.cta':     'View project',

    'about.heading':     'Creative,<br><em>technical,</em><br>driven.',
    'about.bio':         "I'm Beverley-Jo, a creative front-end developer and designer from Belgium. I love projects where aesthetics and technology come together, from a sleek interface to a social media post or a short promo video. That broad mix is exactly what sets me apart. Whether it's for a local entrepreneur, a tech startup or a personal project. I always give it a hundred percent.",
    'about.tech-skills': 'Technical skills',
    'about.soft-skills': 'Soft skills',

    'projects.heading':       'All projects',
    'projects.filter-all':    'All',
    'projects.filter-school': 'School',
    'projects.filter-stage':  'Internship',
    'projects.filter-eigen':  'Personal project',
    'projects.cta':           'View project',

    'contact.heading':           "Let's<br><em>collaborate.</em>",
    'contact.sub':               "Have a project in mind or just want to say hello? I'd love to hear from you.",
    'contact.name':              'Name',
    'contact.email':             'E-mail',
    'contact.message':           'Message',
    'contact.placeholder-name':  'Your name',
    'contact.placeholder-email': 'your@email.com',
    'contact.placeholder-msg':   'Tell me about your project...',
    'contact.submit':            'Send message',
    'contact.sending':           'Sending…',
    'contact.success':           "Thank you! I'll get back to you as soon as possible.",
    'contact.error':             'Something went wrong. Please try again or email me directly.',

    'footer.copy': '© 2026 Beverley Jo Studio. All rights reserved.',

    'detail.back':            '← Back to projects',
    'detail.gallery':         'Images',
    'detail.role':            'Role',
    'detail.tools':           'Tools',
    'detail.not-found-title': 'Project not found.',
    'detail.not-found-desc':  "The project you're looking for doesn't exist or has been removed.",
    'detail.live':            'View live',

    'tag.school':        'School',
    'tag.stage':         'Internship',
    'tag.eigen project': 'Personal project',
  },
};

let currentLang = localStorage.getItem('lang') || 'nl';

export function t(key) {
  return translations[currentLang]?.[key] ?? translations.nl[key] ?? key;
}

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  updateCvLinks();
  updateSwitcher();
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function projectField(project, field) {
  if (currentLang === 'en' && project[`${field}_en`]) return project[`${field}_en`];
  return project[field];
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

function updateCvLinks() {
  const href = currentLang === 'en' ? '/cv-en.pdf' : '/cv.pdf';
  document.querySelectorAll('#cvLink, #cvLinkMobile').forEach(el => {
    el.href = href;
  });
}

function updateSwitcher() {
  document.querySelectorAll('.c-lang__btn').forEach(btn => {
    btn.classList.toggle('c-lang__btn--active', btn.dataset.lang === currentLang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  applyTranslations();
  updateCvLinks();
  updateSwitcher();

  document.querySelectorAll('.c-lang__btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
