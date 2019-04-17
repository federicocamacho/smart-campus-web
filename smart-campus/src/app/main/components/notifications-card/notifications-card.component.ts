import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take, takeUntil } from 'rxjs/operators';

import { AppService } from 'src/app/app.service';
import { Notification } from 'src/app/shared/models/notification';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { Util } from 'src/app/shared/utils/util';
import { Router } from '@angular/router';

/**
 * Notifications card component.
 * Shows the last 10 notifications for the user and an option to see all the notifications.
 *
 * @date 2019-04-15
 * @export
 */
@Component({
  selector: 'sc-notifications-card',
  templateUrl: './notifications-card.component.html',
  styleUrls: ['./notifications-card.component.css']
})
export class NotificationsCardComponent extends Subscribable implements OnInit {

  /**
   * Stores the notifications displayed in the card.
   *
   */
  public notifications: Notification[];

  /**
   * Creates an instance of NotificationsCardComponent.
   * @date 2019-04-15
   * @param appService - Main service.
   * @param notificationService - Notifications management service.
   * @param router - Angular router.
   */
  constructor(
    private appService: AppService,
    private notificationService: NotificationService,
    private router: Router) {
      super();
      this.notifications = [];
    }

  ngOnInit() {
    this.getNotifications();
  }

  /**
   * Retrieves the 10 first notifications for the user consuming the get notifications REST service.
   *
   * @date 2019-04-15
   */
  private getNotifications(): void {
    this.notificationService.getNotificationsByUser(this.appService.user.id, 0, 10)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (notifications: Notification[]) => this.notifications = notifications,
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
  }

  /**
   * Checks if a date (in Date or String UTC) is today.
   *
   * @date 2019-04-15
   * @param date - date to be verified.
   * @returns true if the date is today, false if not or the date is null.
   */
  public isToday(date: string | Date): boolean {
    if (typeof(date) === 'string') {
      return Util.isToday(new Date(date));
    }
    return Util.isToday(date);
  }

  /**
   * Navigates to Notifications section.
   *
   * @date 2019-04-15
   */
  public seeAll(): void {
    this.router.navigate([ '/dashboard', 'notifications' ]);
  }

}
