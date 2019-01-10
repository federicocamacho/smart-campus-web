import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

/**
 * Transforms an element into a badge (used for labels or notifications).
 *
 * @date 2018-10-31
 * @export
 */
@Directive({
  selector: '[scBadge]'
})
export class BadgeDirective implements OnInit {

  /**
   * Badge's background color as a string (receives HEX and color names).
   *
   * @memberof BadgeDirective
   */
  @Input('scBadge') color: string;

  /**
   * Creates an instance of BadgeDirective.
   * @date 2019-01-09
   * @param elr Reference to the element that has the directive.
   * @param renderer Angular Renderer.
   * @memberof BadgeDirective
   */
  constructor(public elr: ElementRef, public renderer: Renderer2) { }

  /**
   * Directive's onInit lifecycle. Adds the proper styling for the element.
   *
   * @date 2019-01-09
   * @memberof BadgeDirective
   */
  ngOnInit() {
    this.renderer.setStyle(this.elr.nativeElement, 'background-color', this.color);
    this.renderer.setStyle(this.elr.nativeElement, 'color', 'white');
    this.renderer.setStyle(this.elr.nativeElement, 'text-align', 'center');
    this.renderer.setStyle(this.elr.nativeElement, 'font-size', '11px');
    this.renderer.setStyle(this.elr.nativeElement, 'padding', '3px');
    this.renderer.setStyle(this.elr.nativeElement, 'border-radius', '10px');
  }

}
