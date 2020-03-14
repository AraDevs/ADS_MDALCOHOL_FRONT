import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/services';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { FormModel } from '@features/providers/config/form-model';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { Observable, combineLatest } from 'rxjs';
import * as globalState from '@state/index';
import * as state from '@features/providers/state';
import { SubSink } from 'subsink';
import { DataTableConfig } from '@shared/types';
import { take } from 'rxjs/operators';
import { SuccessService } from '@shared/services';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel, SuccessService]
})
export class BaseComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  dataDepartments: Observable<any[]>;
  dataProviders: Observable<any[]>;
  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'nit', 'phone', 'seller_phone', 'actions'],
    titles: {
      name: 'Providers.Table.Titles.Name',
      nit: 'Providers.Table.Titles.Nit',
      phone: 'Providers.Table.Titles.PartnerPhone',
      seller_phone: 'Providers.Table.Titles.SellerPhone',
      actions: 'Acciones'
    }
  };

  constructor(
    private formModel: FormModel,
    private formService: FormService,
    private store$: Store<AppState>,
    private successService: SuccessService
  ) {}

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);
    this.store$.dispatch(globalState.LOAD_PROVIDERS());
    this.store$.dispatch(globalState.LOAD_DEPARTMENTS());
    this.store$.dispatch(globalState.LOAD_MUNICIPALITIES());
    this.dataDepartments = this.store$.pipe(select(globalState.selectDepartments));
    this.dataProviders = this.store$.pipe(select(globalState.selectProviders));

    this.subs.sink =  this.form.get('department').valueChanges.subscribe(department => {
      const {id} = department;
      this.store$.dispatch(globalState.FILTER_MUNICIPALITIES({payload: {id}}));
    });

    this.successService.success(state.SAVE_PROVIDERS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_PROVIDERS);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const dataToSave = {
        seller_phone: values.seller_phone,
        partner: {
          name: values.name,
          address: values.address,
          munipality_id: values.municipality  .id,
          nit: values.nit,
          phone: values.partner_phone,
          state: values.state ? 1 : 0
        }
      };
      const action = state.SAVE_PROVIDERS({ payload: { data: dataToSave }});
      this.store$.dispatch(action);
    }
  }

  update(provider: any) {
    const deparment$ = this.store$.pipe(
      select(globalState.selectDepartmentByMunicipalityId, provider.partner.municipality_id),
      take(1)
    );

    const municipality$ = this.store$.pipe(
      select(globalState.selectMunicipalityById, provider.partner.municipality_id),
      take(1)
    );

    console.log(provider);
    combineLatest([deparment$, municipality$ ]).subscribe(([deparment, municipality]) => {
      this.form.patchValue({
        department: {id: deparment.id, name: deparment.name, label: deparment.name},
        municipality,
        seller_phone: provider.seller_phone,
        name: provider.partner.name,
        address: provider.partner.address,
        nit: provider.partner.nit,
        partner_phone: provider.partner.phone,
        state: !!provider.partner.state
      });
    });
  }

  delete(client: any) {
    console.log(client);
  }
}