import { NgModule } from '@angular/core';
import { NgxFormsValidatorComponent } from './ngx-forms-validator.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    NgxFormsValidatorComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    NgxFormsValidatorComponent,
  ]
})
export class NgxFormsValidatorModule { }
