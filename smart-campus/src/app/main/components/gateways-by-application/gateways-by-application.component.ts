import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { DataTable } from 'src/app/shared/utils/data-table';
import { Gateway } from 'src/app/shared/models/gateway';
import { GatewaysFilter } from 'src/app/shared/models/types';
import { Util } from 'src/app/shared/utils/util';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogData } from 'src/app/shared/components/confirm-dialog/dialog-data';
import { take, takeUntil } from 'rxjs/operators';
import { ApplicationService } from 'src/app/core/services/application.service';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { HttpErrorResponse } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { GatewaySelectionDialogComponent } from '../gateway-selection-dialog/gateway-selection-dialog.component';

@Component({
  selector: 'sc-gateways-by-application',
  templateUrl: './gateways-by-application.component.html',
  styleUrls: ['./gateways-by-application.component.css']
})
export class GatewaysByApplicationComponent extends DataTable<Gateway, GatewaysFilter> implements OnInit, OnChanges {

  @Input() gateways: Gateway[];
  @Input() applicationId: number;

  constructor(
    private appService: AppService,
    private applicationService: ApplicationService,
    private dialog: MatDialog) {
    super(null, null);
    this.displayedColumns = [ 'name', 'description', 'ip', 'alive', 'actions' ];
  }

  ngOnInit() {
    super.initDataTable();
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.gateways);
  }

  public onAssignGateway(): void {
    const assignDialog = this.dialog.open(GatewaySelectionDialogComponent, {
      width: '500px',
      data: this.gateways
    });

    assignDialog.afterClosed()
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe((gateway: Gateway) => gateway ? this.assignGateway(gateway.id, true, gateway) : null);
  }

  public onUnassignGateway(gateway: Gateway): void {
    const unassignDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: new DialogData(
        'Desasignar Gateway',
        `Está seguro que desea desasignar el Gateway: ${ gateway.name }`,
        gateway.id)
    });

    unassignDialog.afterClosed()
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(result => result ? this.assignGateway(result, false) : null);
  }

  private assignGateway(gatewayId: number, assign: boolean, gateway?: Gateway): void {
    this.applicationService.assignGatewayToApplication(this.applicationId, gatewayId, assign)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (res: ApiResponse) => {
          this.appService.showSnack(res.message);
          if (assign) {
            this.gateways.push(gateway);
          } else {
            this.gateways.splice(this.gateways.findIndex(g => g.id === gatewayId), 1);
          }
          this.dataSource.data = this.gateways;
        },
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
  }

  protected filterPredicate: (data: Gateway, filter: string) => boolean = (data: Gateway, filter: string) => {
    switch (this.filterType) {
      case 'NAME': return Util.stringContains(data.name, filter);
      case 'DESCRIPTION': return Util.stringContains(data.description, filter);
      case 'IP': return Util.stringContains(data.ip, filter);
      case 'IS_ALIVE': return data.alive === (filter === 'true');
      default: return true;
    }
  }

}
