/* Neybras — source unique des offres, prix, modalités et libellés de prix.
   Tout affichage de prix passe par js/prices.js, qui lit cet objet ; les pages
   statiques en reçoivent le même rendu à la génération (contenu de secours).
   Pour changer un tarif : modifier ici, et nulle part ailleurs.
   Montants en nombres ; les chaînes « 8 500 DH » en sont dérivées.
   Jetons des libellés : {total} prix global en DH, {p0} et {p1} versements en DH. */
window.NEYBRAS_CONFIG = {
  brand: 'Neybras',
  site: 'https://neybras.com',

  /* Ordre d'affichage : DH d'abord, puis € et F CFA. */
  currencies: [
    { key: 'mad', label: 'DH',    iso: 'MAD' },
    { key: 'eur', label: '€',     iso: 'EUR' },
    { key: 'xof', label: 'F CFA', iso: 'XOF' }
  ],

  offers: {
    /* ── Sites web — prix fixes, sans « à partir de » ── */
    vitrine: {
      name: 'Cabinet Vitrine',
      price: { mad: 8500, eur: 800, xof: 525000 },
      delivery: '10 jours après validation du cahier des charges',
      paymentTitle: 'Paiement en deux fois',
      payments: [
        { label: 'à la commande', mad: 4250, eur: 400, xof: 262500 },
        { label: 'à la livraison', mad: 4250, eur: 400, xof: 262500 }
      ],
      /* Le prix total précède toujours le montant du premier versement. */
      microcopy: 'Offre Cabinet Vitrine : {total}. Paiement en deux fois : {p0} à la commande, {p1} à la livraison.'
    },
    autorite: {
      name: 'Cabinet Autorité',
      price: { mad: 19500, eur: 1800, xof: 1200000 },
      paymentTitle: 'Paiement en trois étapes',
      /* Trois jalons, sans pourcentages ni montants (non arrêtés commercialement). */
      steps: [
        { label: 'à la commande',                line: 'À la commande — cadrage et lancement.' },
        { label: 'à la validation du prototype', line: 'À la validation du prototype — validation du design.' },
        { label: 'à la mise en ligne',           line: 'À la mise en ligne — livraison finale.' }
      ],
      microcopy: 'Échéancier détaillé communiqué dans la proposition.'
    },
    serenite: {
      name: 'Sérénité Numérique',
      price: { mad: 500, eur: 50, xof: 33000 },
      period: 'par mois',
      microcopy: "Un mois offert avec l'offre Cabinet Vitrine. Puis {total} par mois, sans engagement."
    },

    /* ── Conseil éditorial & autorité — offre complémentaire, tarifs « à partir de » ── */
    audit: {
      name: 'Audit stratégique éditorial',
      from: true,
      price: { mad: 7000 }
    },
    structuration: {
      name: 'Structuration éditoriale',
      from: true,
      price: { mad: 18000 }
    },
    accompagnement: {
      name: 'Accompagnement mensuel',
      from: true,
      price: { mad: 5000 },
      period: 'par mois'
    }
  }
};
