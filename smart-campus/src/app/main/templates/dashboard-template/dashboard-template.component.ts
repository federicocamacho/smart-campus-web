import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Section } from 'src/app/shared/models/section';
import { NotificationService } from 'src/app/core/services/notification.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { HttpErrorResponse } from '@angular/common/http';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Notification } from 'src/app/shared/models/notification';

@Component({
  selector: 'sc-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.css']
})
export class DashboardTemplateComponent extends Subscribable implements OnInit, OnDestroy {

  /**
   * Name of the currently authenticated user.
   *
   */
  @Input() userName: string;

  /**
   * List of system's sections.
   *
   */
  public sections: Array<Section>;

  /**
   * True when the vertical left menu is visible, otherwise is false.
   *
   */
  public openMenu: boolean;

  public newNotification: Notification;

  /**
   * Creates an instance of HeaderComponent.
   * @date 2019-01-09
   * @param router Angular Router.
   */
  constructor(
    public appService: AppService,
    public dashboardService: DashboardService,
    public notificationService: NotificationService,
    private router: Router,
    private rxStompService: RxStompService) {
    super();
    appService.isBusy = false;
    this.openMenu = false;
    this.sections = new Array();
    this.sections.push(new Section('Aplicaciones', 'Gestiona tus apps', '/dashboard/applications', 'apps', '#24d2b5'));
    this.sections.push(new Section('Gateways', 'Gestiona tus gateways', '/dashboard/gateways', 'business', '#007bff'));
    this.sections.push(new Section('Procesos', 'Gestiona tus procesos', '/dashboard/processes', 'widgets', '#ff5c6c'));
    this.sections.push(new Section('Dispositivos', 'Gestiona tus dispositivos', '/dashboard/devices', 'device_hub', '#6772e5'));
    if (appService.user.admin) {
      this.sections.push(new Section('Usuarios', 'Gestiona tus usuarios', '/dashboard/users', 'supervised_user_circle', '#000'));
    }

  }

  ngOnInit() {
    this.getUnreadNotificationsCount();
    this.subscribeToNotifications();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.rxStompService.deactivate();
  }

  private subscribeToNotifications(): void {
    this.rxStompService.watch(`notifications/${ this.appService.user.id }`)
    .pipe(takeUntil(this.destroyed))
    .subscribe((message: Message) => {
      this.dashboardService.refreshStatistics.emit();
      try {
        this.newNotification = JSON.parse(message.body);
      } catch (err) {
        console.error('An error occurred parsing a notification', err);
      }
      this.dashboardService.isNotificationShown = true;
      setTimeout(() => {
        this.dashboardService.isNotificationShown = false;
        this.newNotification = null;
      }, 5000);
    });
  }

  /**
   * Navigate to application's home page.
   *
   * @date 2018-10-30
   */
  public goHome(): void {
    this.router.navigate(['/dashboard']);
    this.openMenu = false;
  }

  /**
   * Navigate to application's page.
   *
   * @param path to navigate.
   */
  public navigateToSection(path: string): void {
    this.router.navigate([path]);
    this.openMenu = false;
  }

  private getUnreadNotificationsCount(): void {
    this.notificationService.getUnreadNotificationsCount(this.appService.user.id)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (count: number) => this.notificationService.unreadNotificationsCount = count,
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
  }

  public toggleUserCard(event: Event): void {
    this.dashboardService.isUserCardOpened = !this.dashboardService.isUserCardOpened;
    if (this.dashboardService.isUserCardOpened) {
      this.dashboardService.isNotificationsCardOpened = false;
    }
    this.openMenu = false;
    event.stopPropagation();
  }

  public closeUserCard(event: Event): void {
    if (this.dashboardService.isUserCardOpened) {
      this.dashboardService.isUserCardOpened = false;
    }
    event.stopPropagation();
  }

  public toggleNotificationsCard(event: Event): void {
    this.dashboardService.isNotificationsCardOpened = !this.dashboardService.isNotificationsCardOpened;
    if (this.dashboardService.isNotificationsCardOpened) {
      this.dashboardService.isUserCardOpened = false;
    }
    this.openMenu = false;
    event.stopPropagation();
  }

  public closeNotificationsCard(event: Event): void {
    if (this.dashboardService.isNotificationsCardOpened) {
      this.dashboardService.isNotificationsCardOpened = false;
    }
    event.stopPropagation();
  }
}
