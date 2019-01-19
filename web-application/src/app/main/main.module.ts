import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { CustomFormsModule } from 'ngx-custom-validators';

import {
  DeleteUserDialogComponent,
  HeaderComponent,
  FullScreenLoaderComponent,
  MenuComponent,
  SectionTitleComponent,
  UserCardComponent
} from './components';
import { 
  ApplicationComponent,
  ApplicationsComponent,
  HomeComponent,
  LoginComponent,
  NotFoundComponent,
  ProfileComponent 
} from './';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

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
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ApplicationComponent,
    ApplicationsComponent,
    DeleteUserDialogComponent,
    FullScreenLoaderComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    NotFoundComponent,
    ProfileComponent,
    SectionTitleComponent,
    UserCardComponent
  ],
  entryComponents: [ DeleteUserDialogComponent ],
  exports: [
    FullScreenLoaderComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    NotFoundComponent,
    ProfileComponent,
    SectionTitleComponent,
    UserCardComponent
  ]
})
export class MainModule { }
