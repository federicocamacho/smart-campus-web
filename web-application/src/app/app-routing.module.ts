import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, LoginGuard } from './core/guards';
import {
  ApplicationsComponent,
  GatewayComponent,
  HomeComponent, 
  LoginComponent,
  NotFoundComponent,
  ProfileComponent 
} from './main';

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
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'config/gateways',
    pathMatch: 'full',
    component: GatewayComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'applications',
    pathMatch: 'full',
    component: ApplicationsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
  /*
    For other modules use Lazy Loading with:
  {
    path: 'other',
    loadChildren: 'path/to/module#OtherModule',
    canActivate: [ AuthGuardService ]
  }
  */
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
