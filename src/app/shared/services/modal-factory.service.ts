import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@shared/components';
import { map, switchMap } from 'rxjs/operators';
import { ModalData } from '@shared/types';

@Injectable({ providedIn: 'any' })
export class ModalFactoryService {
  constructor(private dialog: MatDialog) {}

  create(data: ModalData) {
    const displayAcceptButton = data.displayAcceptButton === false ? false : true;
    const modal = this.dialog.open(ModalComponent, {
      data: { ...data, displayAcceptButton },
      panelClass: ['p-0', 'md-modal']
    });

    return modal.afterOpened().pipe(
      switchMap(() => modal.componentInstance.events$),
      map(event => ({ modal, event }))
    );
  }
}
