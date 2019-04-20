import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil, take } from 'rxjs/operators';
import { ChartOptions, ChartDataSets } from 'chart.js';

import { AdminStatistics } from 'src/app/shared/models/admin-statistics';
import { AppService } from 'src/app/app.service';
import { DataService } from 'src/app/core/services/data.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { Util } from 'src/app/shared/utils/util';

/**
 * Administrations statistics component.
 *
 * @date 2019-04-20
 * @export
 */
@Component({
  selector: 'sc-administration-statistics',
  templateUrl: './administration-statistics.component.html',
  styleUrls: ['./administration-statistics.component.css']
})
export class AdministrationStatisticsComponent extends Subscribable implements OnInit {

  /**
   * Indicates if all the information neeeded for the charts was already retrieved.
   *
   */
  public chartsReady: boolean;

  /**
   * Stores all the administration statistics retrieved.
   *
   */
  public statistics: AdminStatistics;

  /**
   * Stores gateway's information in the format required for the pie chart.
   *
   */
  public gatewayData: number[] = [];

  /**
   * Stores process' information in the format required for the pie chart.
   *
   */
  public processData: number[] = [];

  /**
   * Labels used in the charts for all 'Alive', 'Death' chart types.
   *
   */
  public aliveChartsLabel: string[] = [ 'Activos', 'Inactivos' ];

  /**
   * Data set for the status changes chart.
   *
   */
  public statusChartData: ChartDataSets[] = [];

  /**
   * Labels used for status changes charts, this are filled with the dates of the changes.
   *
   */
  public statusChartLabels: string[] = [];

  /**
   * Colors used for the 'Alive', 'Death' chart types.
   *
   */
  public aliveChartsColors = [
    {
      backgroundColor: [ 'rgb(36, 210, 181)', 'rgb(255, 92, 108)' ]
    }
  ];

  /**
   * Default chart options.
   *
   */
  public chartOptions: ChartOptions = {
    responsive: true,
  };

  /**
   * Creates an instance of AdministrationStatisticsComponent.
   * @date 2019-04-20
   * @param appService - Angular main service.
   * @param cdr - Angular's change detector reference.
   * @param dashboardService - Dashboard management service.
   * @param dataService - Data and Statistics management service.
   */
  constructor(
    private appService: AppService,
    private cdr: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private dataService: DataService) {
    super();
  }

  ngOnInit() {
    this.getStatistics();
    this.dashboardService.refreshStatistics
      .pipe(takeUntil(this.destroyed))
      .subscribe(_ => {
        this.getStatistics();
        this.cdr.detectChanges();
      });
  }

  /**
   * Retrieves the administration statistics consuming the REST service.
   *
   * @date 2019-04-20
   */
  private getStatistics(): void {
    this.dataService.getAdminStatistics(this.appService.user.id)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (stats: AdminStatistics) => {
          this.statistics = stats;
          this.gatewayData = [ stats.gatewaysAlive, stats.gatewaysDeath ];
          this.processData = [ stats.processesAlive, stats.processesDeath ];
          this.statusChartLabels = [];
          const aliveData = [];
          const deathData = [];
          stats.changes = stats.changes
            .sort((a, b) => new Date(a.sentDate).getTime() - new Date(b.sentDate).getTime());
          for (const statusChange of stats.changes) {
            this.statusChartLabels.push(this.dateToChartString(statusChange.sentDate));
            aliveData.push(statusChange.alive);
            deathData.push(statusChange.death);
          }
          this.statusChartData = [
            {
              data: aliveData,
              label: 'Disponible',
              backgroundColor: 'rgb(36, 210, 181)',
              hoverBackgroundColor: 'green'
            },
            {
              data: deathData,
              label: 'No disponible',
              backgroundColor: 'rgb(255, 92, 108)',
              hoverBackgroundColor: 'red'
            }
          ];
          this.chartsReady = true;
        },
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
  }

  /**
   * Converts a date (in string or date format) to a String (short) used for the charts.
   *
   * @date 2019-04-20
   * @param dateString - date to be transformed.
   * @returns a short string representation for the Date in the current timezone.
   */
  private dateToChartString(dateString: string | Date): string {
    const date = new Date(dateString);
    if (Util.isToday(date)) {
      return `${ date.getHours() }:${ date.getMinutes() }`;
    }
    return `${ Util.monthShort(date.getMonth()) }/${ date.getDay() } ${ date.getHours() }:${ date.getMinutes() }`;
  }

}
