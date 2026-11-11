/* Neybras — interactions (vanilla, sans dépendance) */
(function () {
  'use strict';

  /* Brief : préremplissage de l'offre et du type de demande depuis l'URL */
  var form = document.querySelector('form[data-brief]');
  if (form) {
    var qs = new URLSearchParams(window.location.search);
    var offre = qs.get('offre'), demande = qs.get('demande');
    var sel = form.querySelector('[name="offre"]');
    if (sel && offre) {
      Array.prototype.forEach.call(sel.options, function (op) {
        if (op.getAttribute('data-key') === offre) { sel.value = op.value; }
      });
    }
    var typ = form.querySelector('[name="type_de_demande"]');
    if (typ && demande === 'devis') { typ.value = 'Demande de devis'; }
  }
  /* (le rendu des prix est dans js/prices.js) */

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

/* Menu déroulant « Ils nous font confiance » : clic, clavier (Échap) et clic extérieur */
(function () {
  var btn = document.querySelector('.nav__dropbtn');
  var sub = document.getElementById('menuConfiance');
  if (!btn || !sub) { return; }
  function set(open) {
    sub.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function (e) { e.stopPropagation(); set(!sub.classList.contains('is-open')); });
  document.addEventListener('click', function (e) { if (!sub.contains(e.target)) { set(false); } });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sub.classList.contains('is-open')) { set(false); btn.focus(); }
  });
})();

/* URLs propres : jamais de #ancre visible dans la barre d'adresse */
(function () {
  'use strict';
  /* Anciens liens partagés (neybras.com/#contact, /#offres) -> pages dédiées */
  var legacy = { '#contact': '/contact', '#offres': '/offres' };
  if ((location.pathname === '/' || location.pathname === '/index') && legacy[location.hash]) {
    location.replace(legacy[location.hash] + location.search);
    return;
  }
  /* Liens d'ancre internes : défilement sans écrire le # dans l'URL */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) { return; }
    var target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) { return; }
    e.preventDefault();
    target.scrollIntoView();
    if (!target.hasAttribute('tabindex')) { target.setAttribute('tabindex', '-1'); }
    target.focus({ preventScroll: true });
    if (location.hash) { history.replaceState(null, '', location.pathname + location.search); }
  });
})();

/* Aperçus de la page Modèles : panneau « aperçu complet » replié par défaut (visible sans JS) */
(function () {
  'use strict';
  document.querySelectorAll('[data-toggle]').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('data-toggle'));
    if (!panel) { return; }
    var closed = btn.textContent, open = btn.getAttribute('data-open-label') || "Réduire l'aperçu";
    panel.hidden = true; btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var show = panel.hidden; panel.hidden = !show;
      btn.setAttribute('aria-expanded', show ? 'true' : 'false');
      btn.textContent = show ? open : closed;
    });
  });
})();
