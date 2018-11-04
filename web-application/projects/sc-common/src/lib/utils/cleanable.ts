import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

/**
 * Util class that destroys all {@link takeUntil()} observers in the OnDestroy event.
 *
 * @date 2018-11-04
 * @export
 */
export class Cleanable implements OnDestroy {

  /**
   * {@link Subject} that emits a value and completes when the component is going to be destroyed.
   *
   * @memberof Cleanable
   */
  public destroy:  Subject<void>;

  constructor() {
    this.destroy = new Subject();
  }

  ngOnDestroy() {
    console.log('Cleaning component');
    this.destroy.next();
    this.destroy.complete();
  }

}
