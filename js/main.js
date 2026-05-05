/**
 * SITE : Dalal Fahmi — Stratégie Digitale & Éditoriale
 * FICHIER : js/main.js
 *
 * CONTENU :
 *  1. Initialisation AOS (animations au scroll)
 *  2. Navbar sticky au scroll
 *  3. Fermeture menu mobile
 *  4. Formulaire de contact (validation + Formspree AJAX)
 *  5. Année automatique dans le footer
 *  6. Bouton retour en haut
 *
 * Aucune dépendance jQuery — vanilla JS uniquement
 */

'use strict';

/* 1. AOS — Animations au scroll */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60, disable: 'mobile' });
  }
});

/* 2. NAVBAR — box-shadow au scroll */
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
})();

/* 3. MENU MOBILE — fermeture au clic sur un lien */
(function () {
  const navLinks = document.querySelectorAll('#navbarNav .nav-link, .btn-nav-cta');
  const navbarCollapse = document.getElementById('navbarNav');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
})();

/* 4. FORMULAIRE DE CONTACT — Formspree AJAX */
(function () {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    form.classList.add('was-validated');

    const formAction = form.getAttribute('action') || '';
    const isFormspree = formAction.includes('formspree.io') && !formAction.includes('[FORMSPREE_ID]');

    if (isFormspree) {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Envoi en cours…';

      try {
        const response = await fetch(formAction, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          form.style.display = 'none';
          if (successMsg) successMsg.classList.remove('d-none');
        } else {
          throw new Error('Erreur serveur');
        }
      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mt-3';
        errorDiv.innerHTML = "<i class='fa-solid fa-triangle-exclamation me-2'></i>Une erreur est survenue. Veuillez réessayer ou m'écrire directement par email.";
        form.appendChild(errorDiv);
      }
    }
  });
})();

/* 5. ANNÉE AUTOMATIQUE dans le footer */
(function () {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* 6. BOUTON RETOUR EN HAUT (optionnel) */
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
