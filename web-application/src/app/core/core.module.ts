import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { CustomFormsModule } from 'ngx-custom-validators';

import { AnimatedDirective, BadgeDirective, ClickOutsideDirective } from './directives';
import { RestInterceptor } from './services/rest.interceptor';

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
    HttpClientModule
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
  ]
})
export class CoreModule { }
