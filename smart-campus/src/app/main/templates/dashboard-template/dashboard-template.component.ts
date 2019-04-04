import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'sc-dashboard-template',
  templateUrl: './dashboard-template.component.html',
  styleUrls: ['./dashboard-template.component.css']
})
export class DashboardTemplateComponent {

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
  constructor(private router: Router, public appService: AppService, public dashboardService: DashboardService) {
    appService.isBusy = false;
  }

  /**
   * Navigate to application's home page.
   *
   * @date 2018-10-30
   */
  public goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
