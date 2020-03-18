import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '@shared/components';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'any' })
export class ModalFactoryService {
  constructor(private dialog: MatDialog) {}

  create(data: { title: string; component: any; data?: any }) {
    const modal = this.dialog.open(ModalComponent, {
      data,
      panelClass: ['p-0', 'md-modal']
    });

    return modal.afterOpened().pipe(
      switchMap(() => modal.componentInstance.events$),
      map(event => ({ modal, event }))
    );
  }
}
