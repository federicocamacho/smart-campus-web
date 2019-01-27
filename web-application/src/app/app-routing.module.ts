import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationsComponent } from './main/applications/applications.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GatewayComponent } from './main/gateways/gateway/gateway.component';
import { GatewaysComponent } from './main/gateways/gateways.component';
import { HomeComponent } from './main/home/home.component';
import { LoginGuard } from './core/guards/login.guard';
import { LoginComponent } from './main/login/login.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { ProfileComponent } from './main/profile/profile.component';
import { WizardComponent } from './main/wizard/wizard.component';

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
    component: GatewaysComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'config/gateway/:id',
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
    path: 'applications/:id/:section',
    pathMatch: 'full',
    component: WizardComponent,
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
