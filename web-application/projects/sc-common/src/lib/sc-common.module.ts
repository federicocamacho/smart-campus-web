import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScCommonComponent } from './sc-common.component';
import { HeaderComponent } from './navigation/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatBadgeModule, MatButtonModule, MatIconModule } from '@angular/material';
import { BadgeDirective } from './directives/badge.directive';
import { MenuComponent } from './navigation/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    ScCommonComponent, 
    HeaderComponent,
    BadgeDirective,
    MenuComponent
  ],
  exports: [
    ScCommonComponent,
    HeaderComponent,
    BadgeDirective,
    MenuComponent
  ]
})
export class ScCommonModule { }
