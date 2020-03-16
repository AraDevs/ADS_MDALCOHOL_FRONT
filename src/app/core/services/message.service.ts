import { Injectable } from '@angular/core';
import { Message } from '@core/types';
import { TranslocoService } from '@ngneat/transloco';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private transalate: TranslocoService) {}

  private message(message: Message, icon: SweetAlertIcon) {
    return Swal.fire(message.title, message.message, icon);
  }

  success(message: string, title = '') {
    return this.message(
      {
        message: this.transalate.translate(message),
        title: !!title ? this.transalate.translate(title) : ''
      },
      'success'
    );
  }

  error(message: string, title = '') {
    return this.message(
      {
        message: this.transalate.translate(message),
        title: !!title ? this.transalate.translate(title) : ''
      },
      'error'
    );
  }

  warning(message: string, title = '') {
    return this.message(
      {
        message: this.transalate.translate(message),
        title: !!title ? this.transalate.translate(title) : ''
      },
      'warning'
    );
  }
}
