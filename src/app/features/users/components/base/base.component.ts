import { Component, OnInit } from '@angular/core';
import {} from '@features/users/config/form-model';
import * as userState from '@features/users/state';
import { select, Store } from '@ngrx/store';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import { ModalFactoryService, LoadingService } from '@shared/services';
import { DataTableConfig } from '@shared/types';
import { AppState } from '@state/app-state';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';
import * as UserState from '@features/users/state';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [LoadingService]
})
export class BaseComponent implements OnInit {
  dataUsers: Observable<any[]>;
  loadingUsers$: Observable<boolean>;

  tableConfig: DataTableConfig = {
    displayedColumns: ['name', 'username', 'actions'],
    titles: {
      name: 'Users.Table.Titles.Name',
      username: 'Users.Table.Titles.User',
      actions: 'Table.Actions'
    },
    keys: ['name', 'username', 'Tabla.Actions']
  };

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {

    this.loadingUsers$ = this.loading.getLoading([
      UserState.LOAD_USERS,
      UserState.USERS_LOADED_SUCCESS,
      UserState.USER_LOADED_FAIL
    ]);


    this.store$.dispatch(userState.LOAD_USERS());
    this.dataUsers = this.store$.pipe(select(userState.selectUsers));
  }

  update(user: any) {
    this.createFormModal()
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

  add() {
    this.createFormModal()
      .pipe(filter(result => result.event !== MODAL_INITIAL_EVENT))
      .subscribe(result => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }

  private createFormModal() {
    return this.modalFactory.create({ component: FormComponent, title: 'Users.Modal.Title' });
  }
}
