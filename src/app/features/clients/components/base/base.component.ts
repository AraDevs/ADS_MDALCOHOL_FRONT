import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '@core/services';
import { InputControlConfig } from '@core/types';
import { FormModel } from '@features/clients/config/form-model';
import * as globalState from '@state/index';
import * as state from '@features/clients/state';
import { Store, select } from '@ngrx/store';
import { DataTableConfig } from '@shared/types';
import { SelectControlConfig } from '@core/types/forms/select-control-config';
import { Observable, combineLatest } from 'rxjs';
import { SubSink } from 'subsink';
import { AppState } from '@state/app-state';
import { SuccessService } from '@shared/services';
import { take } from 'rxjs/operators';

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
  data: Observable<any[]>;
  dataM: Observable<any[]>;
  dataClients: Observable<any[]>;
  tableConfig: DataTableConfig = {
    displayedColumns: ['business_name', 'dui', 'registry_no', 'person_type', 'partnerName', 'actions'],
    titles: {
      business_name: 'Clients.Table.Titles.BusinessName',
      dui: 'Clients.Table.Titles.Dui',
      registry_no: 'Clients.Table.Titles.Registry',
      person_type: 'Clients.Table.Titles.PersonType',
      partnerName: 'Clients.Table.Titles.SellerId',
      actions: 'Acciones'
    }
    // sortActiveColumn: 'name',
    // sortDirection: 'asc'
  };

  constructor(
    private formModel: FormModel,
    private formService: FormService,
    private store$: Store<AppState>,
    private successService: SuccessService
    ) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);
    this.store$.dispatch(globalState.LOAD_DEPARTMENTS());
    this.store$.dispatch(globalState.LOAD_MUNICIPALITIES());
    this.store$.dispatch(globalState.LOAD_CLIENTS());
    this.store$.dispatch(globalState.LOAD_SELLERS());
    this.data = this.store$.pipe(select(globalState.selectDepartments));
    this.dataClients = this.store$.pipe(select(globalState.selectClients));

    this.subs.sink =  this.form.get('departmentId').valueChanges.subscribe(department => {
      const {id} = department;
      this.store$.dispatch(globalState.FILTER_MUNICIPALITIES({payload: {id}}));
    });

    this.successService.success(state.SAVE_CLIENTS_SUCCESS, () => {
      this.store$.dispatch(globalState.LOAD_CLIENTS);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const dataToSave = {
        business_name: values.businessName,
        dui: values.dui,
        registry_no: values.registry,
        person_type: values.personType.value,
        seller_id: values.seller.id,
        partner: {
          name: values.sellerName,
          address: values.address,
          municipality_id: values.municipality.id,
          nit: values.nit,
          phone: values.phone,
          state: values.state ? 1 : 0
        }
      };
      const action = state.SAVE_CLIENTS({ payload: { data: dataToSave } });
      this.store$.dispatch(action);
    }
  }

  update(client: any) {
    const deparment$ = this.store$.pipe(
      select(globalState.selectDepartmentByMunicipalityId, client.partner.municipality_id),
      take(1)
    );

    const municipality$ = this.store$.pipe(
      select(globalState.selectMunicipalityById, client.partner.municipality_id),
      take(1)
    );

    const seller$ = this.store$.pipe(
      select(globalState.selectSellersById, client.seller.id),
      take(1)
    );

    console.log(client);
    combineLatest([deparment$, municipality$, seller$ ]).subscribe(([deparment, municipality, seller]) => {
      this.form.patchValue({
        departmentId: {id: deparment.id, name: deparment.name, label: deparment.name},
        municipality,
        businessName: client.business_name,
        dui: client.dui,
        registry: client.registry_no,
        personType: {
          label: client.person_type,
          value: client.person_type
        },
        seller: {
          ...seller, label: seller.name, value: seller.name
        },
        sellerName: client.seller.name,
        address: client.partner.address,
        nit: client.partner.nit,
        phone: client.partner.phone,
        state: !!client.partner.state
      });
    // console.log(this.form.value)
    });
  }

  // delete(client: any) {
  //   console.log(client);
  // }
}
