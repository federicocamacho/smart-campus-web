import { Injectable } from '@angular/core';
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
export class DashboardService {

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
   * Creates an instance of DashboardService.
   * @date 2019-04-09
   */
  constructor() { }

}
