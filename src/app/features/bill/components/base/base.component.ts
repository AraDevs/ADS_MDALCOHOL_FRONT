import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FormComponent } from '../form/form.component';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app-state';
import { ModalFactoryService } from '@shared/services';
import { MODAL_INITIAL_EVENT } from '@shared/constants';
import * as globalState from '@state/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'md-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  dataClients: Observable<any[]>;

  constructor(
    private store$: Store<AppState>,
    private modalFactory: ModalFactoryService
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(globalState.LOAD_CLIENTS_ACTIVE());
  }

  add() {
    this.createModalForm()
      .pipe(filter((result) => result.event !== MODAL_INITIAL_EVENT))
      .subscribe((result) => {
        const component = result.modal.componentInstance.getRenderedComponent<FormComponent>();
        component.execute({ event: result.event });
      });
  }

  private createModalForm() {
    return this.modalFactory.create({
      component: FormComponent,
      title: 'Bill.Modal.Titles.FormModal',
    });
  }
}
