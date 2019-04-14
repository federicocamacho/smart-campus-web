import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take, takeUntil } from 'rxjs/operators';

import { AppService } from 'src/app/app.service';
import { DataTable } from 'src/app/shared/utils/data-table';
import { Gateway } from 'src/app/shared/models/gateway';
import { GatewayService } from 'src/app/core/services/gateway.service';
import { NotificationsFilter } from 'src/app/shared/models/types';
import { Process } from 'src/app/shared/models/process';
import { ProcessService } from 'src/app/core/services/process.service';

@Component({
  selector: 'sc-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
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

  constructor(private appService: AppService, private gatewayService: GatewayService, private processService: ProcessService) {
    super();
    this.displayedColumns = [ 'gateway', 'proceso', 'alive', 'read', 'timestamp', 'message' ];
    this.gatewaysSelect = [];
    this.processSelect = [];
  }

  ngOnInit() {
    super.initDataTable();
    this.getGateways();
    this.getProcesses();
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

  protected filterPredicate: (data: Notification, filter: string) => boolean = (data: Notification, filter: string) => {
    switch (this.filterType) {
      case 'NONE': return true;
    }
  }

}
