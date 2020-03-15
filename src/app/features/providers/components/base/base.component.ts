import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormModel } from '@features/providers/config/form-model';
import { select, Store } from '@ngrx/store';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { ModalFactoryService, SuccessService } from '@shared/services';
import { DataTableConfig } from '@shared/types';
import { AppState } from '@state/app-state';
import * as globalState from '@state/index';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { FormComponent } from '../form/form.component';
import { ProvidersService } from './providers.service';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [FormModel, SuccessService, ProvidersService]
})
export class BaseComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

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
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private providers: ProvidersService
  ) {}

  ngOnInit(): void {
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
    const department$ = this.providers.getDepartment(provider);
    const municipality$ = this.providers.getMunicipality(provider);

    this.modalFactory
      .create({ component: FormComponent })
      .pipe(
        switchMap(result => {
          return combineLatest([department$, municipality$, of(result)]);
        }),
        map(([department, municipality, result]) => {
          if (result.event !== MODAL_INITIAL_EVENT) {
            return { result };
          }
          const data = { provider, department, municipality };
          return { data: this.providers.getProviderDTO(data), result };
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
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }

  delete(client: any) {
    console.log(client);
  }
}
