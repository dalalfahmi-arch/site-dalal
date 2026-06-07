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
    'diag-sub':    'Beaucoup d\'organisations investissent dans la communication avant d\'avoir une lecture claire de leur situation. Cet échange existe pour corriger cela : 30 minutes pour voir précisément où vous en êtes — et quoi faire ensuite.',
    'deliv1':      'Un regard direct sur ce qui fragilise votre positionnement éditorial actuel',
    'deliv2':      'L\'identification des priorités à corriger — classées par impact, pas par urgence ressentie',
    'deliv3':      'Un premier cadrage orienté résultats — sans jargon, sans rapport à ranger dans un tiroir',
    'diag-note':   'Échange offert · Réponse sous 24h · Sans engagement',

    'media-label': 'La preuve par mes médias',
    'media-desc':  'Je ne théorise pas la stratégie éditoriale : je la pratique chaque mois.',

    'testi-label': 'Ils ont fait le choix de la clarté',
    'testi-title': 'Ce qu\'ils disent',
    'testi1-quote':'« J\'ai eu le plaisir de collaborer avec Dalal pour la 2<sup>e</sup> édition de Neybras sur une thématique assez complexe, la cyber-résilience. Son leadership rédactionnel est remarquable : elle a compris et su mettre en avant mon expertise. Elle ne publie pas un magazine, elle construit une plateforme d\'influence stratégique. »',
    'testi1-name': 'Youssef El Amrani',
    'testi1-role': 'Responsable de projet · Recommandation LinkedIn, déc. 2025',
    'testi2-quote':'« Dalal apporte à un sujet juridique ce qui manque le plus à notre profession : la clarté. Mes analyses en arbitrage international ont trouvé, dans Neybras Magazine, un cadre éditorial à la hauteur de leur exigence. »',
    'testi2-name': 'M<sup>e</sup> Driss El Harti',
    'testi2-role': 'Avocat au Barreau de Tanger — arbitrage international · Contributeur Neybras',
    'testi3-quote':'« Travailler avec Dalal, c\'est voir son expertise traduite sans être trahie. Elle structure le propos, soigne la cohérence, et donne à un contenu spécialisé une vraie portée auprès des décideurs. »',
    'testi3-name': 'M<sup>e</sup> Amine Lahlou',
    'testi3-role': 'Avocat au Barreau de Casablanca — arbitrage · Contributeur Neybras',

    'faq-label': 'Questions fréquentes',
    'faq-title': 'Ce que l\'on me demande souvent',
    'faq1-q':   'Je publie déjà sur LinkedIn — quelle différence ?',
    'faq1-a':   'Publier entretient une présence ; ça ne construit pas un positionnement. La plupart des cabinets postent régulièrement sans que leurs prospects retiennent quoi que ce soit de précis. Mon travail n\'est pas de vous faire publier plus, mais de faire en sorte que <strong>chaque prise de parole renforce une même idée</strong> — celle qui vous rend identifiable et crédible. La différence n\'est pas la fréquence, c\'est <strong>la cohérence</strong>.',
    'faq2-q':   'Notre cabinet ne veut pas trop s\'exposer — est-ce compatible ?',
    'faq2-a':   'Oui, et c\'est même fréquent dans les professions du conseil. Se positionner ne veut pas dire se mettre en avant personnellement ni multiplier les publications. On peut construire une <strong>autorité discrète</strong> : un discours maîtrisé, quelques prises de parole choisies, une cohérence sur vos supports existants. La retenue, bien structurée, est elle-même un signal de sérieux.',
    'faq3-q':   'Comment se passe le premier échange ?',
    'faq3-a':   'Un appel en visioconférence d\'environ <strong>30 minutes</strong>, sans engagement. J\'écoute votre situation, je vous dis ce que je vois — clairement, sans rapport théorique — et nous identifions ensemble si une mission a du sens pour vous. Si ce n\'est pas le cas, je vous le dis. Vous repartez de cet échange avec une lecture plus nette de votre situation, que vous travailliez avec moi ensuite ou non.',
    'faq4-q':   'Pourquoi 7 000 DH pour un audit ?',
    'faq4-a':   'Parce que ce n\'est pas une check-list automatique. C\'est un diagnostic sur-mesure de votre positionnement, de la cohérence de votre discours et des opportunités que vous n\'exploitez pas — suivi d\'un plan d\'action priorisé et d\'une session de restitution. Le coût d\'un mauvais positionnement (opportunités perdues au profit d\'un concurrent moins bon mais mieux présenté) dépasse largement ce montant. <strong>L\'audit est conçu pour s\'amortir par ce qu\'il vous fait éviter.</strong>',
    'faq5-q':   'Travaillez-vous aussi en arabe ?',
    'faq5-a':   'Oui, et à un niveau éditorial réel — pas une traduction approximative. Beaucoup d\'organisations ont une communication française soignée et une communication arabe négligée ; ce décalage envoie un signal de fragilité. Je travaille les deux registres avec <strong>la même exigence</strong>, pour que votre discours reste cohérent quelle que soit la langue de votre interlocuteur.'
  },

  ar: {
    'nav-home':    'الرئيسية',
    'nav-method':  'المنهجية',
    'nav-offers':  'الخدمات',
    'nav-about':   'من أنا',
    'topbar-msg':  '<i class="fa-solid fa-pen-nib me-2"></i>مكاتب الاستشارة والـPME — أبني مكانتها التحريرية وأرسّخ مصداقيتها.',
    'topbar-cta':  'احجز أول نقاش ←',

    'hero-badge':  'مكاتب · شركات صغرى ومتوسطة · مهن الاستشارة',
    'hero-title':  'النفوذ لا يُفرَض، بل <span class="text-accent">يُبنى</span>.',
    'hero-lead':   'دلال فهمي — مستشارة في الاستراتيجية التحريرية والـ digital. أُعيد تموضع المكاتب والشركات الصغرى والمتوسطة لترقى صورتها إلى مستوى خبرتها الحقيقية.',
    'hero-cta1':   '<i class="fa-brands fa-whatsapp me-2"></i>احجز أول نقاش',
    'hero-cta2':   'اكتشف المنهجية',
    'trust-1':     '<i class="fa-solid fa-pen-nib me-2"></i>خبرة تحريرية متراكمة',
    'trust-2':     '<i class="fa-solid fa-newspaper me-2"></i>منابر إعلامية أسّستها',
    'trust-3':     '<i class="fa-solid fa-star me-2"></i>مرافقة استراتيجية راقية',
    'trust-4':     '<i class="fa-solid fa-language me-2"></i>خطاب مزدوج اللغة',

    'prob-label':     'افهم الواقع قبل أن تتحرك',
    'prob-title':     'ثلاثة مؤشرات تحذيرية',
    'prob-sub':       'هذه الحالات الثلاث تصف غالبية المنظمات التي تستثمر في التواصل دون أن تحصد نتائج بمستوى خبرتها الفعلية.',
    'prob1-title':    'ظهور بلا تأثير',
    'prob2-title':    'الفجوة بين المكانة الحقيقية والصورة المدركة',
    'prob3-title':    'تشتت الخطاب',
    'prob1-impact':   '<strong>ما يحدث:</strong> تنشر بانتظام. مؤشرات الحضور ترتفع. لكن صانعي القرار المستهدفين لا يتفاعلون — لأن التموضع الضبابي، حتى حين يكون مرئياً، لا يُقنع.',
    'prob2-impact':   '<strong>ما يحدث:</strong> مستوى خبرتك حقيقي. لكن صورتك الرقمية — الموقع، الشبكات، الدعائم — لا تعكسه. هذا التفاوت بين ما أنت عليه وما يُدرَك عنك يُولّد الشك حيث ينبغي أن تتبنى الثقة.',
    'prob3-impact':   '<strong>ما يحدث:</strong> موقعك يقول شيئاً، شبكاتك تقول شيئاً آخر، وتواصلك بالعربية يقول ثالثاً. كل رسالة معزولة تُضعف خطابك بدل أن تُعززه — وجمهورك لا يحتفظ بأي شيء محدد.',
    'prob1-cons':     '<strong>النتيجة:</strong> تستثمر في الظهور دون أن تبني مكانة راسخة.',
    'prob2-cons':     '<strong>ما يكلّفك ذلك:</strong> فرص تذهب لمنافس يُدرَك أنه أكثر تنظيماً — حتى وإن كان أقل كفاءة منك.',
    'prob3-cons':     '<strong>ما يكلّفك ذلك:</strong> أنت نشيط ومرئي. لكنك لا تُختار — لأن هويتك لا تنطبع بوضوح في ذاكرة من تخاطبهم.',
    'prob-conclusion':'المشكلة ليست الجهد. بل <strong>غياب البنية الاستراتيجية.</strong>',

    'meth-label':  'مقاربة Neybras',
    'meth-title':  'منهجية في 4 مراحل',
    'meth-sub':    'تفشل معظم استراتيجيات التواصل لأنها تتجاوز المراحل الأساسية. هذه المنهجية تبدأ بالفهم الحقيقي — قبل أي تنفيذ.',
    'step1-title': 'التشخيص',
    'step2-title': 'البناء',
    'step3-title': 'التنفيذ',
    'step4-title': 'التحسين المستمر',
    'step1-meta':  '<i class="fa-regular fa-clock me-1"></i>جلسة أولى',
    'step2-meta':  '<i class="fa-regular fa-clock me-1"></i>3 إلى 4 أسابيع',
    'step3-meta':  '<i class="fa-regular fa-clock me-1"></i>على المدى البعيد',
    'step4-meta':  '<i class="fa-regular fa-clock me-1"></i>شهرياً',
    'step1-obj':   'معظم المنظمات تتجاوز هذه المرحلة فتبني استراتيجيتها على افتراضات لا على قراءة حقيقية. هنا نبدأ برؤية واضحة لموقعك الفعلي، ونقاط ضعفك، ورافعاتك الأولى.',
    'step2-obj':   'تقويم المحتوى بلا أساس استراتيجي يُنتج ضجيجاً لا مصداقية. هذه المرحلة تُرسي الأساس: التموضع، الرسالة المحورية، الركائز التحريرية، الأسلوب. الإطار الذي يمنح معنىً لكل كلمة.',
    'step3-obj':   'التنفيذ بلا إطار يُنتج ضجيجاً. التنفيذ بإطار واضح يُنتج تموضعاً راسخاً. هذه المرحلة تُفعّل منظومتك التحريرية على قنواتك الرئيسية — بتناسق وانتظام، لا بالارتجال.',
    'step4-obj':   'استراتيجية لا تتكيّف تصبح جامدة وتفقد صلتها. كل شهر: تحليل ما يُحقق نتائج، وتعديل المحاور، وتعزيز الرافعات. الاستراتيجية تتطور معك ومع سوقك.',
    'step1-res':   'تعرف بدقة أين أنت، ما الذي يعيقك، وما الذي يستحق التفعيل أولاً.',
    'step2-res':   'بنية تواصلية متماسكة تستند إليها كل مراحل التنفيذ — بلا ارتجال.',
    'step3-res':   'كل منشور يُعزز تموضعك بدل أن يُخففه. مكانتك تتبنى مع كل كلمة.',
    'step4-res':   'قيادة استراتيجية حية، متوافقة مع أهدافك الحقيقية — لا مع خطة نظرية جامدة.',

    'off-label':   'خدماتي',
    'off-title':   'ثلاثة مستويات من المرافقة',
    'off-sub':     'من التشخيص الاستراتيجي إلى المرافقة التحريرية الشهرية.',
    'tab1':        '<i class="fa-solid fa-magnifying-glass-chart me-2"></i>التشخيص الاستراتيجي',
    'tab2':        '<i class="fa-solid fa-layer-group me-2"></i>البناء التحريري',
    'tab3':        '<i class="fa-solid fa-rocket me-2"></i>المرافقة الشهرية',
    'off1-title':  'التشخيص الاستراتيجي التحريري',
    'off2-title':  'البناء التحريري',
    'off3-title':  'المرافقة التحريرية الشهرية',
    'off1-price':  '<i class="fa-solid fa-tag me-2"></i>ابتداءً من 7 000 درهم',
    'off2-price':  '<i class="fa-solid fa-comments me-2"></i>حسب الطلب، بعد نقاش أولي',
    'off3-price':  '<i class="fa-solid fa-comments me-2"></i>حسب الطلب، بعد نقاش أولي',
    'off1-for':    'النشر بلا استراتيجية هو استنزاف للطاقة دون عائد. تغذّي معظم مكاتب الاستشارة والـPME قنواتها بانتظام — دون أثر قابل للقياس على مصداقيتها أو جاذبيتها أو مكانتها القطاعية. يحدد لكم التشخيص الاستراتيجي بدقة ما لا يعمل — وكيفية معالجته.',
    'off2-for':    'أنتم تنشرون، لكن محتواكم لا يُعزز خبرتكم ولا يُرسّخ مكانة مكتبكم أو مؤسستكم كمرجع في مجاله. يضع البناء التحريري حداً للارتجال: خط تحريري واضح، صيغ متكررة، وتقويم محكوم.',
    'off3-for':    'خبرتكم حقيقية، لكن تواصلكم لا يعكسها. يُنظر إليكم كفاعل من بين آخرين — لا كمرجع. تُصحح المرافقة الشهرية هذه الفجوة في الزمن: تحديد مستمر للتموضع، إنتاج محتوى متخصص، وتعديل دوري استناداً إلى مؤشرات السوق.',

    'about-label': 'المستشارة',
    'about-title': 'لماذا العمل مع دلال فهمي؟',
    'abt1-title':  'نظرة المحررة',
    'abt2-title':  'فهم عميق للسوق المغربي',
    'abt3-title':  'تناسق اللغتين والجمهورين',
    'abt1-desc':   'يفكر معظم مزودي الخدمة من حيث الصيغ، التواتر، والخوارزميات. ما يبني مصداقيتكم الفعلية لدى صانعي القرار — شركاء، مديرو مالية، مؤسسات — هو تماسك خطابكم على المدى البعيد. أدير منبرَين إعلاميين: أحدهما B2B في القانون والمالية، والآخر B2C راقٍ. أعرف ما يشدّ انتباه القارئ المتخصص — وما يُفقده منذ الجملة الأولى.',
    'abt2-desc':   'تُفضي الأساليب المستوردة بلا تكيّف محلي إلى رسائل لا تتناسب مع السوق المغربي. أكواد مؤسسية خاصة، جماهير مزدوجة اللغة ذات توقعات متمايزة، قطاعات في تحوّل متسارع — استراتيجية فاعلة هنا يجب أن تُفكَّر لهنا، لا أن تُنقل ببساطة.',
    'abt3-desc':   'كثير من المنظمات تمتلك خطابَين متوازيَين — أحدهما بالفرنسية والآخر بالعربية — دون تماسك استراتيجي بينهما. هذا التناقض يُرسل إشارة هشاشة. المكانة الراسخة تُبنى على استمرارية الخطاب، أياً كانت اللغة أو المحاور.',

    'proof-label': 'المصداقية والخبرة',
    'proof-title': 'لماذا تغيّر هذه النظرة كل شيء',
    'proof-sub':   'يمكن لأي شخص أن يُقدّم نفسه مستشاراً في التواصل. ما يُميّز النظرة الاستراتيجية الحقيقية هو ما شكّلها.',
    'stat1-title': 'إدارة تحريرية',
    'stat1-lbl':   'عقدٌ من الصرامة التحريرية، أُسخّره اليوم لإدارة منصّتين إعلاميتين أسّستُهما بنفسي: مجلة نيبراس (B2B — قانون، مالية، حوكمة) ونيبراس فاميلي (B2C راقية — تعليم، توجيه، تدبير مالي).<br>دليلٌ ملموس: أربعة أعداد ورقية من مجلة نيبراس صدرت منذ أكتوبر 2025، بـ 3000 نسخة لكل عدد توزَّع على صنّاع القرار في المجالين القانوني والمالي. نيبراس فاميلي انطلقت في أبريل 2026.',
    'stat2-title': 'منابر إعلامية أسّستها',
    'stat2-lbl':   'Neybras Magazine (B2B: القانون، المالية، الحوكمة) وNeybras Family (B2C الراقي: التعليم، التوجيه) — منبران فاعلان يُثبتان قدرة حقيقية على هيكلة خط تحريري رفيع وصونه على المدى البعيد.',
    'stat3-title': 'خبرة قطاعية',
    'stat3-lbl':   'مكاتب الاستشارة والتدقيق، المحاسبة وإدارة الثروات، المؤسسات المالية والـPME المنظَّمة — هذه البيئات المتطلبة تستوجب خبرة ميدانية وفهماً عميقاً لمنظومة القانون والمالية والأعمال.',
    'stat4-title': 'ثنائية اللغة والثقافة',
    'stat4-lbl':   'معظم مزودي الخدمة يعملون بلغة واحدة — والفجوة واضحة. خطاب مؤسسي بالعربية غير موفَّق يمكنه أن يُلغي جهود حضور فرنسي مصقول. إتقان السجلّين بمستوى تحريري رفيع نادر على السوق.',

    'diag-label':  'الخطوة الأولى',
    'diag-title':  'النقاش الأول',
    'diag-sub':    'تستثمر كثير من المنظمات في التواصل قبل امتلاك قراءة واضحة لواقعها. هذه الجلسة لتصحيح ذلك: 30 دقيقة لترى بوضوح أين أنت — وما الخطوة التالية المنطقية.',
    'deliv1':      'قراءة واضحة لما يُضعف تموضعك التحريري الحالي',
    'deliv2':      'تحديد الأولويات الواجب معالجتها — مرتّبة حسب الأثر لا الاستعجال',
    'deliv3':      'إطار عمل أولي موجّه نحو النتائج — بلا مصطلحات نظرية، بلا تقارير جاهزة',
    'diag-note':   'جلسة مجانية · رد خلال 24 ساعة · بدون أي التزام',

    'media-label': 'الدليل من خلال منصّاتي الإعلامية',
    'media-desc':  'أنا لا أُنظّر للاستراتيجية التحريرية، بل أمارسها شهرياً. مجلة نيبراس (B2B — قانون، مالية، حوكمة) ونيبراس فاميلي (B2C راقية) هما البرهان الملموس على ما أبنيه لعملائي.',

    'testi-label': 'اختاروا الوضوح',
    'testi-title': 'ما قالوه',
    'testi1-quote':'«سعدتُ بالتعاون مع دلال في العدد الثاني من نيبراس حول موضوع دقيق ومعقّد، هو المرونة السيبرانية. قيادتها التحريرية لافتة: فهمت خبرتي وأحسنت إبرازها. هي لا تُصدر مجلة، بل تبني منصّة نفوذ استراتيجية. أوصي بها بشدّة.»',
    'testi1-name': 'يوسف العمراني',
    'testi1-role': 'مدير مشروع · توصية على LinkedIn، دجنبر 2025',
    'testi2-quote':'«تمنح دلال للموضوع القانوني ما تفتقر إليه مهنتنا أكثر من غيره: الوضوح. تحليلاتي في التحكيم الدولي وجدت في مجلة نيبراس إطاراً تحريرياً في مستوى صرامتها.»',
    'testi2-name': 'الأستاذ إدريس الحارثي',
    'testi2-role': 'محامٍ بهيئة طنجة — التحكيم الدولي · مساهم في مجلة نيبراس',
    'testi3-quote':'«العمل مع دلال يعني أن ترى خبرتك مترجَمة دون أن تُخان. تُنظّم الطرح، وتعتني بالانسجام، وتمنح المحتوى المتخصّص امتداداً حقيقياً لدى صنّاع القرار.»',
    'testi3-name': 'الأستاذ أمين لحلو',
    'testi3-role': 'محامٍ بهيئة الدار البيضاء — التحكيم · مساهم في مجلة نيبراس',

    'faq-label': 'أسئلة شائعة',
    'faq-title': 'ما يُسأل عنه كثيراً',
    'faq1-q':   'أنشر بالفعل على LinkedIn — فما الفرق؟',
    'faq1-a':   'النشر يحافظ على حضور، لكنه لا يبني تموضعاً. أغلب المكاتب تنشر بانتظام دون أن يحتفظ عملاؤها المحتملون بأي فكرة واضحة. عملي ليس أن يجعلك تنشر أكثر، بل أن <strong>تُرسّخ كل مشاركة الفكرة نفسها</strong> — تلك التي تجعلك مميَّزاً وذا مصداقية. الفرق ليس في الوتيرة، بل في <strong>الانسجام</strong>.',
    'faq2-q':   'مكتبنا لا يرغب في الظهور كثيراً — فهل هذا متوافق؟',
    'faq2-a':   'نعم، بل هذا شائع في مهن الاستشارة. التموضع لا يعني التباهي الشخصي ولا الإكثار من المنشورات. يمكن بناء <strong>سلطة هادئة</strong>: خطاب مُحكَم، مشاركات قليلة ومختارة، وانسجام عبر وسائطك الحالية. التحفّظ، حين يُبنى جيداً، هو في حدّ ذاته إشارة جدّية.',
    'faq3-q':   'كيف يجري الحديث الأول؟',
    'faq3-a':   'مكالمة عبر تقنية الفيديو مدّتها حوالي <strong>30 دقيقة</strong>، دون أي التزام. أُنصت إلى وضعك، وأقول لك ما أراه — بوضوح، دون تقرير نظري — ونحدّد معاً إن كانت هناك مهمة ذات معنى بالنسبة إليك. وإن لم تكن كذلك، أقولها لك صراحةً. تخرج من هذا الحديث بقراءة أوضح لوضعك، سواء عملتَ معي بعد ذلك أم لا.',
    'faq4-q':   'لماذا 7 000 درهم مقابل تشخيص؟',
    'faq4-a':   'لأنه ليس قائمة تحقّق آلية. إنه تشخيص مُفصَّل لتموضعك، ولانسجام خطابك، وللفرص التي لا تستثمرها — يتبعه خطة عمل مرتّبة حسب الأولوية وجلسة لعرض النتائج. كلفة التموضع الخاطئ — فرصٌ تضيع لصالح منافس أقل كفاءة لكنه أفضل تقديماً — تفوق هذا المبلغ بكثير. <strong>التشخيص مُصمَّم ليغطّي كلفته بما يجنّبك إياه.</strong>',
    'faq5-q':   'هل تعملين بالعربية أيضاً؟',
    'faq5-a':   'نعم، وبمستوى تحريري حقيقي — لا ترجمة تقريبية. كثير من المؤسسات لديها تواصل فرنسي مُتقَن وتواصل عربي مُهمَل؛ هذا التفاوت يبعث إشارة هشاشة. أشتغل على المستويين <strong>بالصرامة نفسها</strong>، حتى يبقى خطابك منسجماً مهما كانت لغة مُحاوِرك.'
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
