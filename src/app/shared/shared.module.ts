import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { MaterialModule } from '@shared/material/material.module';
import { InputComponent } from '@shared/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlGeneratorComponent } from './components/material/control-generator/control-generator.component';

@NgModule({
  declarations: [InputComponent, ControlGeneratorComponent],
  imports: [CommonModule, TranslocoModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, TranslocoModule, MaterialModule, FormsModule, ReactiveFormsModule,
    InputComponent, ControlGeneratorComponent],
})
export class SharedModule {
}
