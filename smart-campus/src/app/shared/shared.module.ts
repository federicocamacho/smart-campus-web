import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CustomFormsModule } from 'ngx-custom-validators';

import { AnimatedDirective } from './directives/animated.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from '../libs/material.module';
import { PropertyTypePipe } from './pipes/property-type.pipe';

/**
 * Imports and exports all general Directives, Pipes and Components.
 *
 * @date 2019-04-09
 * @export
 */
@NgModule({
  declarations: [
    AnimatedDirective,
    ClickOutsideDirective,
    ConfirmDialogComponent,
    LoaderComponent,
    PropertyTypePipe
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
    HttpClientModule,
    PropertyTypePipe
  ]
})
export class SharedModule { }
