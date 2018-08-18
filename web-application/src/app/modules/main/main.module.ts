import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HomeComponent, LoginComponent, NotFoundComponent} from './pages';
import { SharedModule } from '../../shared/shared.module';

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
    FlexLayoutModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    NotFoundComponent
  ]
})
export class MainModule { }
