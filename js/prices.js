/* Neybras — rendu des prix, modalités de paiement et libellés, depuis js/config.js.
   Un seul code pour deux usages :
   - navigateur : relie les gabarits data-* de la page à la config ;
   - génération des pages (Node) : écrit le même rendu dans le HTML, ce qui sert de
     contenu de secours si js/config.js ou js/prices.js ne se charge pas.
   Gabarits :
     data-price="cle"      prix complet (DH, puis € et F CFA)
     data-price-inline="cle" prix en une ligne (DH / F CFA), pour un libellé
     data-pay="cle"        modalités sur une ligne
     data-pay-block="cle"  modalités en bloc : titre puis une ligne par versement ou jalon
     data-text="cle.champ" libellé de la config (ex. microcopy), jetons {total} {p0} {p1}
     data-money="cle.chemin" montant en DH (ex. vitrine.payments.0) */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory; }
  else { root.NeybrasPrices = factory; }
})(typeof window !== 'undefined' ? window : this, function (CFG) {
  'use strict';
  var NBSP = ' ';
  var cur = CFG.currencies;

  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function money(n, c) { return fmt(n) + NBSP + c.label; }
  function mad(n) { return money(n, cur[0]); }
  function per(o) { return o.period ? ' / ' + o.period.replace('par ', '') : ''; }
  function allCur(amounts, sep) {
    return cur.filter(function (c) { return amounts[c.key]; })
      .map(function (c) { return money(amounts[c.key], c); }).join(sep);
  }

  function priceHTML(key) {
    var o = CFG.offers[key];
    var alt = cur.slice(1).filter(function (c) { return o.price[c.key]; })
      .map(function (c) { return money(o.price[c.key], c) + per(o); }).join(' / ');
    return (o.from ? '<span class="price__from">À partir de</span>' : '') +
      '<span class="price__main">' + mad(o.price.mad) + per(o) + '</span>' +
      (alt ? '<span class="price__alt">' + alt + '</span>' : '');
  }

  function priceInline(key) {
    return allCur(CFG.offers[key].price, ' / ');
  }

  function payCompact(key) {
    var o = CFG.offers[key];
    if (o.payments) {
      return o.paymentTitle + ' : ' + o.payments.map(function (p) { return mad(p.mad) + ' ' + p.label; }).join(', ') + '.';
    }
    if (o.steps) {
      return o.paymentTitle + ' : ' + o.steps.map(function (s) { return s.label.replace(/^à la /, ''); }).join(', ') + '.';
    }
    return '';
  }

  function payBlock(key) {
    var o = CFG.offers[key];
    var lines = o.payments
      ? o.payments.map(function (p) { return allCur(p, ' · ') + ' ' + p.label; })
      : (o.steps || []).map(function (s) { return s.line; });
    return '<strong class="pay__title">' + o.paymentTitle + '</strong>' +
      lines.map(function (l) { return '<span class="pay__line">' + l + '</span>'; }).join('');
  }

  function text(key, field) {
    var o = CFG.offers[key];
    var t = o && o[field];
    if (typeof t !== 'string') { return ''; }
    return t.replace('{total}', mad(o.price.mad))
      .replace('{p0}', o.payments ? mad(o.payments[0].mad) : '')
      .replace('{p1}', o.payments ? mad(o.payments[1].mad) : '');
  }

  function ldOffer(key, url) {
    var o = CFG.offers[key];
    var off = { '@type': 'Offer', url: url, priceCurrency: 'MAD', availability: 'https://schema.org/InStock' };
    if (o.from) {
      off.priceSpecification = { '@type': 'PriceSpecification', minPrice: o.price.mad, priceCurrency: 'MAD' };
    } else {
      off.price = o.price.mad;
    }
    return off;
  }

  /* Liaison DOM (navigateur uniquement) */
  if (typeof document !== 'undefined') {
    document.querySelectorAll('[data-price]').forEach(function (el) {
      if (CFG.offers[el.getAttribute('data-price')]) { el.innerHTML = priceHTML(el.getAttribute('data-price')); }
    });
    document.querySelectorAll('[data-price-inline]').forEach(function (el) {
      if (CFG.offers[el.getAttribute('data-price-inline')]) { el.textContent = priceInline(el.getAttribute('data-price-inline')); }
    });
    document.querySelectorAll('[data-pay]').forEach(function (el) {
      if (CFG.offers[el.getAttribute('data-pay')]) { el.textContent = payCompact(el.getAttribute('data-pay')); }
    });
    document.querySelectorAll('[data-pay-block]').forEach(function (el) {
      if (CFG.offers[el.getAttribute('data-pay-block')]) { el.innerHTML = payBlock(el.getAttribute('data-pay-block')); }
    });
    document.querySelectorAll('[data-text]').forEach(function (el) {
      var p = el.getAttribute('data-text').split('.');
      var t = text(p[0], p[1]);
      if (t) { el.textContent = t; }
    });
    document.querySelectorAll('[data-money]').forEach(function (el) {
      var node = CFG.offers;
      el.getAttribute('data-money').split('.').forEach(function (k) { node = node && node[k]; });
      var v = node && (typeof node === 'number' ? node : node.mad);
      if (v) { el.textContent = mad(v); }
    });
    document.querySelectorAll('script[data-ld-offer]').forEach(function (s) {
      var key = s.getAttribute('data-ld-offer');
      if (!CFG.offers[key]) { return; }
      try {
        var d = JSON.parse(s.textContent);
        d.offers = ldOffer(key, d.url);
        s.textContent = JSON.stringify(d);
      } catch (e) { /* JSON-LD statique conservé */ }
    });
  }

  return { priceInline: priceInline, priceHTML: priceHTML, payCompact: payCompact, payBlock: payBlock, text: text, ldOffer: ldOffer, money: mad };
});
