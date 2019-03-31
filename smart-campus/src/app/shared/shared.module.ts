import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedDirective } from './directives/animated.directive';

@NgModule({
  declarations: [
    AnimatedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnimatedDirective
  ]
})
export class SharedModule { }
