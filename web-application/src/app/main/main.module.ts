import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CustomFormsModule } from 'ngx-custom-validators';

import { ApplicationComponent } from './applications/application/application.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CoreModule } from '../core/core.module';
import { FullScreenLoaderComponent } from './components/full-screen-loader/full-screen-loader.component';
import { GatewayComponent } from './gateways/gateway/gateway.component';
import { GatewaysComponent } from './gateways/gateways.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { LibrariesModule } from '../libraries/libraries.module';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuTreeComponent } from './components/menu-tree/menu-tree.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ObjectCardComponent } from './components/object-card/object-card.component';
import { ProfileComponent } from './profile/profile.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { WizardBtnsComponent } from './wizard/wizard-btns/wizard-btns.component';
import { WizardComponent } from './wizard/wizard.component';

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
    CoreModule,
    CustomFormsModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    LibrariesModule
  ],
  declarations: [
    ApplicationComponent,
    ApplicationsComponent,
    ConfirmDialogComponent,
    FullScreenLoaderComponent,
    GatewayComponent,
    GatewaysComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    MenuTreeComponent,
    NotFoundComponent,
    ObjectCardComponent,
    ProfileComponent,
    SectionTitleComponent,
    UserCardComponent,
    UserCardComponent,
    WizardComponent,
    WizardBtnsComponent
  ],
  entryComponents: [ ConfirmDialogComponent ],
  exports: [
    ApplicationComponent,
    ApplicationsComponent,
    ConfirmDialogComponent,
    FullScreenLoaderComponent,
    GatewayComponent,
    GatewaysComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    MenuTreeComponent,
    NotFoundComponent,
    ProfileComponent,
    SectionTitleComponent,
    UserCardComponent,
    WizardComponent
  ]
})
export class MainModule { }
