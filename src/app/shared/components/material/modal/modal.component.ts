import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewChild,
  Injector
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalAnchorDirective } from '@shared/directives';
import { ModalData } from '@shared/types';
import { DYNAMIC_MODAL_DATA } from '@shared/constants';

@Component({
  selector: 'md-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild(ModalAnchorDirective, { static: true }) ref: ModalAnchorDirective;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ModalData,
    private componentFactory: ComponentFactoryResolver,
    private modalRef: MatDialogRef<ModalComponent>
  ) {}

  ngOnInit(): void {
    const componentFactory = this.componentFactory.resolveComponentFactory(this.data.component);

    const viewContainerRef = this.ref.viewContainerRef;
    const injector = Injector.create({
      providers: [{ provide: DYNAMIC_MODAL_DATA, useValue: { hello: 'Hello Moises Leonor' } }]
    });
    const componentRef = viewContainerRef.createComponent(componentFactory, null, injector);
  }
}
