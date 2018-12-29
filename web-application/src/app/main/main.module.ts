import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ScCommonModule } from 'sc-common';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';

import { CustomFormsModule } from 'ngx-custom-validators';

/**
 * Application's main module (not lazy-loaded) which also includes Login component
 *
 * @date 2018-06-28
 * @export
 * @class MainModule
 */
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FlexLayoutModule,
    FormsModule,
    CustomFormsModule,
    MaterialModule,
    ScCommonModule
  ],
  declarations: [
    LoginComponent,
    HomeComponent, 
    NotFoundComponent
  ]
})
export class MainModule { }
