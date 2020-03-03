import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslocoModule} from '@ngneat/transloco';
import {MaterialModule} from '@shared/material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslocoModule, MaterialModule],
  exports: [CommonModule, TranslocoModule, MaterialModule]
})
export class SharedModule {
}
