import { Injectable, EventEmitter, OnDestroy } from '@angular/core';

import { CoreModule } from 'src/app/core/core.module';

/**
 * Dashboard service to store global information.
 *
 * @date 2019-04-09
 * @export
 */
@Injectable({
  providedIn: CoreModule
})
export class DashboardService implements OnDestroy {

  /**
   * Indicates if the user card is opened or not.
   *
   */
  public isUserCardOpened: boolean;

  /**
   * Indicates if the notifications card is opened or not.
   *
   */
  public isNotificationsCardOpened: boolean;

  /**
   * Indicates if the notification card (alert) is shown or not.
   *
   */
  public isNotificationShown: boolean;

  /**
   * Emits an event any time it's necessary to refresh the administration statistics.
   *
   */
  public refreshStatistics: EventEmitter<void> = new EventEmitter();

  /**
   * Creates an instance of DashboardService.
   * @date 2019-04-09
   */
  constructor() { }

  ngOnDestroy() {
    this.refreshStatistics.complete();
    this.refreshStatistics = null;
  }

}
