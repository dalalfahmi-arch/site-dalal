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

/* ────────────────────────────────────────────────────────────────
   7. BILINGUISME FR / AR
   ──────────────────────────────────────────────────────────────── */
const i18n = {
  fr: {
    'nav-home':    'Accueil',
    'nav-method':  'Méthode',
    'nav-offers':  'Offres',
    'nav-about':   'À propos',
    'topbar-msg':  '<i class="fa-solid fa-clock me-2"></i>Économisez votre temps et vos efforts précieux consacrés à la recherche d\'une solution.',
    'topbar-cta':  'Contactez-nous dès maintenant →',

    'hero-badge':  'Clubs sportifs · PME marocaines · Cabinets &amp; institutions',
    'hero-title':  'L\'influence ne se décrète pas, <span class="text-accent">elle se structure</span>.',
    'hero-lead':   'Conseil stratégique en communication digitale et éditoriale pour les organisations d\'exception. Transformez votre expertise en autorité reconnue.',
    'hero-cta1':   '<i class="fa-brands fa-whatsapp me-2"></i>Planifier une session stratégique',
    'hero-cta2':   'Découvrir l\'approche',
    'trust-1':     '<i class="fa-solid fa-pen-nib me-2"></i>Expertise éditoriale',
    'trust-2':     '<i class="fa-solid fa-newspaper me-2"></i>Médias fondés',
    'trust-3':     '<i class="fa-solid fa-star me-2"></i>Accompagnement premium',
    'trust-4':     '<i class="fa-solid fa-language me-2"></i>Approche bilingue',

    'prob-label':     'Comprendre avant d\'agir',
    'prob-title':     'Trois signaux d\'alerte',
    'prob-sub':       'Derrière chaque organisation qui communique sans convertir, l\'un de ces patterns est à l\'œuvre.',
    'prob1-title':    'Visibilité sans Influence',
    'prob2-title':    'Déficit d\'Incarnation',
    'prob3-title':    'Dispersion de Valeur',
    'prob1-impact':   '<strong>Le problème :</strong> Vous communiquez, mais votre message ne mobilise pas les décideurs qui comptent. Présence active, mais positionnement flou — vos audiences ne savent pas exactement ce que vous apportez.',
    'prob2-impact':   '<strong>Le problème :</strong> Votre expertise inspire le respect, mais votre image numérique ne porte pas cette stature. Un décalage entre votre niveau réel et votre présence perçue crée de la méfiance là où il devrait y avoir de la confiance.',
    'prob3-impact':   '<strong>Le problème :</strong> Sans direction stratégique, votre capital de marque s\'érode au lieu de s\'imposer. Chaque prise de parole isolée dilue votre message au lieu de renforcer votre position.',
    'prob1-cons':     '<strong>La conséquence :</strong> Vous investissez en visibilité sans bâtir d\'autorité durable.',
    'prob2-cons':     '<strong>La conséquence :</strong> Des opportunités qualifiées vous échappent, faute d\'une identité éditoriale cohérente.',
    'prob3-cons':     '<strong>La conséquence :</strong> Vous êtes actif, visible — mais pas encore choisi.',
    'prob-conclusion':'Le problème n\'est pas l\'effort. C\'est <strong>l\'absence d\'architecture stratégique.</strong>',

    'meth-label':  'L\'approche Neybras',
    'meth-title':  'Une méthode en 4 temps',
    'meth-sub':    'De la clarté stratégique au déploiement — chaque étape est conçue pour produire des résultats mesurables.',
    'step1-title': 'Diagnostic',
    'step2-title': 'Architecture',
    'step3-title': 'Déploiement',
    'step4-title': 'Optimisation',
    'step1-meta':  '<i class="fa-regular fa-clock me-1"></i>Séance initiale',
    'step2-meta':  '<i class="fa-regular fa-clock me-1"></i>3 à 4 semaines',
    'step3-meta':  '<i class="fa-regular fa-clock me-1"></i>En continu',
    'step4-meta':  '<i class="fa-regular fa-clock me-1"></i>Mensuel',
    'step1-obj':   '<strong>Objectif :</strong> Identifier votre position réelle, vos angles morts et vos leviers prioritaires.',
    'step2-obj':   '<strong>Objectif :</strong> Construire la ligne éditoriale, les piliers de message et la charte de communication.',
    'step3-obj':   '<strong>Objectif :</strong> Activer la stratégie sur vos canaux prioritaires avec cohérence et régularité.',
    'step4-obj':   '<strong>Objectif :</strong> Analyser les performances, ajuster les axes, renforcer ce qui fonctionne.',
    'step1-res':   'Une lecture claire de votre situation et une feuille de route actionnable.',
    'step2-res':   'Un socle stratégique solide sur lequel chaque prise de parole s\'appuie.',
    'step3-res':   'Une présence qui construit votre autorité à chaque publication.',
    'step4-res':   'Une stratégie vivante, alignée sur vos objectifs à chaque étape.',

    'off-label':   'Ce que je propose',
    'off-title':   'Trois niveaux d\'accompagnement',
    'off-sub':     'Du diagnostic ponctuel à l\'accompagnement stratégique mensuel.',
    'tab1':        '<i class="fa-solid fa-magnifying-glass-chart me-2"></i>Diagnostic',
    'tab2':        '<i class="fa-solid fa-layer-group me-2"></i>Structuration',
    'tab3':        '<i class="fa-solid fa-rocket me-2"></i>Accompagnement',
    'off1-title':  'Diagnostic Stratégique',
    'off2-title':  'Structuration Éditoriale',
    'off3-title':  'Accompagnement de Positionnement',
    'off1-for':    '<i class="fa-solid fa-user-check me-2"></i>Pour : dirigeants, clubs et organisations souhaitant une lecture objective de leur communication.',
    'off2-for':    '<i class="fa-solid fa-user-check me-2"></i>Pour : marques et organisations prêtes à construire une présence éditoriale cohérente et durable.',
    'off3-for':    '<i class="fa-solid fa-user-check me-2"></i>Pour : organisations qui veulent déléguer le pilotage stratégique de leur présence éditoriale.',

    'about-label': 'La consultante',
    'about-title': 'Pourquoi travailler avec Dalal Fahmi',
    'abt1-title':  'L\'œil de l\'éditrice',
    'abt2-title':  'Expertise Terrain Maroc',
    'abt3-title':  'Approche Bilingue',
    'abt1-desc':   'J\'accorde à chaque marque le même niveau d\'exigence qu\'à une publication de prestige. Chaque mot, chaque support, chaque prise de parole sert une ligne claire.',
    'abt2-desc':   'Une connaissance intime des codes du marché marocain, entre exigences locales et ambitions internationales. Ce qui fonctionne ici, pas seulement ce qui s\'enseigne ailleurs.',
    'abt3-desc':   'Un accompagnement stratégique en français et en arabe, pour bâtir une influence cohérente sur vos deux sphères d\'audience.',

    'proof-label': 'Crédibilité &amp; Expertise',
    'proof-title': 'Une expertise d\'éditrice au service de votre stratégie',
    'stat1-title': 'Direction éditoriale',
    'stat1-lbl':   'Une décennie de pratique dans la création de contenus à haute valeur et la direction de publications premium.',
    'stat2-title': 'Médias fondés',
    'stat2-lbl':   'Neybras Family et Neybras Magazine, plateformes de référence juridique, fiscale et éducative au Maroc.',
    'stat3-title': 'Expertise sectorielle',
    'stat3-lbl':   'Une connaissance approfondie des enjeux de communication des clubs sportifs, institutions et PME marocaines.',
    'stat4-title': 'Bilingue &amp; biculturel',
    'stat4-lbl':   'Un pilotage éditorial fluide en français et en arabe, pour une influence cohérente sur vos deux sphères d\'audience.',

    'diag-label':  'Première étape',
    'diag-title':  'Session de Clarification Stratégique',
    'diag-sub':    'Une évaluation structurée pour clarifier votre positionnement et vos priorités de communication — avant d\'investir.',
    'deliv1':      'Lecture critique de votre position actuelle',
    'deliv2':      'Identification des angles morts de votre communication',
    'deliv3':      'Définition des leviers prioritaires de votre visibilité stratégique',
    'diag-note':   'Entretien offert · Réponse sous 24h · Sans engagement'
  },

  ar: {
    'nav-home':    'الرئيسية',
    'nav-method':  'المنهجية',
    'nav-offers':  'الخدمات',
    'nav-about':   'من نحن',
    'topbar-msg':  '<i class="fa-solid fa-clock me-2"></i>وفّر وقتك وجهدك في البحث عن الحل المناسب.',
    'topbar-cta':  'تواصل معنا الآن ←',

    'hero-badge':  'الأندية الرياضية · المقاولات المغربية · الهيئات والمؤسسات',
    'hero-title':  'التأثير لا يُفرض، <span class="text-accent">بل يُبنى باستراتيجية</span>.',
    'hero-lead':   'استشارات استراتيجية في التواصل الرقمي والتحريري للمنظمات المتميزة. حوّل خبرتك إلى سلطة معترف بها.',
    'hero-cta1':   '<i class="fa-brands fa-whatsapp me-2"></i>جدولة جلسة استراتيجية',
    'hero-cta2':   'اكتشف المقاربة',
    'trust-1':     '<i class="fa-solid fa-pen-nib me-2"></i>خبرة تحريرية',
    'trust-2':     '<i class="fa-solid fa-newspaper me-2"></i>وسائل إعلام أسّستها',
    'trust-3':     '<i class="fa-solid fa-star me-2"></i>مرافقة راقية',
    'trust-4':     '<i class="fa-solid fa-language me-2"></i>مقاربة ثنائية اللغة',

    'prob-label':     'افهم قبل أن تتصرف',
    'prob-title':     'ثلاثة إشارات تحذيرية',
    'prob-sub':       'خلف كل منظمة تتواصل دون أن تحوّل، أحد هذه الأنماط حاضر.',
    'prob1-title':    'حضور بلا تأثير',
    'prob2-title':    'غياب الصورة الموثوقة',
    'prob3-title':    'تشتت القيمة',
    'prob1-impact':   '<strong>المشكلة:</strong> تتواصل، لكن رسالتك لا تُحرّك صانعي القرار الذين يهمّون. حضور نشط، لكن تموضع ضبابي.',
    'prob2-impact':   '<strong>المشكلة:</strong> خبرتك تستحق الاحترام، لكن صورتك الرقمية لا تعكس هذه المكانة. تفاوت بين مستواك الحقيقي وما يُدرَك عنك.',
    'prob3-impact':   '<strong>المشكلة:</strong> دون توجيه استراتيجي، تتآكل قيمة علامتك بدل أن تفرض نفسها. كل كلمة معزولة تُضعف رسالتك.',
    'prob1-cons':     '<strong>النتيجة:</strong> تستثمر في الظهور دون بناء سلطة دائمة.',
    'prob2-cons':     '<strong>النتيجة:</strong> تضيع منك فرص مؤهلة لغياب هوية تحريرية متماسكة.',
    'prob3-cons':     '<strong>النتيجة:</strong> أنت نشيط، مرئي — لكن لم تُختَر بعد.',
    'prob-conclusion':'المشكلة ليست الجهد. المشكلة هي <strong>غياب البنية الاستراتيجية.</strong>',

    'meth-label':  'مقاربة Neybras',
    'meth-title':  'منهجية في 4 مراحل',
    'meth-sub':    'من الوضوح الاستراتيجي إلى التنفيذ — كل مرحلة مصمّمة لإنتاج نتائج قابلة للقياس.',
    'step1-title': 'التشخيص',
    'step2-title': 'البناء',
    'step3-title': 'التنفيذ',
    'step4-title': 'التحسين',
    'step1-meta':  '<i class="fa-regular fa-clock me-1"></i>جلسة أولية',
    'step2-meta':  '<i class="fa-regular fa-clock me-1"></i>3 إلى 4 أسابيع',
    'step3-meta':  '<i class="fa-regular fa-clock me-1"></i>بصفة مستمرة',
    'step4-meta':  '<i class="fa-regular fa-clock me-1"></i>شهرياً',
    'step1-obj':   '<strong>الهدف:</strong> تحديد موقعك الفعلي ونقاط عميائك والرافعات ذات الأولوية.',
    'step2-obj':   '<strong>الهدف:</strong> بناء الخط التحريري وركائز الرسائل وميثاق التواصل.',
    'step3-obj':   '<strong>الهدف:</strong> تفعيل الاستراتيجية على قنواتك الأساسية بانتظام وتناسق.',
    'step4-obj':   '<strong>الهدف:</strong> تحليل الأداء وتعديل المحاور وتعزيز ما ينجح.',
    'step1-res':   'رؤية واضحة لوضعك وخارطة طريق قابلة للتنفيذ.',
    'step2-res':   'أساس استراتيجي متين تستند إليه كل كلمة.',
    'step3-res':   'حضور يبني سلطتك مع كل منشور.',
    'step4-res':   'استراتيجية حية، متوافقة مع أهدافك في كل مرحلة.',

    'off-label':   'ما أقدمه',
    'off-title':   'ثلاثة مستويات من المرافقة',
    'off-sub':     'من التشخيص الظرفي إلى المرافقة الاستراتيجية الشهرية.',
    'tab1':        '<i class="fa-solid fa-magnifying-glass-chart me-2"></i>التشخيص',
    'tab2':        '<i class="fa-solid fa-layer-group me-2"></i>البنية التحريرية',
    'tab3':        '<i class="fa-solid fa-rocket me-2"></i>المرافقة',
    'off1-title':  'التشخيص الاستراتيجي',
    'off2-title':  'البنية التحريرية',
    'off3-title':  'مرافقة التموضع',
    'off1-for':    '<i class="fa-solid fa-user-check me-2"></i>لمن: القادة والأندية والمنظمات الراغبة في قراءة موضوعية لتواصلها.',
    'off2-for':    '<i class="fa-solid fa-user-check me-2"></i>لمن: العلامات والمنظمات المستعدة لبناء حضور تحريري متماسك ودائم.',
    'off3-for':    '<i class="fa-solid fa-user-check me-2"></i>لمن: المنظمات التي تريد تفويض القيادة الاستراتيجية لحضورها التحريري.',

    'about-label': 'المستشارة',
    'about-title': 'لماذا العمل مع دلال فهمي',
    'abt1-title':  'عين المحررة',
    'abt2-title':  'خبرة ميدانية بالمغرب',
    'abt3-title':  'مقاربة ثنائية اللغة',
    'abt1-desc':   'أمنح كل علامة المستوى ذاته من المتطلبات الذي أمنحه لمنشور مرموق. كل كلمة، كل وسيلة، كل خطاب يخدم خطاً واضحاً.',
    'abt2-desc':   'معرفة عميقة بأكواد السوق المغربي، بين المتطلبات المحلية والطموحات الدولية. ما ينجح هنا، لا ما يُدرَّس فحسب.',
    'abt3-desc':   'مرافقة استراتيجية بالفرنسية والعربية لبناء تأثير متماسك على كلتا دائرتَي جمهورك.',

    'proof-label': 'المصداقية والخبرة',
    'proof-title': 'خبرة محررة في خدمة استراتيجيتك',
    'stat1-title': 'الإدارة التحريرية',
    'stat1-lbl':   'عقد من الممارسة في إنشاء محتوى عالي القيمة وإدارة المنشورات المتميزة.',
    'stat2-title': 'وسائل إعلام أسّستها',
    'stat2-lbl':   'Neybras Family و Neybras Magazine، منصتا مرجع قانوني وتعليمي في المغرب.',
    'stat3-title': 'خبرة قطاعية',
    'stat3-lbl':   'معرفة عميقة بإشكاليات تواصل الأندية الرياضية والمؤسسات والمقاولات المغربية.',
    'stat4-title': 'ثنائي اللغة والثقافة',
    'stat4-lbl':   'قيادة تحريرية سلسة بالفرنسية والعربية لتأثير متناسق على كلتا دائرتَي جمهورك.',

    'diag-label':  'الخطوة الأولى',
    'diag-title':  'جلسة التوضيح الاستراتيجي',
    'diag-sub':    'تقييم منظّم لتوضيح تموضعك وأولويات تواصلك — قبل الاستثمار.',
    'deliv1':      'قراءة نقدية لوضعك الحالي',
    'deliv2':      'تحديد النقاط العمياء في تواصلك',
    'deliv3':      'تعريف الرافعات الأولوية لرؤيتك الاستراتيجية',
    'diag-note':   'مقابلة مجانية · رد خلال 24 ساعة · بدون التزام'
  }
};

function switchLang(lang) {
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.body.classList.toggle('lang-ar', lang === 'ar');

  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key] !== undefined) {
      el.innerHTML = i18n[lang][key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  try { localStorage.setItem('neybras-lang', lang); } catch(e) {}
}

(function() {
  var saved = '';
  try { saved = localStorage.getItem('neybras-lang') || ''; } catch(e) {}
  if (saved === 'ar') { switchLang('ar'); }
})();
