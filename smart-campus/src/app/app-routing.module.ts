import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './main/pages/applications/application/application.component';
import { ApplicationsComponent } from './main/pages/applications/applications.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { AuthenticationComponent } from './main/pages/authentication/authentication.component';
import { DashboardGuard } from './core/guards/dashboard.guard';
import { DashboardTemplateComponent } from './main/templates/dashboard-template/dashboard-template.component';
import { GatewayComponent } from './main/pages/gateways/gateway/gateway.component';
import { GatewaysComponent } from './main/pages/gateways/gateways.component';
import { LoginComponent } from './main/components/login/login.component';
import { NotFoundComponent } from './main/pages/not-found/not-found.component';
import { PasswordRecoveryComponent } from './main/components/password-recovery/password-recovery.component';
import { ProcessComponent } from './main/pages/processes/process/process.component';
import { ProcessesComponent } from './main/pages/processes/processes.component';
import { SigninComponent } from './main/components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signin',
        component: SigninComponent,
      },
      {
        path: 'password',
        component: PasswordRecoveryComponent,
      }
    ],
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'dashboard',
    component: DashboardTemplateComponent,
    children: [
      {
        path: 'applications',
        component: ApplicationsComponent,
        pathMatch: 'full'
      },
      {
        path: 'applications/:id',
        component: ApplicationComponent
      },
      {
        path: 'gateways',
        component: GatewaysComponent,
        pathMatch: 'full'
      },
      {
        path: 'gateways/:id',
        component: GatewayComponent
      },
      {
        path: 'processes',
        component: ProcessesComponent,
        pathMatch: 'full'
      },
      {
        path: 'processes/:id',
        component: ProcessComponent
      }
    ],
    canActivate: [ DashboardGuard ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

/**
 * Sets and exports the Main routes.
 *
 * @date 2019-04-09
 * @export
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
