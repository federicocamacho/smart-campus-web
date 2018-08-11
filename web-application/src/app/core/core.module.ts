import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@angular/cdk/layout';
import { SocketIoModule } from 'ngx-socket-io';

import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { SharedModule } from '../shared/shared.module';

/**
 *Module which includes Application's main utils and singleton services. This module is only imported in AppModule.
 *
 * @author Federico Camacho
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
    RouterModule,
    SocketIoModule,
    LayoutModule,
    SharedModule
  ],
  declarations: [
    FooterComponent,
    NavComponent
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FooterComponent,
    FormsModule,
    HttpClientModule,
    NavComponent,
    SharedModule,
    SocketIoModule
  ],
})
export class CoreModule { }
