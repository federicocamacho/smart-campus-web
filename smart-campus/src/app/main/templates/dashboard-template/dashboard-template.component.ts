import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'sc-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.css']
})
export class DashboardTemplateComponent extends Subscribable implements OnInit {

  /**
   * Name of the currently authenticated user.
   *
   */
  @Input() userName: string;

  /**
   * Creates an instance of HeaderComponent.
   * @date 2019-01-09
   * @param router Angular Router.
   */
  constructor(
    public appService: AppService,
    public dashboardService: DashboardService,
    public notificationService: NotificationService,
    private router: Router) {
    super();
    appService.isBusy = false;
  }

  ngOnInit() {
    this.getUnreadNotificationsCount();
  }

  /**
   * Navigate to application's home page.
   *
   * @date 2018-10-30
   */
  public goHome(): void {
    this.router.navigate(['/dashboard']);
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
    event.stopPropagation();
  }

  public closeUserCard(): void {
    if (this.dashboardService.isUserCardOpened) {
      this.dashboardService.isUserCardOpened = false;
    }
  }
}
