import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectService } from '@core/services';
import { select, Store } from '@ngrx/store';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { ModalFactoryService, LoadingService, ErrorService } from '@shared/services';
import { DataTableConfig } from '@shared/types';
import { AppState } from '@state/app-state';
import * as globalState from '@dashboard-state/index';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService]
})
export class BaseComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  dataDepartments: Observable<any[]>;
  dataProviders: Observable<any[]>;
  loadingProviders$: Observable<boolean>;

  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'nit', 'phone', 'seller_phone', 'actions'],
    titles: {
      name: 'Providers.Table.Titles.Name',
      nit: 'Providers.Table.Titles.Nit',
      phone: 'Providers.Table.Titles.PartnerPhone',
      seller_phone: 'Providers.Table.Titles.SellerPhone',
      actions: 'Acciones'
    },
    keys: ['partner.name', 'partner.nit', 'partner.phone', 'seller_phone', 'Tabla.Actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private selectData: SelectService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingProviders$ = this.loading.getLoading([
      globalState.LOAD_PROVIDERS,
      globalState.PROVIDERS_LOADED_SUCCESS,
      globalState.PROVIDERS_LOADED_FAIL
    ]);

    this.store$.dispatch(globalState.LOAD_PROVIDERS());
    this.store$.dispatch(globalState.LOAD_DEPARTMENTS());
    this.store$.dispatch(globalState.LOAD_MUNICIPALITIES());
    this.dataDepartments = this.store$.pipe(select(globalState.selectDepartments));
    this.dataProviders = this.store$.pipe(select(globalState.selectProviders));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  update(provider: any) {
    const department$ = this.selectData.getDepartmentByMunicipalityId(
      provider.partner.municipality_id
    );
    const municipality$ = this.selectData.getMunicipalityById(provider.partner.municipality_id);

    this.createModalForm()
      .pipe(
        switchMap(result => {
          return combineLatest([department$, municipality$, of(result)]);
        }),
        map(([department, municipality, result]) => {
          if (result.event !== MODAL_INITIAL_EVENT) {
            return { result };
          }
          const data = { provider, department, municipality };
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

  private createModalForm() {
    return this.modalFactory.create({ component: FormComponent, title: 'Providers.Modal.Title' });
  }

}
