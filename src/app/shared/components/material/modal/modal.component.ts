import {
  Component,
  ComponentFactoryResolver,
  Inject,
  Injector,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DYNAMIC_MODAL_DATA, MODAL_ACCEPT_EVENT, MODAL_INITIAL_EVENT } from '@shared/constants';
import { ModalAnchorDirective } from '@shared/directives';
import { ModalData } from '@shared/types';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'md-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {
  @ViewChild(ModalAnchorDirective, { static: true }) ref: ModalAnchorDirective;

  private events = new BehaviorSubject<string>(MODAL_INITIAL_EVENT);
  private component: any;

  events$ = this.events.asObservable();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private componentFactory: ComponentFactoryResolver,
    private modalRef: MatDialogRef<ModalComponent>
  ) {}

  ngOnInit(): void {
    const componentFactory = this.componentFactory.resolveComponentFactory(this.data.component);

    const viewContainerRef = this.ref.viewContainerRef;
    const injector = Injector.create({
      providers: [{ provide: DYNAMIC_MODAL_DATA, useValue: { modalRef: this.modalRef } }]
    });
    const componentRef = viewContainerRef.createComponent(componentFactory, null, injector);
    this.component = componentRef.instance;
  }

  getRenderedComponent<T>(): T {
    return this.component;
  }

  accept() {
    this.events.next(MODAL_ACCEPT_EVENT);
  }

  cancel() {
    this.modalRef.close();
  }
}
