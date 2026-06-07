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
    'topbar-msg':  '<i class="fa-solid fa-pen-nib me-2"></i>Cabinets, PME et professions du conseil — je structure votre autorité éditoriale.',
    'topbar-cta':  'Prendre un premier échange →',

    'hero-badge':  'Cabinets · PME · Professions du conseil',
    'hero-title':  'L\'influence ne se décrète pas, elle se <span class="text-accent">structure</span>.',
    'hero-lead':   'Dalal Fahmi — Consultante en stratégie éditoriale &amp; digitale. Je positionne les cabinets et les PME à la hauteur de leur vraie expertise.',
    'hero-cta1':   '<i class="fa-brands fa-whatsapp me-2"></i>Prendre un premier échange',
    'hero-cta2':   'Découvrir l\'approche',
    'trust-1':     '<i class="fa-solid fa-pen-nib me-2"></i>Expertise éditoriale',
    'trust-2':     '<i class="fa-solid fa-newspaper me-2"></i>Médias fondés',
    'trust-3':     '<i class="fa-solid fa-star me-2"></i>Accompagnement premium',
    'trust-4':     '<i class="fa-solid fa-language me-2"></i>Approche bilingue',

    'prob-label':     'Comprendre avant d\'agir',
    'prob-title':     'Trois signaux d\'alerte',
    'prob-sub':       'Ces trois situations décrivent la majorité des organisations qui investissent en communication sans obtenir de résultats à la hauteur de leur expertise.',
    'prob1-title':    'Visibilité sans Influence',
    'prob2-title':    'L\'Écart de Stature',
    'prob3-title':    'La Dispersion de Discours',
    'prob1-impact':   '<strong>Ce qui se passe :</strong> Vous publiez régulièrement. Vos indicateurs de présence progressent. Mais les décideurs que vous ciblez ne réagissent pas — parce qu\'un positionnement flou, même visible, ne convainc pas.',
    'prob2-impact':   '<strong>Ce qui se passe :</strong> Votre niveau d\'expertise est réel. Mais votre image numérique — site, réseaux, supports — ne le reflète pas. Ce décalage entre ce que vous êtes et ce qui est perçu crée de la méfiance là où devrait se construire la confiance.',
    'prob3-impact':   '<strong>Ce qui se passe :</strong> Votre site dit une chose, vos réseaux une autre, votre communication arabe une troisième. Chaque prise de parole isolée dilue votre message au lieu de le renforcer — votre audience ne retient rien de précis.',
    'prob1-cons':     '<strong>La conséquence :</strong> Vous investissez en visibilité sans bâtir d\'autorité durable.',
    'prob2-cons':     '<strong>Ce que cela coûte :</strong> Des opportunités qualifiées perdues au profit d\'un concurrent perçu comme plus structuré — même s\'il l\'est moins que vous.',
    'prob3-cons':     '<strong>Ce que cela coûte :</strong> Vous êtes actif et visible. Mais pas choisi — parce que votre identité ne s\'imprime pas clairement dans la mémoire de vos interlocuteurs.',
    'prob-conclusion':'Le problème n\'est pas l\'effort. C\'est <strong>l\'absence d\'architecture stratégique.</strong>',

    'meth-label':  'L\'approche Neybras',
    'meth-title':  'Une méthode en 4 temps',
    'meth-sub':    'La plupart des stratégies de communication échouent parce qu\'elles sautent les premières étapes. Cette méthode commence par comprendre — avant d\'agir.',
    'step1-title': 'Diagnostic',
    'step2-title': 'Architecture',
    'step3-title': 'Déploiement',
    'step4-title': 'Optimisation',
    'step1-meta':  '<i class="fa-regular fa-clock me-1"></i>Séance initiale',
    'step2-meta':  '<i class="fa-regular fa-clock me-1"></i>3 à 4 semaines',
    'step3-meta':  '<i class="fa-regular fa-clock me-1"></i>En continu',
    'step4-meta':  '<i class="fa-regular fa-clock me-1"></i>Mensuel',
    'step1-obj':   'La plupart des organisations sautent cette étape — et construisent une stratégie sur des hypothèses plutôt que sur une lecture réelle. Ici, on commence par voir clairement votre position, vos angles morts et vos leviers prioritaires.',
    'step2-obj':   'Un calendrier de contenus sans socle stratégique produit du bruit — pas de la crédibilité. Cette étape construit le fondement : positionnement, message central, piliers éditoriaux, tonalité. Le cadre qui donne du sens à chaque prise de parole.',
    'step3-obj':   'L\'exécution sans cadre produit du bruit. L\'exécution avec un cadre clair produit du positionnement. Cette étape active votre système éditorial sur vos canaux prioritaires — avec cohérence et régularité, pas au feeling.',
    'step4-obj':   'Une stratégie qui ne s\'ajuste pas devient rigide — et perd en pertinence. Chaque mois : analyse de ce qui fonctionne, ajustement des axes, renforcement des leviers. La stratégie évolue avec vous et avec votre marché.',
    'step1-res':   'Vous savez précisément où vous en êtes, ce qui bloque et ce qui mérite d\'être activé en premier.',
    'step2-res':   'Une infrastructure de communication cohérente sur laquelle toute la suite s\'appuie — sans improvisation.',
    'step3-res':   'Chaque publication renforce votre positionnement au lieu de le diluer. Votre autorité se construit à chaque prise de parole.',
    'step4-res':   'Un pilotage vivant, aligné sur vos objectifs réels — pas sur un plan théorique figé.',

    'off-label':   'Ce que je propose',
    'off-title':   'Trois niveaux d\'accompagnement',
    'off-sub':     'Du diagnostic ponctuel à l\'accompagnement stratégique mensuel.',
    'tab1':        '<i class="fa-solid fa-magnifying-glass-chart me-2"></i>Audit stratégique',
    'tab2':        '<i class="fa-solid fa-layer-group me-2"></i>Structuration',
    'tab3':        '<i class="fa-solid fa-rocket me-2"></i>Accompagnement',
    'off1-title':  'Audit Stratégique Éditorial',
    'off2-title':  'Structuration Éditoriale',
    'off3-title':  'Accompagnement Éditorial Mensuel',
    'off1-price':  '<i class="fa-solid fa-tag me-2"></i>À partir de 7 000 DH',
    'off2-price':  '<i class="fa-solid fa-comments me-2"></i>Sur devis, après échange',
    'off3-price':  '<i class="fa-solid fa-comments me-2"></i>Sur devis, après échange',
    'off1-for':    'Publier sans stratégie, c\'est dépenser de l\'énergie sans retour. La plupart des cabinets et institutions alimentent leurs canaux régulièrement — sans impact mesurable sur leur crédibilité, leur attractivité ou leur autorité sectorielle. L\'audit stratégique vous dit exactement ce qui ne fonctionne pas — et comment y remédier.',
    'off2-for':    'Vous publiez, mais vos contenus ne renforcent pas votre expertise. Ils ne positionnent pas votre cabinet ou institution comme référence dans votre domaine. La structuration éditoriale met fin à l\'improvisation : elle vous donne une ligne directrice claire, des formats récurrents et un calendrier maîtrisé.',
    'off3-for':    'Votre expertise est réelle, mais votre communication ne la reflète pas. Vous êtes perçu comme un acteur parmi d\'autres — pas comme une référence. L\'accompagnement mensuel corrige cet écart dans la durée : pilotage continu de votre positionnement éditorial, production supervisée, ajustement permanent.',

    'about-label': 'La consultante',
    'about-title': 'Pourquoi travailler avec Dalal Fahmi',
    'abt1-title':  'L\'œil de l\'éditrice',
    'abt2-title':  'Expertise Terrain Maroc',
    'abt3-title':  'Cohérence des Audiences',
    'abt1-desc':   'La plupart des prestataires pensent en formats, en fréquence, en algorithmes. Ce qui construit réellement votre crédibilité auprès des décideurs — banquiers, associés, directeurs financiers — c\'est la cohérence de votre discours dans le temps. Je dirige deux médias : l\'un B2B, ancré dans le droit et la finance ; l\'autre B2C premium. Je sais ce qui retient l\'attention d\'un lecteur expert — et ce qui la perd au premier paragraphe.',
    'abt2-desc':   'Les méthodes importées sans adaptation locale produisent des communications qui sonnent faux sur le marché marocain. Codes institutionnels spécifiques, audiences bilingues aux attentes distinctes, secteurs en mutation rapide — une stratégie efficace ici doit être pensée pour ici, pas simplement transposée.',
    'abt3-desc':   'Beaucoup d\'organisations ont deux communications parallèles — une en français, une en arabe — sans cohérence stratégique entre les deux. Ce décalage envoie un signal de fragilité. Une autorité forte se construit sur la continuité du discours, quelle que soit la langue ou l\'interlocuteur.',

    'proof-label': 'Crédibilité &amp; Expertise',
    'proof-title': 'Pourquoi ce regard change tout',
    'proof-sub':   'N\'importe qui peut se dire consultant en communication. Ce qui différencie un regard stratégique, c\'est ce qui l\'a formé.',
    'stat1-title': 'Direction éditoriale',
    'stat1-lbl':   'La direction d\'un média de prestige exige un niveau d\'exigence que la communication d\'entreprise standard n\'atteint pas. Ce regard — formé à la rigueur du print premium et au pilotage éditorial sur une décennie — est ce que vous obtenez.',
    'stat2-title': 'Médias fondés',
    'stat2-lbl':   'Neybras Magazine (B2B : droit, finance, gouvernance) et Neybras Family (B2C premium : éducation, orientation) — deux publications actives qui prouvent une capacité réelle à structurer, produire et maintenir une ligne éditoriale à haut niveau, dans la durée.',
    'stat3-title': 'Expertise sectorielle',
    'stat3-lbl':   'Cabinets de conseil et d\'audit, expertise comptable et gestion de patrimoine, fintechs et institutions financières, PME structurées — ces environnements exigeants demandent une expertise de terrain et une compréhension des codes propres à l\'écosystème droit-finance-business.',
    'stat4-title': 'Bilingue &amp; biculturel',
    'stat4-lbl':   'La plupart des prestataires travaillent dans une seule langue — et le décalage se voit. Une communication institutionnelle en arabe mal calibrée peut effacer le travail d\'une présence française soignée. La maîtrise des deux registres, à haut niveau éditorial, est rare.',

    'diag-label':  'Première étape',
    'diag-title':  'Premier échange',
    'diag-sub':    'Beaucoup d\'organisations investissent dans la communication avant d\'avoir une lecture claire de leur situation. Cet échange existe pour corriger cela : 60 minutes pour voir précisément où vous en êtes — et quoi faire ensuite.',
    'deliv1':      'Un regard direct sur ce qui fragilise votre positionnement éditorial actuel',
    'deliv2':      'L\'identification des priorités à corriger — classées par impact, pas par urgence ressentie',
    'deliv3':      'Un premier cadrage orienté résultats — sans jargon, sans rapport à ranger dans un tiroir',
    'diag-note':   'Échange offert · Réponse sous 24h · Sans engagement'
  },

  ar: {
    'nav-home':    'الرئيسية',
    'nav-method':  'المنهجية',
    'nav-offers':  'الخدمات',
    'nav-about':   'من نحن',
    'topbar-msg':  '<i class="fa-solid fa-clock me-2"></i>وفّر وقتك وجهدك في البحث عن الحل المناسب.',
    'topbar-cta':  'تواصل معنا الآن ←',

    'hero-badge':  'مكاتب الاستشارة · المؤسسات · المقاولات · مهن المشورة',
    'hero-title':  'أحوّل خبرة المكاتب والمؤسسات إلى <span class="text-accent">سلطة تحريرية معترف بها</span>.',
    'hero-lead':   'إنتاج محتوى تحريري متخصص واستشارات في الاستراتيجية التحريرية لفاعلي القانون والمالية والأعمال. لأن المصداقية لا تُرتجل — بل تُبنى بمنهجية.',
    'hero-cta1':   '<i class="fa-brands fa-whatsapp me-2"></i>إجراء أول تبادل',
    'hero-cta2':   'اكتشف المقاربة',
    'trust-1':     '<i class="fa-solid fa-pen-nib me-2"></i>خبرة تحريرية',
    'trust-2':     '<i class="fa-solid fa-newspaper me-2"></i>وسائل إعلام أسّستها',
    'trust-3':     '<i class="fa-solid fa-star me-2"></i>مرافقة راقية',
    'trust-4':     '<i class="fa-solid fa-language me-2"></i>مقاربة ثنائية اللغة',

    'prob-label':     'افهم قبل أن تتصرف',
    'prob-title':     'ثلاثة إشارات تحذيرية',
    'prob-sub':       'هذه الحالات الثلاث تصف غالبية المنظمات التي تستثمر في التواصل دون الحصول على نتائج بمستوى خبرتها.',
    'prob1-title':    'حضور بلا تأثير',
    'prob2-title':    'الهوّة بين المكانة والصورة',
    'prob3-title':    'تشتت الخطاب',
    'prob1-impact':   '<strong>ما يحدث:</strong> تنشر بانتظام. مؤشرات حضورك ترتفع. لكن صانعي القرار المستهدفين لا يتفاعلون — لأن تموضعاً ضبابياً، حتى وإن كان مرئياً، لا يُقنع.',
    'prob2-impact':   '<strong>ما يحدث:</strong> مستوى خبرتك حقيقي. لكن صورتك الرقمية — الموقع والشبكات والدعائم — لا تعكسه. هذا التفاوت بين ما أنت عليه وما يُدرَك عنك يخلق ريبة حيث ينبغي أن تتشكّل الثقة.',
    'prob3-impact':   '<strong>ما يحدث:</strong> موقعك يقول شيئاً وشبكاتك شيئاً آخر وتواصلك بالعربية شيئاً ثالثاً. كل كلمة معزولة تُضعف رسالتك بدل أن تعززها — وجمهورك لا يحتفظ بشيء محدد.',
    'prob1-cons':     '<strong>النتيجة:</strong> تستثمر في الظهور دون بناء سلطة دائمة.',
    'prob2-cons':     '<strong>ما يكلّفك ذلك:</strong> فرص مؤهلة تذهب لمنافس يُدرَك أنه أكثر تنظيماً — حتى وإن كان أقل منك كفاءة.',
    'prob3-cons':     '<strong>ما يكلّفك ذلك:</strong> أنت نشيط ومرئي. لكنك لا تُختار — لأن هويتك لا تنطبع بوضوح في ذاكرة محاوريك.',
    'prob-conclusion':'المشكلة ليست الجهد. المشكلة هي <strong>غياب البنية الاستراتيجية.</strong>',

    'meth-label':  'مقاربة Neybras',
    'meth-title':  'منهجية في 4 مراحل',
    'meth-sub':    'تفشل معظم استراتيجيات التواصل لأنها تتجاوز المراحل الأولى. هذه المنهجية تبدأ بالفهم — قبل الفعل.',
    'step1-title': 'التشخيص',
    'step2-title': 'البناء',
    'step3-title': 'التنفيذ',
    'step4-title': 'التحسين',
    'step1-meta':  '<i class="fa-regular fa-clock me-1"></i>جلسة أولية',
    'step2-meta':  '<i class="fa-regular fa-clock me-1"></i>3 إلى 4 أسابيع',
    'step3-meta':  '<i class="fa-regular fa-clock me-1"></i>بصفة مستمرة',
    'step4-meta':  '<i class="fa-regular fa-clock me-1"></i>شهرياً',
    'step1-obj':   'معظم المنظمات تتجاوز هذه المرحلة — فتبني استراتيجية على افتراضات لا على قراءة حقيقية. هنا نبدأ برؤية واضحة لموقعك ونقاط عمائك ورافعاتك الأولوية.',
    'step2-obj':   'روزنامة محتوى دون أساس استراتيجي تُنتج ضجيجاً لا مصداقية. هذه المرحلة تبني الأساس: التموضع، الرسالة المحورية، الركائز التحريرية، الأسلوب. الإطار الذي يمنح معنىً لكل كلمة.',
    'step3-obj':   'التنفيذ دون إطار يُنتج ضجيجاً. التنفيذ بإطار واضح يُنتج تموضعاً. هذه المرحلة تُفعّل منظومتك التحريرية على قنواتك الأساسية — بتناسق وانتظام، لا بالحدس.',
    'step4-obj':   'استراتيجية لا تتكيّف تصبح جامدة — وتفقد صلتها. كل شهر: تحليل ما ينجح، تعديل المحاور، تعزيز الرافعات. الاستراتيجية تتطور معك ومع سوقك.',
    'step1-res':   'تعرف بدقة أين أنت، وما الذي يعيقك، وما الذي يستحق التفعيل أولاً.',
    'step2-res':   'بنية تواصلية متماسكة تستند إليها كل المراحل التالية — دون ارتجال.',
    'step3-res':   'كل منشور يعزز تموضعك بدل أن يُخففه. سلطتك تتبنى مع كل كلمة.',
    'step4-res':   'قيادة حية، متوافقة مع أهدافك الحقيقية — لا مع خطة نظرية جامدة.',

    'off-label':   'ما أقدمه',
    'off-title':   'ثلاثة مستويات من المرافقة',
    'off-sub':     'من التشخيص الظرفي إلى المرافقة الاستراتيجية الشهرية.',
    'tab1':        '<i class="fa-solid fa-magnifying-glass-chart me-2"></i>التدقيق الاستراتيجي',
    'tab2':        '<i class="fa-solid fa-layer-group me-2"></i>البنية التحريرية',
    'tab3':        '<i class="fa-solid fa-rocket me-2"></i>المرافقة',
    'off1-title':  'التدقيق الاستراتيجي التحريري',
    'off2-title':  'البنية التحريرية',
    'off3-title':  'المرافقة التحريرية الشهرية',
    'off1-price':  '<i class="fa-solid fa-tag me-2"></i>ابتداءً من 7 000 درهم',
    'off2-price':  '<i class="fa-solid fa-comments me-2"></i>حسب الطلب، بعد تبادل',
    'off3-price':  '<i class="fa-solid fa-comments me-2"></i>حسب الطلب، بعد تبادل',
    'off1-for':    'النشر بلا استراتيجية هو استنزاف للطاقة دون عائد. تغذي معظم المكاتب والمؤسسات قنواتها بانتظام — دون أثر قابل للقياس على مصداقيتها أو جاذبيتها أو سلطتها القطاعية. يخبركم التدقيق الاستراتيجي بدقة ما لا يعمل — وكيف معالجته.',
    'off2-for':    'أنتم تنشرون، لكن محتوياتكم لا تعزز خبرتكم ولا تضع هيكلكم مرجعاً في مجالكم. تضع البنية التحريرية حداً للارتجال : تمنحكم توجهاً واضحاً وصيغاً متكررة وتقويماً محكوماً.',
    'off3-for':    'خبرتكم حقيقية، لكن تواصلكم لا يعكسها. يُنظر إليكم كفاعل من بين آخرين — لا كمرجع. يصحح مرافقة التموضع هذه الفجوة : يمنحكم الأدوات لتأكيد تميزكم واحتلال فضاء تحريري مميز.',

    'about-label': 'المستشارة',
    'about-title': 'لماذا العمل مع دلال فهمي',
    'abt1-title':  'عين المحررة',
    'abt2-title':  'خبرة ميدانية بالمغرب',
    'abt3-title':  'تناسق الجماهير',
    'abt1-desc':   'يفكر معظم مزودي الخدمة من حيث الصيغ والتواتر والخوارزميات. ما يحدد مصداقيتكم فعلاً هو تماسك خطابكم ووضوح تموضعكم وإتقان خطكم التحريري. هذه النظرة — نظرة محررة تكوّنت على متطلبات الإعلام الراقي — هي ما تحصلون عليه.',
    'abt2-desc':   'تُفضي الأساليب المستوردة دون تكيّف محلي إلى اتصالات لا تتناسق مع السوق المغربي. شفرات مؤسسية محددة، جماهير ثنائية اللغة ذات توقعات متمايزة، قطاعات تتطور بسرعة — استراتيجية فاعلة هنا يجب أن تُفكَّر لهنا، لا أن تُنقل ببساطة.',
    'abt3-desc':   'كثير من المنظمات لديها اتصالان متوازيان — أحدهما بالفرنسية والآخر بالعربية — دون تماسك استراتيجي بينهما. هذا التناقض يرسل إشارة هشاشة. السلطة القوية تُبنى على استمرارية الخطاب، أياً كانت اللغة أو المحاور.',

    'proof-label': 'المصداقية والخبرة',
    'proof-title': 'لماذا هذه النظرة تغيّر كل شيء',
    'proof-sub':   'يمكن لأي شخص أن يقدّم نفسه مستشاراً في التواصل. ما يميّز نظرة استراتيجية حقيقية هو ما شكّلها.',
    'stat1-title': 'الإدارة التحريرية',
    'stat1-lbl':   'إدارة وسيلة إعلام راقية تتطلب مستوى من المتطلبات لا يبلغه التواصل المؤسسي المعتاد. هذه النظرة — المشكّلة بصرامة الطباعة الفاخرة وقيادة التحرير على مدى عقد — هي ما تحصل عليه.',
    'stat2-title': 'وسائل إعلام أسّستها',
    'stat2-lbl':   'Neybras Magazine (للمؤسسات: القانون والمالية والحوكمة) وNeybras Family (B2C الراقي: التعليم والتوجيه) — منشورتان فاعلتان تُثبتان قدرة حقيقية على هيكلة خط تحريري رفيع المستوى والحفاظ عليه في الزمن.',
    'stat3-title': 'خبرة قطاعية',
    'stat3-lbl':   'مكاتب الاستشارة والتدقيق، المحاسبة وإدارة الثروات، الفينتك والمؤسسات المالية، المقاولات المنظّمة — هذه البيئات المتطلبة تستدعي خبرة ميدانية وفهماً عميقاً لمنظومة القانون والمالية والأعمال.',
    'stat4-title': 'ثنائي اللغة والثقافة',
    'stat4-lbl':   'معظم مزودي الخدمة يعملون بلغة واحدة — والفجوة تبدو جليّة. تواصل مؤسسي بالعربية غير موفَّق يمكنه أن يمحو جهود حضور فرنسي مصقول. إتقان السجلّين بمستوى تحريري رفيع نادر.',

    'diag-label':  'الخطوة الأولى',
    'diag-title':  'جلسة التوضيح الاستراتيجي',
    'diag-sub':    'تستثمر منظمات كثيرة في التواصل قبل أن تمتلك قراءة واضحة لوضعها. هذه الجلسة وُجدت لتصحيح ذلك: 60 دقيقة لترى بدقة أين أنت — وما الذي يجب فعله بعدها.',
    'deliv1':      'قراءة واضحة لما يُضعف تموضعكم الحالي',
    'deliv2':      'تحديد الأولويات الواجب تصحيحها — مرتّبة حسب الأثر لا حسب الإلحاح المشعور',
    'deliv3':      'خطة عمل أولى موجّهة نحو النتائج — بلا مصطلحات تقنية، بلا تقرير نظري',
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
