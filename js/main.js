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

/* 6. BOUTON RETOUR EN HAUT */
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
    /* navigation */
    'nav-home':    'Accueil',
    'nav-method':  'Méthode',
    'nav-offers':  'Offres',
    'nav-about':   'À propos',
    'nav-regards': 'Regards',
    'nav-contact': 'Premier échange',

    /* topbar */
    'topbar-msg':  '<i class="fa-solid fa-pen-nib me-2"></i>Cabinets juridiques &amp; institutions financières — je structure votre autorité éditoriale.',
    'topbar-cta':  'Prendre un premier échange →',

    /* hero */
    'hero-surtitle': 'Cabinets juridiques · Institutions financières · Maroc',
    'hero-title':    'L\'influence ne se décrète pas, elle se <em>structure</em>.',
    'hero-lead':     'Dalal Fahmi — Fondatrice de Neybras Magazine. Je structure l\'autorité numérique des cabinets juridiques et des institutions financières, pour qu\'elle soit enfin à la hauteur de leur expertise.',
    'hero-cta1':     '<i class="fa-brands fa-whatsapp me-2"></i>Prendre un premier échange',
    'hero-cta2':     'Découvrir l\'approche',

    /* signaux */
    'sig-label':  'Reconnaissez-vous cette situation ?',
    'sig-title':  'Trois signaux d\'alerte',
    'sig1-title': 'Visibilité sans Influence',
    'sig1-body':  'Votre cabinet publie régulièrement. Mais vos prospects qualifiés ne vous identifient pas comme la référence — parce qu\'un positionnement flou ne convainc pas, même quand il est visible.',
    'sig2-title': 'L\'Écart de Stature',
    'sig2-body':  'Votre expertise est réelle. Votre image ne la reflète pas encore. Ce décalage coûte des mandats — silencieusement, chaque semaine.',
    'sig3-title': 'La Dispersion de Discours',
    'sig3-body':  'Chaque support parle de vous différemment. Un message morcelé ne s\'imprime pas dans la mémoire de vos interlocuteurs.',
    'sig-close':  'Le problème n\'est pas l\'effort. C\'est <strong>l\'absence d\'architecture stratégique.</strong>',

    /* offres */
    'off-label':    'Ce que je propose',
    'off-title':    'Trois niveaux d\'accompagnement',
    'off1-from':    'À partir de',
    'off1-meta':    'Séance unique',
    'off1-title':   'Audit Stratégique Éditorial',
    'off1-promise': 'Un diagnostic sans filtre de votre positionnement, et un plan d\'action hiérarchisé.',
    'off1-p1':      'Diagnostic de positionnement',
    'off1-p2':      'Cartographie des écarts',
    'off1-p3':      'Feuille de route priorisée',
    'off1-cta':     'Demander mon audit',
    'off2-badge':   'Le plus demandé',
    'off2-from':    'À partir de',
    'off2-meta':    'Projet cadré',
    'off2-title':   'Structuration Éditoriale',
    'off2-promise': 'L\'architecture complète de votre communication : positionnement, ligne éditoriale, formats et calendrier.',
    'off2-p1':      'Ligne éditoriale cadrée',
    'off2-p2':      'Formats opérationnels',
    'off2-p3':      'Calendrier priorisé',
    'off2-p4':      'Création du site web',
    'off2-cta':     'Prendre un premier échange',
    'off3-from':    'À partir de',
    'off3-meta':    'Mensuel reconductible',
    'off3-period':  '/ mois',
    'off3-title':   'Accompagnement Mensuel',
    'off3-promise': 'Le pilotage continu de votre autorité éditoriale, mois après mois.',
    'off3-p1':      'Pilotage du positionnement',
    'off3-p2':      'Production supervisée',
    'off3-p3':      'Messages calibrés FR/AR',
    'off3-cta':     'Prendre un premier échange',

    /* méthode */
    'meth-label':  'Comment ça se passe',
    'meth-title':  'Méthode en 4 temps',
    'step1-title': 'Diagnostic',
    'step1-body':  'Lecture précise de votre position, vos angles morts et vos leviers prioritaires.',
    'step2-title': 'Architecture',
    'step2-body':  'Positionnement, message central, ligne éditoriale. Le socle qui donne du sens à chaque prise de parole.',
    'step3-title': 'Déploiement',
    'step3-body':  'Activation de votre système éditorial sur vos canaux prioritaires, avec cohérence et régularité.',
    'step4-title': 'Optimisation',
    'step4-body':  'Analyse mensuelle, ajustement des axes. La stratégie évolue avec vous et votre marché.',

    /* à propos */
    'about-label': 'Pourquoi ce regard',
    'about-title': 'L\'expertise au service des experts',
    'abt1-title':  'L\'œil de l\'éditrice',
    'abt1-desc':   'Fondatrice de Neybras Magazine — média B2B des décideurs juridiques et financiers en Afrique francophone. Je sais ce qui retient l\'attention d\'un lecteur expert, et ce qui la perd au premier paragraphe.',
    'abt2-title':  'Ancrage terrain Maroc',
    'abt2-desc':   'Codes institutionnels locaux, audiences bilingues, secteurs en mutation rapide. Une stratégie efficace ici doit être pensée pour ici.',
    'abt3-title':  'Cohérence biculturelle FR / AR',
    'abt3-desc':   'Une autorité forte se construit sur la continuité du discours, quelle que soit la langue. Rares sont ceux qui maîtrisent les deux registres à haut niveau éditorial.',

    /* témoignages */
    'testi-label':  'Ils ont fait le choix de la clarté',
    'testi-title':  'Ce qu\'ils disent',
    'testi1-quote': '« J\'ai eu le plaisir de collaborer avec Dalal pour la 2<sup>e</sup> édition de Neybras sur une thématique assez complexe, la cyber-résilience. Son leadership rédactionnel est remarquable : elle a compris et su mettre en avant mon expertise. Elle ne publie pas un magazine, elle construit une plateforme d\'influence stratégique. »',
    'testi1-name':  'Youssef El Amrani',
    'testi1-role':  'Responsable de projet · Recommandation LinkedIn, déc. 2025',
    'testi2-quote': '« Dalal apporte à un sujet juridique ce qui manque le plus à notre profession : la clarté. Mes analyses en arbitrage international ont trouvé, dans Neybras Magazine, un cadre éditorial à la hauteur de leur exigence. »',
    'testi2-name':  'M<sup>e</sup> Driss El Harti',
    'testi2-role':  'Avocat au Barreau de Tanger — arbitrage international · Contributeur Neybras',
    'testi3-quote': '« Travailler avec Dalal, c\'est voir son expertise traduite sans être trahie. Elle structure le propos, soigne la cohérence, et donne à un contenu spécialisé une vraie portée auprès des décideurs. »',
    'testi3-name':  'M<sup>e</sup> Amine Lahlou',
    'testi3-role':  'Avocat au Barreau de Casablanca — arbitrage · Contributeur Neybras',

    /* contact */
    'cta-label': 'Première étape',
    'cta-title': 'Prenons un premier échange',
    'cta-body':  'Un appel de 30 minutes, sans engagement. Je vous dis ce que je vois — et nous identifions ensemble si une mission a du sens.',
    'cta-note':  'Réponse sous 24h · Sans engagement · Visio ou téléphone',

    /* media bar */
    'media-label': 'La preuve par mes médias',
    'media-desc':  'Je ne théorise pas la stratégie éditoriale : je la pratique chaque mois.'
  },

  ar: {
    /* navigation */
    'nav-home':    'الرئيسية',
    'nav-method':  'المنهجية',
    'nav-offers':  'الخدمات',
    'nav-about':   'من أنا',
    'nav-regards': 'مقالات',
    'nav-contact': 'حديث أوّل',

    /* topbar */
    'topbar-msg':  '<i class="fa-solid fa-pen-nib me-2"></i>مكاتب قانونية · مؤسسات مالية — أبني مكانتها التحريرية وأرسّخ مصداقيتها.',
    'topbar-cta':  'احجز أول نقاش ←',

    /* hero */
    'hero-surtitle': 'مكاتب قانونية · مؤسسات مالية · المغرب',
    'hero-title':    'النفوذ لا يُفرَض، بل <em>يُبنى</em>.',
    'hero-lead':     'دلال فهمي — مؤسِّسة مجلة نيبراس. أبني المكانة الرقمية للمكاتب القانونية والمؤسسات المالية، لترقى أخيراً إلى مستوى خبرتها الحقيقية.',
    'hero-cta1':     '<i class="fa-brands fa-whatsapp me-2"></i>احجز أول نقاش',
    'hero-cta2':     'اكتشف المنهجية',

    /* signaux */
    'sig-label':  'هل تتعرّف على هذا الوضع؟',
    'sig-title':  'ثلاثة مؤشرات تحذيرية',
    'sig1-title': 'ظهور بلا تأثير',
    'sig1-body':  'مكتبكم يُنشر بانتظام، لكنّ عملاءكم المحتملين لا يُعرِّفونه كمرجع — لأن التموضع الضبابي لا يُقنع، حتى وإن كان مرئياً.',
    'sig2-title': 'الفجوة في المكانة',
    'sig2-body':  'خبرتكم حقيقية. صورتكم لم تعكسها بعد. هذا التفاوت يُكلّفكم ملفات — في صمت، كل أسبوع.',
    'sig3-title': 'تشتّت الخطاب',
    'sig3-body':  'كل وسيط يتحدث عنكم بصورة مختلفة. رسالة مجزّأة لا تنطبع في ذاكرة من تخاطبونهم.',
    'sig-close':  'المشكلة ليست الجهد. بل <strong>غياب البنية الاستراتيجية.</strong>',

    /* offres */
    'off-label':    'ما أقدّمه',
    'off-title':    'ثلاثة مستويات من المرافقة',
    'off1-from':    'ابتداءً من',
    'off1-meta':    'جلسة واحدة',
    'off1-title':   'التشخيص الاستراتيجي التحريري',
    'off1-promise': 'تشخيص صريح لتموضعكم، وخطة عمل مرتّبة حسب الأولوية.',
    'off1-p1':      'تشخيص التموضع',
    'off1-p2':      'رسم خريطة الفجوات',
    'off1-p3':      'خارطة طريق مرتّبة',
    'off1-cta':     'أطلب تشخيصي',
    'off2-badge':   'الأكثر طلباً',
    'off2-from':    'ابتداءً من',
    'off2-meta':    'مشروع محدّد النطاق',
    'off2-title':   'البناء التحريري',
    'off2-promise': 'البنية الكاملة لتواصلكم: التموضع، الخط التحريري، الصيغ والتقويم.',
    'off2-p1':      'خط تحريري محكوم',
    'off2-p2':      'صيغ تشغيلية',
    'off2-p3':      'تقويم مرتّب حسب الأولوية',
    'off2-p4':      'إنشاء الموقع الإلكتروني',
    'off2-cta':     'احجز أول نقاش',
    'off3-from':    'ابتداءً من',
    'off3-meta':    'شهري قابل للتجديد',
    'off3-period':  '/ شهر',
    'off3-title':   'المرافقة الشهرية',
    'off3-promise': 'القيادة المستمرة لمكانتكم التحريرية، شهراً بعد شهر.',
    'off3-p1':      'قيادة التموضع',
    'off3-p2':      'إنتاج محتوى موجَّه',
    'off3-p3':      'رسائل محكومة FR/AR',
    'off3-cta':     'احجز أول نقاش',

    /* méthode */
    'meth-label':  'كيف تسير الأمور',
    'meth-title':  'منهجية في 4 مراحل',
    'step1-title': 'التشخيص',
    'step1-body':  'قراءة دقيقة لوضعكم الفعلي، نقاط عُماكم، ورافعاتكم الأولى.',
    'step2-title': 'البناء',
    'step2-body':  'التموضع، الرسالة المحورية، الخط التحريري. الأساس الذي يمنح معنىً لكل كلمة.',
    'step3-title': 'التنفيذ',
    'step3-body':  'تفعيل منظومتكم التحريرية على قنواتكم الرئيسية، بتناسق وانتظام.',
    'step4-title': 'التحسين',
    'step4-body':  'تحليل شهري وتعديل المحاور. الاستراتيجية تتطور معكم ومع سوقكم.',

    /* à propos */
    'about-label': 'لماذا هذه النظرة',
    'about-title': 'الخبرة في خدمة الخبراء',
    'abt1-title':  'نظرة المحررة',
    'abt1-desc':   'مؤسِّسة مجلة نيبراس — منبر B2B لصانعي القرار القانونيين والماليين في أفريقيا الناطقة بالفرنسية. أعرف ما يُبقي انتباه القارئ المتخصص، وما يُفقده منذ السطر الأول.',
    'abt2-title':  'إدراك عميق للسوق المغربي',
    'abt2-desc':   'أكواد مؤسسية محلية، جماهير مزدوجة اللغة، قطاعات في تحوّل متسارع. الاستراتيجية الفاعلة هنا يجب أن تُفكَّر لهنا.',
    'abt3-title':  'انسجام ثنائي اللغة FR / AR',
    'abt3-desc':   'المكانة الراسخة تُبنى على استمرارية الخطاب، أياً كانت اللغة. نادرٌ من يتقن المستويين التحريريين الرفيعين معاً.',

    /* témoignages */
    'testi-label':  'اختاروا الوضوح',
    'testi-title':  'ما قالوه',
    'testi1-quote': '«سعدتُ بالتعاون مع دلال في العدد الثاني من نيبراس حول موضوع دقيق ومعقّد، هو المرونة السيبرانية. قيادتها التحريرية لافتة: فهمت خبرتي وأحسنت إبرازها. هي لا تُصدر مجلة، بل تبني منصّة نفوذ استراتيجية.»',
    'testi1-name':  'يوسف العمراني',
    'testi1-role':  'مدير مشروع · توصية على LinkedIn، دجنبر 2025',
    'testi2-quote': '«تمنح دلال للموضوع القانوني ما تفتقر إليه مهنتنا أكثر من غيره: الوضوح. تحليلاتي في التحكيم الدولي وجدت في مجلة نيبراس إطاراً تحريرياً في مستوى صرامتها.»',
    'testi2-name':  'الأستاذ إدريس الحارثي',
    'testi2-role':  'محامٍ بهيئة طنجة — التحكيم الدولي · مساهم في مجلة نيبراس',
    'testi3-quote': '«العمل مع دلال يعني أن ترى خبرتك مترجَمة دون أن تُخان. تُنظّم الطرح، وتعتني بالانسجام، وتمنح المحتوى المتخصّص امتداداً حقيقياً لدى صانعي القرار.»',
    'testi3-name':  'الأستاذ أمين لحلو',
    'testi3-role':  'محامٍ بهيئة الدار البيضاء — التحكيم · مساهم في مجلة نيبراس',

    /* contact */
    'cta-label': 'الخطوة الأولى',
    'cta-title': 'لنتحدّث أوّلاً',
    'cta-body':  'مكالمة 30 دقيقة، بلا التزام. أقول لكم ما أراه — ونُحدّد معاً إن كانت هناك مهمة ذات معنى.',
    'cta-note':  'ردّ خلال 24 ساعة · بلا التزام · عبر الفيديو أو الهاتف',

    /* media bar */
    'media-label': 'الدليل من خلال منصّاتي',
    'media-desc':  'لا أُنظّر للاستراتيجية التحريرية، بل أمارسها شهرياً.'
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
