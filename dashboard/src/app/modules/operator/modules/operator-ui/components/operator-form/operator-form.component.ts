import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '~/core/services/authentication/authentication.service';
import { TerritoryService } from '~/modules/territory/services/territory.service';
import { Address, Company, Territory } from '~/core/entities/territory/territory';
import { FormAddress } from '~/shared/modules/form/forms/form-address';
import { FormCompany } from '~/shared/modules/form/forms/form-company';
import { FormContact } from '~/shared/modules/form/forms/form-contact';
import { Contact } from '~/core/entities/shared/contact';
import { Operator } from '~/core/entities/operator/operator';

@Component({
  selector: 'app-operator-form',
  templateUrl: './operator-form.component.html',
  styleUrls: ['./operator-form.component.scss'],
})
export class OperatorFormComponent implements OnInit {
  public territoryForm: FormGroup;

  constructor(
    public authService: AuthenticationService,
    private fb: FormBuilder,
    private _territoryService: TerritoryService,
  ) {}

  ngOnInit() {
    this.initTerritoryForm();
    this.initTerritoryFormValue();
    this.checkPermissions();
  }

  get controls() {
    return this.territoryForm.controls;
  }

  public onSubmit(): void {
    if ('_id' in this.territoryForm.value) {
      this._territoryService.patch(this.territoryForm.value);
    }
  }

  private initTerritoryFormValue(): void {
    this._territoryService.loadTerritory().subscribe(
      () => {},
      (err) => {
        // TODO TMP DELETE WHEN BACK IS LINKED
        const operator = new Operator({
          _id: '5c66d89760e6ee004a6cab1f',
          nom_commercial: 'Opérateur',
          raison_sociale: 'Opérateur SAS',
          company: new Company({
            siren: '123456789',
            naf_entreprise: '1234A',
          }),
          address: new Address({
            street: '5 rue de brest',
            postcode: '69002',
            city: 'Lyon',
            country: 'France',
          }),
        });

        this._territoryService._territory$.next(territory);
      },
    );
    this._territoryService._territory$.subscribe((territory: Territory | null) => {
      if (territory) {
        const { name, acronym, address, company, contacts } = territory;
        this.territoryForm.setValue({ name, acronym, address, company, contacts });
      }
    });
  }

  private initTerritoryForm(): void {
    this.territoryForm = this.fb.group({
      name: ['', Validators.required],
      acronym: ['', Validators.max(12)],
      address: this.fb.group(new FormAddress(new Address({ street: null, city: null, country: null, postcode: null }))),
      company: this.fb.group(new FormCompany(new Company({ siren: null }))),
      contacts: this.fb.group({
        rgpd_dpo: this.fb.group(new FormContact(new Contact({ firstname: null, lastname: null, email: null }))),
        rgpd_controller: this.fb.group(new FormContact(new Contact({ firstname: null, lastname: null, email: null }))),
        technical: this.fb.group(new FormContact(new Contact({ firstname: null, lastname: null, email: null }))),
      }),
    });
  }

  private checkPermissions(): void {
    if (!this.authService.hasAnyPermission(['territory.update'])) {
      this.territoryForm.disable({ onlySelf: true });
    }
  }
}
