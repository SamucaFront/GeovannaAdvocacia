'use strict';

(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  onScroll();
})();

(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function toggleMenu(force) {
    const isOpen = force !== undefined ? force : !hamburger.classList.contains('open');

    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  hamburger.addEventListener('click', () => toggleMenu());

  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });

  document.addEventListener('click', e => {
    if (
      hamburger.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });
})();


(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
})();

(function initFadeAnimations() {
  const animatedEls = document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right'
  );

  if (!animatedEls.length) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    animatedEls.forEach(el => el.classList.add('visible'));
    return;
  }

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  animatedEls.forEach(el => observer.observe(el));

  const areaCards = document.querySelectorAll('.area-card');
  areaCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
  });
})();

(function initWhatsappFloat() {
  const btn = document.getElementById('whatsapp-float');
  if (!btn) return;

  let appeared = false;

  function showBtn() {
    if (!appeared) {
      btn.classList.add('show');
      appeared = true;
    }
  }

  setTimeout(showBtn, 1500);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) showBtn();
  }, { passive: true });
})();


(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) {
    el.textContent = new Date().getFullYear();
  }
})();


(function initSmoothScroll() {

  const supportsNativeSmoothScroll =
    'scrollBehavior' in document.documentElement.style;

  if (supportsNativeSmoothScroll) return; // CSS já resolve

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight || 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();


(function initHeroParallax() {
  const heroPhoto = document.querySelector('.hero__photo-frame');
  const heroBg = document.querySelector('.hero__bg');
  if (!heroPhoto || !heroBg) return;

  const mq = window.matchMedia('(min-width: 900px)');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!mq.matches || prefersReduced) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    const progress = Math.min(scrollY / maxScroll, 1);

    heroPhoto.style.transform = `translateY(${progress * 30}px)`;
    heroBg.style.transform = `translateY(${progress * 15}px)`;
  }, { passive: true });
})();


(function initCardHover() {
  const cards = document.querySelectorAll('.area-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      // Leve efeito nos cards vizinhos (dimming)
      cards.forEach(c => {
        if (c !== card) {
          c.style.opacity = '0.65';
        }
      });
    });

    card.addEventListener('mouseleave', function () {
      cards.forEach(c => {
        c.style.opacity = '';
      });
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.focus();
      }
    });
  });
})();


console.log('%cGeovanna Reges Advocacia', 'color:#C9A84C;font-family:serif;font-size:16px;font-weight:bold;');
console.log('%cSite desenvolvido com HTML, CSS e JavaScript puro.', 'color:#888;font-size:11px;');