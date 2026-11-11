/* Neybras — source unique des offres, prix, modalités et libellés de prix.
   Tout affichage de prix passe par js/prices.js, qui lit cet objet ; les pages
   statiques en reçoivent le même rendu à la génération (contenu de secours).
   Pour changer un tarif : modifier ici, et nulle part ailleurs.
   Montants en nombres ; les chaînes « 8 500 DH » en sont dérivées.
   Jetons des libellés : {total} prix global en DH, {p0} et {p1} versements en DH. */
window.NEYBRAS_CONFIG = {
  brand: 'Neybras',
  site: 'https://neybras.com',

  /* Ordre d'affichage : DH d'abord, puis F CFA (XOF/XAF). */
  currencies: [
    { key: 'mad', label: 'DH',    iso: 'MAD' },
    { key: 'xof', label: 'F CFA', iso: 'XOF' }
  ],

  offers: {
    /* ── Sites web — prix fixes, sans « à partir de » ── */
    essentiel: {
      name: 'Site Essentiel',
      price: { mad: 5500, xof: 350000 },
      deliveryLine: 'Livraison : 7 jours ouvrés après réception de vos éléments.',
      paymentTitle: 'Paiement en deux fois',
      payments: [
        { label: 'à la commande', mad: 2750, xof: 175000 },
        { label: 'à la livraison', mad: 2750, xof: 175000 }
      ],
      microcopy: 'Offre Site Essentiel : {total}. Paiement en deux fois : {p0} à la commande, {p1} à la livraison.'
    },
    vitrine: {
      name: 'Site Vitrine',
      price: { mad: 11500, xof: 750000 },
      /* Option bilingue : Français / Arabe ou Français / Anglais (incluse dans le Site Autorité). */
      multilingue: { mad: 2500, xof: 160000 },
      deliveryLine: 'Livraison : 15 jours ouvrés.',
      paymentTitle: 'Paiement en trois fois',
      payments: [
        { label: 'à la commande (40 %)', mad: 4600, xof: 300000 },
        { label: 'à la validation de la maquette (30 %)', mad: 3450, xof: 225000 },
        { label: 'à la mise en ligne (30 %)', mad: 3450, xof: 225000 }
      ],
      microcopy: 'Offre Site Vitrine : {total}. Paiement en trois fois : 40 % à la commande, 30 % à la validation de la maquette, 30 % à la mise en ligne.'
    },
    autorite: {
      name: 'Site Autorité',
      price: { mad: 19500, xof: 1250000 },
      deliveryLine: 'Livraison : 3 à 4 semaines.',
      paymentTitle: 'Paiement étalé sur 3 ou 4 échéances',
      steps: [
        { label: 'selon le calendrier de production', line: 'Selon le calendrier de production.' }
      ],
      microcopy: 'Échéancier détaillé communiqué dans la proposition.'
    },
    serenite: {
      name: 'Sérénité Numérique',
      price: { mad: 450, xof: 30000 },
      period: 'par mois',
      microcopy: '{total} par mois, sans engagement après la première année.'
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
