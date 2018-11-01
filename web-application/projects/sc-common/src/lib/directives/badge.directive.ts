import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';

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

  constructor(public elr: ElementRef, public renderer: Renderer) {}

  ngOnInit() {
    this.renderer.setElementStyle(this.elr.nativeElement, 'background-color', this.color);
    this.renderer.setElementStyle(this.elr.nativeElement, 'color', 'white');
    this.renderer.setElementStyle(this.elr.nativeElement, 'text-align', 'center');
    this.renderer.setElementStyle(this.elr.nativeElement, 'font-size', '11px');
    this.renderer.setElementStyle(this.elr.nativeElement, 'padding', '3px');
    this.renderer.setElementStyle(this.elr.nativeElement, 'border-radius', '10px');
  }
}
