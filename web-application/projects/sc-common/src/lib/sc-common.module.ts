import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScCommonComponent } from './sc-common.component';
import { HeaderComponent } from './navigation/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatBadgeModule, MatButtonModule, MatIconModule } from '@angular/material';
import { BadgeDirective } from './directives/badge.directive';
import { MenuComponent } from './navigation/menu/menu.component';
import { AnimatedDirective } from './directives/animated.directive';

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
    AnimatedDirective,
    BadgeDirective,
    HeaderComponent,
    MenuComponent
  ],
  exports: [
    ScCommonComponent,
    AnimatedDirective,
    BadgeDirective,
    HeaderComponent,
    MenuComponent
  ]
})
export class ScCommonModule { }
