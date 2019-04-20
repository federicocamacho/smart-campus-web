import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { AppService } from 'src/app/app.service';
import { takeUntil, take } from 'rxjs/operators';
import { AdminStatistics } from 'src/app/shared/models/admin-statistics';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Util } from 'src/app/shared/utils/util';

@Component({
  selector: 'sc-administration-statistics',
  templateUrl: './administration-statistics.component.html',
  styleUrls: ['./administration-statistics.component.css']
})
export class AdministrationStatisticsComponent extends Subscribable implements OnInit {

  public chartsReady: boolean;

  public statistics: AdminStatistics;
  public gatewayData: number[] = [];
  public processData: number[] = [];
  public aliveChartsLabel: string[] = [ 'Activos', 'Inactivos' ];
  public statusChartData: ChartDataSets[] = [];
  public statusChartLabels: string[] = [];
  public aliveChartsColors = [
    {
      backgroundColor: [ 'rgb(36, 210, 181)', 'rgb(255, 92, 108)' ]
    }
  ];

  public chartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(
    private appService: AppService,
    private dataService: DataService) {
    super();
  }

  ngOnInit() {
    this.getStatistics();
  }

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

  private dateToChartString(dateString: string | Date): string {
    const date = new Date(dateString);
    if (Util.isToday(date)) {
      return `${ date.getHours() }:${ date.getMinutes() }`;
    }
    return `${ Util.monthShort(date.getMonth()) }/${ date.getDay() } ${ date.getHours() }:${ date.getMinutes() }`;
  }

}
