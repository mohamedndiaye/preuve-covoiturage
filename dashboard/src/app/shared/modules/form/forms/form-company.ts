import { FormControl, Validators } from '@angular/forms';

import { Company } from '~/core/entities/shared/company';
import { regexp } from '~/core/config/validators';

export class FormCompany {
  siren = new FormControl();
  naf_entreprise = new FormControl(); // tslint:disable-line variable-name
  nature_juridique = new FormControl(); // tslint:disable-line variable-name
  cle_nic = new FormControl(); // tslint:disable-line variable-name
  rna = new FormControl();
  vat_intra = new FormControl(); // tslint:disable-line variable-name

  constructor(company: Company) {
    this.siren.setValue(company.siren);
    this.siren.setValidators([Validators.required, Validators.pattern(regexp.siren)]);

    this.naf_entreprise.setValue(company.naf_entreprise);
    this.naf_entreprise.setValidators([Validators.pattern(regexp.naf)]);

    this.nature_juridique.setValue(company.nature_juridique);

    this.cle_nic.setValue(company.cle_nic);
    this.cle_nic.setValidators([Validators.pattern(regexp.nic)]);

    this.rna.setValue(company.rna);

    this.vat_intra.setValue(company.vat_intra);
    this.vat_intra.setValidators([Validators.pattern(regexp.vatIntra)]);
  }
}
