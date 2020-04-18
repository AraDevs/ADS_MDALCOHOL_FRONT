import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormModel } from '@features/purchase/config/form-model';
import { MODAL_INITIAL_EVENT, MODAL_ACCEPT_EVENT, DYNAMIC_MODAL_DATA } from '@shared/constants';
import { FormGroup } from '@angular/forms';
import { InputControlConfig, SelectControlConfig } from '@core/types';
import { Subject } from 'rxjs';
import { FormService } from '@features/purchase/components/form/form.service';
import { MessageService } from '@core/services/message.service';

@Component({
  selector: 'md-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormModel, FormService]
})
export class FormComponent implements OnInit {
  private errors = new Subject<string[]>();
  private update = false;
  private purchase: any;

  form: FormGroup;
  fields: Partial<InputControlConfig | SelectControlConfig>[];
  errors$ = this.errors.asObservable();

  @ViewChild('formBtn') formBtn: ElementRef<HTMLButtonElement>;
  constructor(
    private formModel: FormModel,
    private formService: FormService,
    private message: MessageService,
    @Inject(DYNAMIC_MODAL_DATA) private data: any
  ) { }

  ngOnInit(): void {
  }

  save() {
    if (this.form.valid) {
      const values = this.form.value;
      const data = this.formService.getPurchaseDTO(values);
      if (this.update) {
      } else {
      }
    } else {
      this.message.error('Messages.InvalidForm');
    }
  }

  execute({ event, data }: any) {
    if (event === MODAL_INITIAL_EVENT) {
      this.update = !!data;
      if (this.update) {
        this.purchase = this.formService.getPurchase(data);
        this.form.patchValue(this.purchase);
      }
    } else if (event === MODAL_ACCEPT_EVENT) {
      this.formBtn.nativeElement.click();
    }
  }

}
