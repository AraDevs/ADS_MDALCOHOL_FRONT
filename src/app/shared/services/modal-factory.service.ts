import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@shared/components';

@Injectable({ providedIn: 'any' })
export class ModalFactoryService {
  constructor(private dialog: MatDialog) {}

  create(component: any) {
    this.dialog.open(ModalComponent, {
      data: { component },
      panelClass: ['p-0', 'md-modal']
    });
  }
}
