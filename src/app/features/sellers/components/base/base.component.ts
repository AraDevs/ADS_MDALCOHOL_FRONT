import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FactoryFormService } from '@core/services';
import { InputControlConfig } from '@core/types';
import { FormModel } from '@features/sellers/config/form-model';
import * as globalState from '@state/index';
import * as sellerState from '@features/sellers/state';
import { select, Store } from '@ngrx/store';
import { DataTableConfig } from '@shared/types';
import { Observable, combineLatest, of } from 'rxjs';
import { AppState } from '@state/app-state';
import { SuccessService, ModalFactoryService } from '@shared/services';
import { FormComponent } from '../form/form.component';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  dataSellers: Observable<any[]>;

  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'seller_code', 'state', 'actions'],
    titles: {
      name: 'Sellers.Table.Name',
      seller_code: 'Sellers.Table.SellerCode',
      state: 'Sellers.Table.State',
      actions: 'Sellers.Table.Actions'
    },
    keys: ['name', 'seller_code', 'state', 'actions']
  };

  constructor(private store$: Store<AppState>, private modalFactory: ModalFactoryService) {}

  ngOnInit(): void {
    this.store$.dispatch(globalState.LOAD_SELLERS());
    this.dataSellers = this.store$.pipe(select(globalState.selectSellers));
  }

  update(seller: any) {
    this.modalFactory
      .create({ component: FormComponent, title: '' })
      .pipe(
        switchMap(result => {
          return combineLatest([of(result)]);
        }),
        map(([result]) => {
          if (result.event !== MODAL_INITIAL_EVENT) {
            return { result };
          }
          const data = { seller };
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
      .create({ component: FormComponent, title: '' })
      .pipe(filter(result => result.event !== MODAL_INITIAL_EVENT))
      .subscribe(result => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }
}
