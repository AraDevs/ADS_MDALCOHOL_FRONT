import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appModalAnchor]'
})
export class ModalAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
