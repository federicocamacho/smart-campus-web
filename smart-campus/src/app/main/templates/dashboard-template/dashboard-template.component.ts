import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Section } from 'src/app/shared/models/section';

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
   * List of system's sections.
   *
   */
  public sections: Array<Section>;

  /**
   * True when the vertical left menu is visible, otherwise is false.
   *
   */
  public openMenu: boolean;

  /**
   * Creates an instance of HeaderComponent.
   * @date 2019-01-09
   * @param router Angular Router.
   */
  constructor(private router: Router, public appService: AppService, public dashboardService: DashboardService) {
    appService.isBusy = false;
    this.openMenu = false;
    this.sections = new Array();
    this.sections.push(new Section('Aplicaciones', 'Gestiona tus apps', '/dashboard/applications', 'apps', '#24d2b5'));
    this.sections.push(new Section('Gateways', 'Gestiona tus gateways', '/dashboard/gateways', 'business', '#007bff'));
    this.sections.push(new Section('Procesos', 'Gestiona tus procesos', '/dashboard/processes', 'widgets', '#ff5c6c'));
    this.sections.push(new Section('Dispositivos', 'Gestiona tus dispositivos', '/dashboard/devices', 'device_hub', '#6772e5'));
    this.sections.push(new Section('Usuarios', 'Gestiona tus usuarios', '/dashboard/users', 'supervised_user_circle', '#000'));
  }

  /**
   * Navigate to application's home page.
   *
   * @date 2018-10-30
   */
  public goHome(): void {
    this.router.navigate(['/dashboard']);
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
