import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { CustomFormsModule } from 'ngx-custom-validators';

import { AnimatedDirective, BadgeDirective, ClickOutsideDirective } from './directives';
import { 
  HeaderComponent,
  FullScreenLoaderComponent,
  MenuComponent,
  UserCardComponent } from './components';
import { MaterialModule } from '../material/material.module';
import { RestInterceptor } from './interceptors/rest.interceptor';

/**
 * Module which includes Application's main utils and singleton services. This module is only imported by AppModule.
 *
 * @date 2018-06-28
 * @export
 * @class CoreModule
 */
@NgModule({
  imports: [
    CommonModule,
    CustomFormsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    AnimatedDirective,
    BadgeDirective,
    ClickOutsideDirective,
    CommonModule,
    CustomFormsModule,
    FlexLayoutModule,
    FormsModule,
    FullScreenLoaderComponent,
    HeaderComponent,
    HttpClientModule,
    MenuComponent,
    UserCardComponent
  ],
  providers: [ 
    CookieService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestInterceptor,
      multi: true,
    }
  ],
  declarations: [
    AnimatedDirective,
    BadgeDirective,
    ClickOutsideDirective,
    FullScreenLoaderComponent,
    HeaderComponent,
    MenuComponent,
    UserCardComponent
  ]
})
export class CoreModule { }
