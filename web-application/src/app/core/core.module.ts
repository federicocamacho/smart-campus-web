import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CookieService } from 'ngx-cookie-service';

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
    HttpClientModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ CookieService ]
})
export class CoreModule { }
