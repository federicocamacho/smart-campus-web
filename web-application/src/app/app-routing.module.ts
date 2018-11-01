import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { LoginGuard, AuthGuard } from './core/guards';
import { HomeComponent } from './main/home/home.component';
import { NotFoundComponent } from './main/not-found/not-found.component';

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
 * App's Root Routing Module.
 *
 * @date 2018-06-28
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
