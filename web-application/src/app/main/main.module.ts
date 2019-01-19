import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ngx-custom-validators';
import {
  ConfirmDialogComponent,
  DeleteUserDialogComponent,
  HeaderComponent,
  FullScreenLoaderComponent,
  MenuComponent,
  ObjectCardComponent,
  UserCardComponent
} from './components';
import { 
  GatewayComponent,
  HomeComponent,
  LoginComponent,
  NotFoundComponent,
  ProfileComponent 
} from './';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';

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
    CustomFormsModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    DeleteUserDialogComponent,
    FullScreenLoaderComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    NotFoundComponent,
    ProfileComponent,
    UserCardComponent,
    GatewayComponent,
    ObjectCardComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [ DeleteUserDialogComponent, ConfirmDialogComponent ],
  exports: [
    FullScreenLoaderComponent,
    GatewayComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    NotFoundComponent,
    ProfileComponent,
    UserCardComponent
  ]
})
export class MainModule { }
