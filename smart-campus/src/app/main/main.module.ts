import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { SigninComponent } from './components/signin/signin.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { DashboardTemplateComponent } from './templates/dashboard-template/dashboard-template.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MaterialModule } from '../libs/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SectionCardComponent } from './components/section-card/section-card.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    SigninComponent,
    PasswordRecoveryComponent,
    DashboardTemplateComponent,
    NotFoundComponent,
    UserCardComponent,
    SectionCardComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class MainModule { }
