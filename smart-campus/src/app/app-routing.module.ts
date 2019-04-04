import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './main/components/login/login.component';
import { AuthenticationComponent } from './main/pages/authentication/authentication.component';
import { SigninComponent } from './main/components/signin/signin.component';
import { PasswordRecoveryComponent } from './main/components/password-recovery/password-recovery.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { DashboardTemplateComponent } from './main/templates/dashboard-template/dashboard-template.component';
import { DashboardGuard } from './core/guards/dashboard.guard';
import { NotFoundComponent } from './main/pages/not-found/not-found.component';
import { ApplicationsComponent } from './main/pages/applications/applications.component';
import { ApplicationComponent } from './main/pages/applications/application/application.component';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
