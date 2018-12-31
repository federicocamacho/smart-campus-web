import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

/**
 * Directive used to know when a click was done outside the current HTML element.
 *
 * @date 2018-12-30
 * @export
 */
@Directive({
    selector: '[scClickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef) { }

    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
      if (!targetElement) {
          return;
      }

      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      if (!clickedInside) {
          this.clickOutside.emit(event);
      }
    }
}
