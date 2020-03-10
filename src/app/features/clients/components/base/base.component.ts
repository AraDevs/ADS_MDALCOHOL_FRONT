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
import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { AppState } from '@state/app-state';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel]
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
    private store$: Store<any>,
    ) { }

  ngOnInit(): void {
    this.fields = this.formModel.getModel();
    this.form = this.formService.createPlainForm(this.fields as any);
    this.store$.dispatch(globalState.LOAD_DEPARTMENTS());
    this.store$.dispatch(globalState.LOAD_MUNICIPALITIES());
    this.store$.dispatch(globalState.LOAD_CLIENTS());
    this.data = this.store$.pipe(select(globalState.selectDepartments));
    this.dataClients = this.store$.pipe(select(globalState.selectClients));

    this.subs.sink =  this.form.get('department_id').valueChanges.subscribe(department => {
      const {id} = department;
      this.store$.dispatch(globalState.FILTER_MUNICIPALITIES({payload: {id}}));
    });

    // this.sucessService.sucess(state.SAVE_CLIENTS_SUCCESS, () => {
    //   this.store$.dispatch(globalState.LOAD_CLIENTS);
    // });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  save() {
    if (this.form.valid)
    {
      const values = this.form.value;

      const dataToSave = {
        business_name: values.business_name,
        dui: values.dui,
        registry_no: values.regisrty_no,
        person_type: values.person_type,
        seller_id: values.seller_id,
        partner: {
          name: values.name,
          address: values.address,
          municipality_id: values.municipality_id,
          nit: values.nit,
          phone: values.phone,
          state: values.state ? 1 : 0
        }
      };
      const action = state.SAVE_CLIENTS({ payload: { data: dataToSave } });
      this.store$.dispatch(action);
      return;
    }
  }

}
