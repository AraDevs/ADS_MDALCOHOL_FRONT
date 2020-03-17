import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService, FactoryFormService, LoadingService, SelectService } from '@core/services';
import { InputControlConfig, ControlConfig, SelectControlConfig } from '@core/types';
import {  } from '@features/users/config/login-form-config';
import * as userState from '@features/users/state';
import { select, Store } from '@ngrx/store';
import { CustomErrorMessage, DataTableConfig } from '@shared/types';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, map, tap, switchMap } from 'rxjs/operators';
import { PlainActionCreator } from '@core/types/effect-factory/action-types';
import { AppState } from '@state/app-state';
import { ModalFactoryService, SuccessService } from '@shared/services';
import { FormComponent } from '../form/form.component';
import { MODAL_INITIAL_EVENT } from '@shared/constants';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  dataUsers: Observable<any[]>;

  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'username', 'actions'],
    titles: {
      name: 'Users.Table.Titles.Name',
      username: 'Users.Table.Titles.User',
      actions: 'Acciones'
    },
    keys: ['name', 'username', 'actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(userState.LOAD_USERS());
    this.dataUsers = this.store$.pipe(select(userState.selectUsers));
  }

  update(user: any)
  {
    this.modalFactory
      .create({component: FormComponent})
      .pipe(
        switchMap(result => {
          return combineLatest([of(result)]);
        }),
        map(([result]) => {
          if (result.event !== MODAL_INITIAL_EVENT) {
            return { result };
          }
          const data = { user };
          return { data, result };
        })
      )
      .subscribe(({ data, result }) => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event, data });
      });
  }

  add(){
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
