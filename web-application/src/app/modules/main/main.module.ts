import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent, LoginComponent, NotFoundComponent} from './pages';
import { SharedModule } from '../../shared/shared.module';

/**
 *Application's main module which also includes Login component
 *
 * @author Federico Camacho
 * @date 2018-06-28
 * @export
 * @class MainModule
 */
@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    NotFoundComponent
  ]
})
export class MainModule { }
