import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectService } from '@core/services';
import { select, Store } from '@ngrx/store';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { ModalFactoryService, LoadingService } from '@shared/services';
import { DataTableConfig } from '@shared/types';
import { AppState } from '@state/app-state';
import * as globalState from '@state/index';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { FormComponent } from '../form/form.component';
import { SpecialPriceComponent } from '../special-price/special-price.component';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService]
})
export class BaseComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  data: Observable<any[]>;
  dataM: Observable<any[]>;
  dataClients: Observable<any[]>;
  loadingClients$: Observable<boolean>;
  tableConfig: DataTableConfig = {
    displayedColumns: [
      'business_name',
      'dui',
      'registry_no',
      'person_type',
      'partnerName',
      'actions'
    ],
    titles: {
      business_name: 'Clients.Table.Titles.BusinessName',
      dui: 'Clients.Table.Titles.Dui',
      registry_no: 'Clients.Table.Titles.Registry',
      person_type: 'Clients.Table.Titles.PersonType',
      partnerName: 'Clients.Table.Titles.SellerId',
      actions: 'Acciones'
    },
    keys: ['business_name', 'dui', 'registry_no', 'person_type', 'partnerName', 'Tabla.Actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private selectData: SelectService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingClients$ = this.loading.getLoading([
      globalState.LOAD_CLIENTS,
      globalState.CLIENTS_LOADED_SUCCESS,
      globalState.CLIENTS_LOADED_FAIL
    ]);

    this.store$.dispatch(globalState.LOAD_DEPARTMENTS());
    this.store$.dispatch(globalState.LOAD_MUNICIPALITIES());
    this.store$.dispatch(globalState.LOAD_CLIENTS());
    this.store$.dispatch(globalState.LOAD_SELLERS());
    this.store$.dispatch(globalState.LOAD_INVENTORIES());

    this.data = this.store$.pipe(select(globalState.selectDepartments));
    this.dataClients = this.store$.pipe(select(globalState.selectClients));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  update(client: any) {
    const department$ = this.selectData.getDepartmentByMunicipalityId(
      client.partner.municipality_id
    );
    const municipality$ = this.selectData.getMunicipalityById(client.partner.municipality_id);
    const seller$ = this.selectData.getSellerById(client.seller_id);

    this.createModalForm()
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
    this.createModalForm()
      .pipe(filter(result => result.event !== MODAL_INITIAL_EVENT))
      .subscribe(result => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }

  specialPrice(client: any) {
    this.createModalPrice().subscribe(result => {
      const { componentInstance } = result.modal;
      const component = componentInstance.getRenderedComponent<SpecialPriceComponent>();
      component.execute({ event: result.event, data: client });
    });
  }

  private createModalForm() {
    return this.modalFactory.create({ component: FormComponent, title: 'Clients.Modal.Titles.FormModal' });
  }

  private createModalPrice() {
    return this.modalFactory.create({
      component: SpecialPriceComponent,
      title: 'Clients.Modal.Titles.SpecialPrice',
      displayAcceptButton: false
    });
  }
}
