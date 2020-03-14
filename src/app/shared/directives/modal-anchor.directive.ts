import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mdModalAnchor]'
})
export class ModalAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
