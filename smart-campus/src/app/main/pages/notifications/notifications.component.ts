import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { take, takeUntil } from 'rxjs/operators';

import { ApiResponse } from 'src/app/shared/models/api-response';
import { AppService } from 'src/app/app.service';
import { DataTable } from 'src/app/shared/utils/data-table';
import { Gateway } from 'src/app/shared/models/gateway';
import { GatewayService } from 'src/app/core/services/gateway.service';
import { Notification } from 'src/app/shared/models/notification';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NotificationsFilter } from 'src/app/shared/models/types';
import { Process } from 'src/app/shared/models/process';
import { ProcessService } from 'src/app/core/services/process.service';
import { Util } from 'src/app/shared/utils/util';
import { MatSortable } from '@angular/material';

@Component({
  selector: 'sc-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class NotificationsComponent extends DataTable<Notification, NotificationsFilter> implements OnInit {

  /**
   * Lists of gateways associated to the user.
   */
  public gatewaysSelect: Gateway[];

  /**
   * List of processes associated to the user.
   */
  public processSelect: Process[];

  /**
   * Indicates if the called web service to get the list of processes has finished.
   */
  public processesReady: boolean;

  /**
   * Indicates if the called web service to get the list of gateways has finished.
   */
  public gatewaysReady: boolean;

  public startDate: Date;

  public endDate: Date;

  public expandedElement: Notification | null;

  constructor(
    private appService: AppService,
    private gatewayService: GatewayService,
    private notificationService: NotificationService,
    private processService: ProcessService) {
    super();
    this.displayedColumns = [ 'gateway', 'process', 'alive', 'read', 'timestamp', 'actions' ];
    this.gatewaysSelect = [];
    this.processSelect = [ new Process(0, 'Ninguno') ];
  }

  ngOnInit() {
    super.initDataTable();
    // by default sort by timestamp
    this.sort.sort(({id: 'timestamp', start: 'desc'}) as MatSortable);
    this.dataSource.sort = this.sort;

    this.getNotifications();
    this.getGateways();
    this.getProcesses();
  }

  private getNotifications(): void {
    this.notificationService.getNotificationsByUser(this.appService.user.id)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (notifications: Notification[]) => {
          this.notificationService.notifications = notifications;
          this.dataSource.data = notifications;
        },
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
  }

  /**
   * Retrieves the gateway for the user logged in.
   *
   * @date 2019-04-04
   */
  private getGateways(): void {
    this.gatewayService.getGatewaysByUserId(this.appService.user.id)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (gateways: Gateway[]) => {
          this.gatewayService.gateways = gateways;
          this.buildGatewaysSelect();
          this.gatewaysReady = true;
        },
        (err: HttpErrorResponse) => this.appService.handleGenericError(err));
  }

  private buildGatewaysSelect(): void {
    if (!this.gatewayService.gateways) {
      return;
    }

    this.gatewayService.gateways.forEach(gateway => this.gatewaysSelect.push(gateway));
  }

  private getProcesses(): void {
    this.processService.getProcessesByUserId(this.appService.user.id)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (processes: Process[]) => {
          this.processService.processes = processes;
          this.buildProcessesSelect();
          this.processesReady = true;
        }
      );
  }

  private buildProcessesSelect(): void {
    if (!this.processService.processes) {
      return;
    }

    this.processService.processes.forEach(process => this.processSelect.push(process));
  }

  public onDeleteRecord(id: number): void {
    this.notificationService.deleteNotification(id)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (res: ApiResponse) => {
          this.appService.showSnack(res.message);
          if (res.successful) {
            this.notificationService.notifications.splice(
              this.notificationService.notifications.findIndex(notification => notification.id === id), 1);
            this.afterRecordDeleted();
          }
        },
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
  }

  public toggleExpansion(notification: Notification): void {
    if (this.expandedElement === notification) {
      this.expandedElement = null;
    } else {
      this.expandedElement = notification;
      // changed selection, then mark the notification as read.
      if (!notification.read) {
        this.notificationService.unreadNotificationsCount--;
        notification.read = true;
        this.markNotificationAsRead(this.appService.user.id, [ notification.id ]);
      }
    }
  }

  private markNotificationAsRead(userId: number, notificationIds: number[]): void {
    this.notificationService.markNotificationsAsRead(userId, notificationIds)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (res: ApiResponse) => {},
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
  }

  protected filterPredicate: (data: Notification, filter: string) => boolean = (data: Notification, filter: string) => {
    switch (this.filterType) {
      case 'NONE': return true;
      case 'MESSAGE': return Util.stringContains(data.message, filter);
      case 'IS_ALIVE': return data.alive === (filter === 'true');
      case 'READ': return data.alive === (filter === 'true');
      case 'GATEWAY': return data.gatewayId === Number(filter);
      case 'PROCESS': return data.processId === Number(filter);
      case 'TIMESTAMP':
        if (!this.startDate && !this.endDate) {
          return true;
        } else if (this.startDate && !this.endDate) {

        } else if (!this.startDate && this.endDate) {

        } else {

        }
    }
  }

}
