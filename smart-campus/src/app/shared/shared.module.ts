import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CustomFormsModule } from 'ngx-custom-validators';

import { AnimatedDirective } from './directives/animated.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../libs/material.module';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    AnimatedDirective,
    ClickOutsideDirective,
    ConfirmDialogComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    CustomFormsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [
    AnimatedDirective,
    ClickOutsideDirective,
    ConfirmDialogComponent,
    CustomFormsModule,
    FlexLayoutModule,
    FormsModule,
    LoaderComponent,
    HttpClientModule
  ]
})
export class SharedModule { }
