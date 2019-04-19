import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { take, takeUntil } from 'rxjs/operators';

import { DataService } from 'src/app/core/services/data.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { Statistic } from 'src/app/shared/models/statistic';
import { AppService } from 'src/app/app.service';
import { StatisticType } from 'src/app/main/components/statistics/statistic-type';
import { ProcessService } from 'src/app/core/services/process.service';
import { GatewayService } from 'src/app/core/services/gateway.service';
import { forkJoin } from 'rxjs';
import { Util } from 'src/app/shared/utils/util';

@Component({
  selector: 'sc-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent extends Subscribable implements OnInit {

  public chartReady: boolean;

  public statistics: StatisticType;

  public charts: Array<any>;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
  ];

  constructor(
    private dataService: DataService,
    private appService: AppService,
    private processService: ProcessService,
    private gatewayService: GatewayService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.statistics = new StatisticType();
    this.charts = new Array();
    this.charts.push({
      label: 'Hora',
      property: 'hour'
    });
    this.charts.push({
      label: 'Dia de la semana',
      property: 'dayOfWeek'
    });
    this.charts.push({
      label: 'Dia del mes',
      property: 'dayOfMonth'
    });
    this.charts.push({
      label: 'Mes',
      property: 'month'
    });
   }

  ngOnInit() {
    forkJoin(
      this.gatewayService.getGatewaysByUserId(this.appService.user.id),
      this.processService.getProcessesByUserId(this.appService.user.id)
    ).pipe(take(1), takeUntil(this.destroyed))
    .subscribe((responses: Array<Array<any>>) => {
      const gatewaysMap = {};
      const processesMap = {};
      for (const gateway of responses[0]) {
        gatewaysMap[gateway.id] = gateway.name;
      }
      for (const process of responses[1]) {
        processesMap[process.id] = process.name;
      }
      this.dataService.getStatistics().pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (statistics: Statistic[]) => {
          if (statistics.length === 0) {
            return;
          }
          for (const statistic of statistics) {
            let type = '';
            let subtype = '';
            if (statistic.id.gatewayId) {
              type = 'gatewayId';
              statistic.id.gatewayId = gatewaysMap[statistic.id.gatewayId];
            } else if (statistic.id.processId) {
              type = 'processId';
              statistic.id.processId = processesMap[statistic.id.processId];
            }
            if (statistic.id.hour) {
              subtype = 'hour';
            } else if (statistic.id.dayOfWeek) {
              subtype = 'dayOfWeek';
              statistic.id.dayOfWeek = Util.dayOfWeekToString(statistic.id.dayOfWeek);
            } else if (statistic.id.dayOfMonth) {
              subtype = 'dayOfMonth';
            } else if (statistic.id.month) {
              subtype = 'month';
              statistic.id.month = Util.monthToString(statistic.id.month);
            }
            this.statistics[type][subtype].addElement(statistic, type, subtype);
          }
          this.chartReady = true;
          this.cdr.detectChanges();
        },
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
    },
    (err: HttpErrorResponse) => this.appService.handleGenericError(err))

  }

}
