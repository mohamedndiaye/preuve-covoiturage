// Operator information

export const OPERATOR_DATA = {
  data: [
    'nom_commercial',
    'raison_sociale',
    'address.street',
    'address.postcode',
    'address.city',
    'address.country',
    'company.siren',
    'company.naf_etablissement',
    'company.naf_entreprise',
    'company.nature_juridique',
    'company.cle_nic',
    'company.rna',
    'company.vat_intra',
    'bank.bank_name',
    'bank.client_name',
    'bank.iban',
    'bank.bic',
  ],
  editable: [
    'nom_commercial',
    'raison_sociale',
    'address.street',
    'address.postcode',
    'address.city',
    'address.country',
    'company.siren',
    'company.naf_etablissement',
    'company.naf_entreprise',
    'company.nature_juridique',
    'company.cle_nic',
    'company.rna',
    'company.vat_intra',
    'bank.bank_name',
    'bank.client_name',
    'bank.iban',
    'bank.bic',
  ],
  editInputType: {
    nom_commercial: 'string',
    raison_sociale: 'string',
    'company.siren': 'siren',
    'address.street' : 'string',
    'address.postcode' : 'string',
    'address.city' : 'string',
    'address.country' : 'string',
    'company.naf_etablissement' : 'string',
    'company.naf_entreprise' : 'string',
    'company.nature_juridique' : 'string',
    'company.cle_nic' : 'string',
    'company.rna' : 'string',
    'company.vat_intra' : 'string',
    'bank.bank_name': 'string',
    'bank.client_name': 'string',
    'bank.iban': 'string',
    'bank.bic': 'string',

  },
};
