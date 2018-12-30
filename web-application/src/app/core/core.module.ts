import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CookieService } from 'ngx-cookie-service';
import { FullScreenLoaderComponent } from './components/full-screen-loader/full-screen-loader.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { RestInterceptor } from './interceptors/rest.interceptor';

import { CustomFormsModule } from 'ngx-custom-validators';

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
    FlexLayoutModule,
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    CustomFormsModule,
    FullScreenLoaderComponent,
    HttpClientModule,
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
    FullScreenLoaderComponent,
    UserCardComponent
  ]
})
export class CoreModule { }
