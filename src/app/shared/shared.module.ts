import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { MaterialModule } from '@shared/material/material.module';
import { InputComponent } from '@shared/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlGeneratorComponent } from './components/material/control-generator/control-generator.component';
import { SelectComponent } from './components/material/select/select.component';
import { DataTableComponent } from './components/material/data-table/data-table.component';
import { CheckboxComponent } from './components/material/checkbox/checkbox.component';
import { RadioComponent } from './components/material/radio/radio.component';
import { FormGeneratorComponent } from './components/material/form-generator/form-generator.component';
import { ModalComponent } from './components';
import { ModalAnchorDirective } from './directives';
import { DatepickerComponent } from './components/material/datepicker/datepicker.component';

@NgModule({
  declarations: [
    InputComponent,
    ControlGeneratorComponent,
    SelectComponent,
    DataTableComponent,
    CheckboxComponent,
    RadioComponent,
    FormGeneratorComponent,
    ModalComponent,
    ModalAnchorDirective,
    DatepickerComponent
  ],
  imports: [CommonModule, TranslocoModule, MaterialModule, FormsModule, ReactiveFormsModule],
  entryComponents: [ModalComponent],
  exports: [
    CommonModule,
    TranslocoModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ControlGeneratorComponent,
    SelectComponent,
    DataTableComponent,
    DataTableComponent,
    CheckboxComponent,
    RadioComponent,
    FormGeneratorComponent,
    ModalComponent,
    ModalAnchorDirective,
    DatepickerComponent
  ]
})
export class SharedModule {}
