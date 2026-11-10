/* Neybras — source unique des offres, prix et devises.
   Tout affichage de prix passe par js/neybras.js, qui lit cet objet :
   aucun montant n'est écrit en dur dans les pages.
   Pour changer un tarif : modifier ici, et nulle part ailleurs.

   Gabarits côté HTML :
     <span data-price="vitrine"></span>          → prix complet (DH, puis € et F CFA)
     <span data-money="vitrine.payments.0"></span> → un montant en DH (ex. acompte)
     <script type="application/ld+json" data-ld-offer="vitrine"> → offre schema.org complétée depuis ce fichier */
window.NEYBRAS_CONFIG = {
  brand: 'Neybras',
  site: 'https://neybras.com',

  /* Ordre d'affichage : DH d'abord, puis € et F CFA. */
  currencies: [
    { key: 'mad', label: 'DH',    iso: 'MAD', suffix: ' DH' },
    { key: 'eur', label: '€',     iso: 'EUR', suffix: ' €' },
    { key: 'xof', label: 'F CFA', iso: 'XOF', suffix: ' F CFA' }
  ],

  offers: {
    /* ── Sites web — prix fixes, sans « à partir de » ── */
    vitrine: {
      name: 'Cabinet Vitrine',
      price: { mad: 8500, eur: 800, xof: 525000 },
      delivery: '3 semaines',
      payments: [
        { label: 'à la commande', mad: 4250 },
        { label: 'à la livraison', mad: 4250 }
      ]
    },
    autorite: {
      name: 'Cabinet Autorité',
      price: { mad: 19500, eur: 1800, xof: 1200000 },
      /* Trois étapes de règlement ; les montants par étape ne sont pas arrêtés. */
      steps: ['à la commande', 'à la validation du prototype', 'à la mise en ligne']
    },
    serenite: {
      name: 'Sérénité Numérique',
      price: { mad: 500, eur: 50, xof: 33000 },
      period: 'par mois'
    },

    /* ── Conseil éditorial — offre complémentaire, tarifs « à partir de » ── */
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
