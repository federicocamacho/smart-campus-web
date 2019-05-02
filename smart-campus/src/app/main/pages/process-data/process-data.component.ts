import { Component, OnInit, ViewChild } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { takeUntil, take } from 'rxjs/operators';
import { IMessage } from '@stomp/stompjs';
import { ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { ExternalService, BroadcastMessage, BroadcastResponse } from 'src/app/core/services/external.service';

@Component({
  selector: 'sc-process-data',
  templateUrl: './process-data.component.html',
  styleUrls: ['./process-data.component.css']
})
export class ProcessDataComponent extends Subscribable implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Proba' }
  ];

  public data: number[] = [];
  public lineChartLabels: Label[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private externalService: ExternalService, private stompService: RxStompService) {
    super();
  }

  ngOnInit() {
    this.stompService.watch('potenciometro')
      .pipe(takeUntil(this.destroyed))
      .subscribe((msg: IMessage) => {
        try {
          console.log(msg);
          const processMessage: ProcessMessage = JSON.parse(msg.body);
          const date = new Date();
          this.data.push(Number(processMessage.payload));
          this.lineChartData = [
            {
              data: this.data
            }
          ];
          const measurement = Number(processMessage.payload);
          const ledValue = measurement > 3 ? '1' : '0';
          this.externalService.notifyActuatorData(new BroadcastMessage(ledValue, 'led'))
            .pipe(take(1), takeUntil(this.destroyed))
            .subscribe((res: BroadcastResponse[]) => console.error(res));
          this.lineChartLabels.push(`${ String(date.getHours()) }:${ String(date.getMinutes()) }:${ String(date.getSeconds()) }`);
          this.chart.chart.update();
        } catch (err) {
          console.error(err);
        }
      });
  }

}

export class ProcessMessage {

  public gatewayId: number;
  public processId: number;
  public payload: string;
  public timestamp: Date;

}
