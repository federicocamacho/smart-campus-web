import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CustomFormsModule } from 'ngx-custom-validators';

import { AnimatedDirective } from './directives/animated.directive';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AnimatedDirective,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    CustomFormsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    AnimatedDirective,
    CustomFormsModule,
    FlexLayoutModule,
    FormsModule,
    LoaderComponent,
    HttpClientModule
  ]
})
export class SharedModule { }
