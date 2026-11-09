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
    'contact.title': 'Contact',
    'bio.more': 'Read more',
    'bio.less': 'Show less',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.sending': 'Sending…',
    'contact.success': 'Thank you — your message has been sent.',
    'contact.error': 'Something went wrong. Please write directly to the email address below.',
    'contact.autoresponse': 'Thank you for your message. I have received it and will get back to you as soon as possible.\n\nRira Kim\nrirakim.com'
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
    'contact.title': 'Kontakt',
    'bio.more': 'Mehr lesen',
    'bio.less': 'Weniger anzeigen',
    'contact.name': 'Name',
    'contact.email': 'E-Mail',
    'contact.message': 'Nachricht',
    'contact.send': 'Senden',
    'contact.sending': 'Wird gesendet…',
    'contact.success': 'Vielen Dank — Ihre Nachricht wurde gesendet.',
    'contact.error': 'Etwas ist schiefgelaufen. Bitte schreiben Sie direkt an die untenstehende E-Mail-Adresse.',
    'contact.autoresponse': 'Vielen Dank für Ihre Nachricht. Ich habe sie erhalten und melde mich so bald wie möglich bei Ihnen.\n\nRira Kim\nrirakim.com'
  },
  ko: {
    'nav.biography': '프로필',
    'nav.media': '미디어',
    'nav.gallery': '갤러리',
    'nav.contact': '연락처',
    'bio.title': '프로필',
    'media.title': '미디어',
    'media.videos': '영상',
    'media.press': '보도',
    'gallery.title': '갤러리',
    'contact.title': '연락처',
    'bio.more': '더 보기',
    'bio.less': '접기',
    'contact.name': '이름',
    'contact.email': '이메일',
    'contact.message': '메시지',
    'contact.send': '보내기',
    'contact.sending': '보내는 중…',
    'contact.success': '감사합니다. 메시지가 전송되었습니다.',
    'contact.error': '전송에 실패했습니다. 아래 이메일 주소로 직접 연락해 주세요.',
    'contact.autoresponse': '메시지 감사합니다. 잘 받았으며 가능한 한 빨리 답장드리겠습니다.\n\n김리라\nrirakim.com'
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

// Restore saved language (default: German)
const savedLang = localStorage.getItem('rirakim-lang');
if (savedLang && ['en', 'de', 'ko'].includes(savedLang)) {
  setLanguage(savedLang);
} else {
  setLanguage('de');
}


function t(key) {
  const lang = document.documentElement.getAttribute('data-lang') || 'de';
  return i18n[lang][key];
}


/* ===== Biography Read More ===== */
const bioText = document.querySelector('.biography__text');
const bioToggle = document.querySelector('.biography__toggle');

bioToggle.addEventListener('click', () => {
  const expanded = bioText.classList.toggle('expanded');
  bioToggle.setAttribute('aria-expanded', expanded);
  bioToggle.setAttribute('data-i18n', expanded ? 'bio.less' : 'bio.more');
  bioToggle.textContent = t(bioToggle.getAttribute('data-i18n'));
  if (!expanded) {
    document.getElementById('biography').scrollIntoView();
  }
});


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



/* ===== Featured Interview Player ===== */
const featuredVideo = document.querySelector('.featured-video[data-video-src]');

if (featuredVideo) {
  featuredVideo.addEventListener('click', e => {
    e.preventDefault();
    const video = document.createElement('video');
    video.className = 'featured-video featured-video--playing';
    video.src = featuredVideo.dataset.videoSrc;
    video.poster = featuredVideo.querySelector('img').src;
    video.controls = true;
    video.playsInline = true;
    // Fall back to the WDR page if the stream is no longer available
    video.addEventListener('error', () => window.open(featuredVideo.href, '_blank', 'noopener'));
    featuredVideo.replaceWith(video);
    video.play().catch(() => {});
  });
}


/* ===== Contact Form ===== */
const contactForm = document.querySelector('.contact__form');
const contactStatus = contactForm.querySelector('.contact__status');
const contactSubmit = contactForm.querySelector('.contact__submit');

contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  contactSubmit.disabled = true;
  contactForm.elements._autoresponse.value = t('contact.autoresponse');
  contactStatus.textContent = t('contact.sending');
  contactStatus.className = 'contact__status';

  try {
    const res = await fetch(contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(contactForm)
    });
    const data = await res.json();
    if (!res.ok || String(data.success) !== 'true') throw new Error(data.message);
    contactForm.reset();
    contactStatus.textContent = t('contact.success');
    contactStatus.classList.add('contact__status--success');
  } catch {
    contactStatus.textContent = t('contact.error');
    contactStatus.classList.add('contact__status--error');
  } finally {
    contactSubmit.disabled = false;
  }
});