/* ===== Language Switcher ===== */
const i18n = {
  en: {
    'nav.biography': 'Biography',
    'nav.media': 'Media',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'bio.title': 'Biography',
    'media.title': 'Media',
    'media.videos': 'Videos',
    'media.press': 'Press',
    'gallery.title': 'Gallery',
    'contact.title': 'Contact'
  },
  de: {
    'nav.biography': 'Biografie',
    'nav.media': 'Medien',
    'nav.gallery': 'Galerie',
    'nav.contact': 'Kontakt',
    'bio.title': 'Biografie',
    'media.title': 'Medien',
    'media.videos': 'Videos',
    'media.press': 'Presse',
    'gallery.title': 'Galerie',
    'contact.title': 'Kontakt'
  },
  ko: {
    'nav.biography': '약력',
    'nav.media': '미디어',
    'nav.gallery': '갤러리',
    'nav.contact': '연락처',
    'bio.title': '약력',
    'media.title': '미디어',
    'media.videos': '영상',
    'media.press': '보도',
    'gallery.title': '갤러리',
    'contact.title': '연락처'
  }
};

function setLanguage(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);

  // Update i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('rirakim-lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Restore saved language
const savedLang = localStorage.getItem('rirakim-lang');
if (savedLang && ['en', 'de', 'ko'].includes(savedLang)) {
  setLanguage(savedLang);
}


/* ===== Mobile Navigation ===== */
const hamburger = document.querySelector('.nav__hamburger');
const navMenu = document.querySelector('.nav__menu');

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu on link click
navMenu.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});


/* ===== Transparent Nav on Hero ===== */
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

function updateNav() {
  const heroBottom = hero.offsetHeight - 100;
  if (window.scrollY < heroBottom) {
    nav.classList.add('nav--transparent');
  } else {
    nav.classList.remove('nav--transparent');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();


/* ===== Active Nav Highlight ===== */
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav__link');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  threshold: 0.2,
  rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-height')} 0px -40% 0px`
});

sections.forEach(s => navObserver.observe(s));


/* ===== Scroll-Triggered Fade-In ===== */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(s => fadeObserver.observe(s));


/* ===== Gallery Lightbox ===== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__img');
const lightboxClose = lightbox.querySelector('.lightbox__close');

document.querySelectorAll('[data-lightbox]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    lightboxImg.src = item.href;
    lightboxImg.alt = item.querySelector('img').alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
