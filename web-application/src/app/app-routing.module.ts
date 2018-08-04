import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent, NotFoundComponent, HomeComponent } from './modules/main/pages';
import { LoginGuard, AuthGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ LoginGuard ]
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    children: [ ],
    canActivate: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  /*
    For other modules use Lazy Loading with:
  {
    path: 'other',
    loadChildren: 'path/to/module#OtherModule',
    canActivate: [ AuthGuardService ]
  }
  */
  {
    path: 'not-found',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

/**
 *App's Root Routing Module.
 *
 * @author Federico Camacho
 * @date 2018-06-28
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
