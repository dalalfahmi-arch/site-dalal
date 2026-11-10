/* Neybras — interactions (vanilla, sans dépendance) */
(function () {
  'use strict';

  /* ── Prix : rendu depuis js/config.js (source unique) ─────────────────── */
  var CFG = window.NEYBRAS_CONFIG;
  var NBSP = ' ';
  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  function money(n, cur) { return fmt(n) + NBSP + cur.label; }
  function priceHTML(o) {
    var main = money(o.price.mad, CFG.currencies[0]);
    var alt = CFG.currencies.slice(1).filter(function (c) { return o.price[c.key]; })
      .map(function (c) { return money(o.price[c.key], c); }).join(' · ');
    var per = o.period ? '<span class="price__per"> / ' + (o.period.replace('par ', '')) + '</span>' : '';
    return (o.from ? '<span class="price__from">À partir de</span>' : '') +
      '<span class="price__main">' + main + per + '</span>' +
      (alt ? '<span class="price__alt">' + alt + (o.period ? ' / ' + o.period.replace('par ', '') : '') + '</span>' : '');
  }
  if (CFG) {
    document.querySelectorAll('[data-price]').forEach(function (el) {
      var o = CFG.offers[el.getAttribute('data-price')];
      if (o) { el.innerHTML = priceHTML(o); }
    });
    document.querySelectorAll('[data-money]').forEach(function (el) {
      var node = CFG.offers;
      el.getAttribute('data-money').split('.').forEach(function (k) { node = node && node[k]; });
      /* « vitrine.payments.0 » → objet {mad} ; « vitrine.price » accepté aussi. */
      var v = node && (typeof node === 'number' ? node : node.mad);
      if (v) { el.textContent = money(v, CFG.currencies[0]); }
    });
    /* JSON-LD : offres schema.org complétées depuis la config */
    document.querySelectorAll('script[data-ld-offer]').forEach(function (s) {
      var o = CFG.offers[s.getAttribute('data-ld-offer')];
      if (!o) { return; }
      try {
        var d = JSON.parse(s.textContent);
        d.offers = { '@type': 'Offer', url: d.url, priceCurrency: 'MAD', availability: 'https://schema.org/InStock' };
        if (o.from) {
          d.offers.priceSpecification = { '@type': 'PriceSpecification', minPrice: o.price.mad, priceCurrency: 'MAD' };
        } else {
          d.offers.price = o.price.mad;
        }
        s.textContent = JSON.stringify(d);
      } catch (e) { /* JSON-LD statique conservé */ }
    });
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
  }

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
