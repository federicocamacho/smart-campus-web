import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

/**
 * Animates the current element using animate.css styles.
 * The animation name is required.
 * To se the available animations go to https://github.com/daneden/animate.css.
 *
 * @date 2018-11-15
 * @export
 */
@Directive({
  selector: '[scAnimated]'
})
export class AnimatedDirective implements OnInit {

  /**
   * Animate.css animation's name.
   *
   * @memberof AnimatedDirective
   */
  @Input('scAnimated') animation: string;
  
  constructor(public elr: ElementRef, public renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementClass(this.elr.nativeElement, 'animated', true);
    this.renderer.setElementClass(this.elr.nativeElement, this.animation, true);
  }
}
