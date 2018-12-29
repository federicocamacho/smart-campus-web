import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

/**
 * Util class that destroys all {@link takeUntil()} observers in the OnDestroy cycle.
 *
 * @date 2018-11-04
 * @export
 */
export class Cleanable implements OnDestroy {

  /**
   * {@link Subject} that emits a value and completes when the component is going to be destroyeded.
   *
   * @memberof Cleanable
   */
  public destroyed:  Subject<void>;

  constructor() {
    this.destroyed = new Subject();
  }

  ngOnDestroy() {
    console.log('Cleaning component...');
    this.destroyed.next();
    this.destroyed.complete();
  }

}
