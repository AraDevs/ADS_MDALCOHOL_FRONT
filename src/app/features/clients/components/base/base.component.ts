import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FactoryFormService, SelectService } from '@core/services';
import { InputControlConfig } from '@core/types';
import { FormModel } from '@features/clients/config/form-model';
import * as globalState from '@state/index';
import * as state from '@features/clients/state';
import { Store, select } from '@ngrx/store';
import { DataTableConfig } from '@shared/types';
import { SelectControlConfig } from '@core/types/forms/select-control-config';
import { Observable, combineLatest, of } from 'rxjs';
import { SubSink } from 'subsink';
import { AppState } from '@state/app-state';
import { SuccessService, ModalFactoryService } from '@shared/services';
import { take, filter, switchMap, map } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';
import { MODAL_INITIAL_EVENT } from '@shared/constants';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

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
    },
    keys: ['business_name', 'dui', 'registry_no', 'person_type', 'partnerName', 'actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private selectData: SelectService
    ) { }

  ngOnInit(): void {
    this.store$.dispatch(globalState.LOAD_DEPARTMENTS());
    this.store$.dispatch(globalState.LOAD_MUNICIPALITIES());
    this.store$.dispatch(globalState.LOAD_CLIENTS());
    this.store$.dispatch(globalState.LOAD_SELLERS());
    this.data = this.store$.pipe(select(globalState.selectDepartments));
    this.dataClients = this.store$.pipe(select(globalState.selectClients));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  update(client: any) {
    const department$ = this.selectData.getDepartmentByMunicipalityId(client.partner.municipality_id);
    const municipality$ = this.selectData.getMunicipalityById(client.partner.municipality_id);
    const seller$ = this.selectData.getSellerById(client.seller_id);

    this.modalFactory
      .create({ component: FormComponent })
      .pipe(
        switchMap(result => {
          return combineLatest([department$, municipality$, seller$, of(result)]);
        }),
        map(([department, municipality, seller, result]) => {
          if (result.event !== MODAL_INITIAL_EVENT) {
            return { result };
          }
          const data = { client, department, municipality, seller };
          return { data, result };
        })
      )
      .subscribe(({ data, result }) => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event, data });
      });
  }

  add() {
    this.modalFactory
    .create({ component: FormComponent })
    .pipe(filter(result => result.event !== MODAL_INITIAL_EVENT))
    .subscribe(result => {
      const component = result.modal.
      componentInstance.
      getRenderedComponent<FormComponent>();
      component.execute({ event: result.event});
    });
  }
}
