/* Neybras — interactions (vanilla, sans dépendance) */
(function () {
  'use strict';

  /* Année du footer */
  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }

  /* Header : état « scrolled » */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('navMenu');
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    if (burger) { burger.setAttribute('aria-expanded', 'false'); }
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMenu(); }
    });
  }

  /* Reveals au scroll — désactivés si l'utilisateur préfère moins d'animations */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* Hooks de conversion : chaque CTA [data-cta] pousse un event GA4 (si gtag présent) */
  document.querySelectorAll('[data-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'cta_click', {
          cta_id: el.getAttribute('data-cta'),
          link_url: el.getAttribute('href') || ''
        });
      }
    });
  });
})();
