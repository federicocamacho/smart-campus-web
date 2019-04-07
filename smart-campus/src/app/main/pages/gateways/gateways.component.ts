import { GatewaysFilter } from './../../../shared/models/types';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Gateway } from 'src/app/shared/models/gateway';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogData } from 'src/app/shared/components/confirm-dialog/dialog-data';
import { take, takeUntil } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { GatewayService } from 'src/app/core/services/gateway.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTable } from 'src/app/shared/utils/data-table';
import { Util } from 'src/app/shared/utils/util';

@Component({
  selector: 'sc-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.css']
})
export class GatewaysComponent extends DataTable<Gateway, GatewaysFilter> implements OnInit {

  public dataSource: MatTableDataSource<Gateway>;

  /**
   * Creates an instance of GatewaysComponent.
   * @param activatedRoute
   * @param appService
   * @param gatewayService
   * @param dialog
   * @param router
   */
  constructor(
    protected activatedRoute: ActivatedRoute,
    private appService: AppService,
    public gatewayService: GatewayService,
    private dialog: MatDialog,
    protected router: Router) {
      super(activatedRoute, router);
      this.displayedColumns = [ 'name', 'description' ];
  }

  ngOnInit() {
    super.ngOnInit();
    this.getGateways();
  }

  /**
   * Triggered when pressing "Delete" button.
   *
   * @date 2019-04-04
   * @param id - id of the gateway to be deleted.
   */
  public onDeleteRecord(id: number, name: string): void {
    const deleteDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: new DialogData(
        'Eliminar gateway',
        `Está seguro que desea eliminar el gateway ${ name }`,
        id)
    });

    deleteDialog.afterClosed()
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(result => result ? this.deleteRecord(result) : null);
  }

  /**
   *  Deletes the gateway identified by its id.
   *
   * @date 2019-04-05
   * @param id - id of the gateway to be deleted.
   */
  private deleteRecord(id: number) {
    this.gatewayService.deleteGatewayById(id)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (res: ApiResponse) => {
          this.gatewayService.gateways.splice(
            this.gatewayService.gateways.findIndex(gateway => gateway.id === id), 1);
          this.dataSource = new MatTableDataSource(this.gatewayService.gateways);
          this.dataSource.paginator = this.paginator;
          if (this.gatewayService.gateways.length % this.dataSource.paginator.pageSize === 0) {
            this.dataSource.paginator.previousPage();
          }
        },
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
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
        console.log(gateways);
        this.gatewayService.gateways = gateways;
        console.log(gateways[0].alive);
        this.dataSource.data = gateways;
      },
      (err: HttpErrorResponse) => this.appService.handleGenericError(err));
  }

  protected filterPredicate: (data: Gateway, filter: string) => boolean = (data: Gateway, filter: string) => {
    switch (this.filterType) {
      case 'DESCRIPTION':
        return Util.stringContains(data.description, filter);
      case 'IP':
        return Util.stringContains(data.ip, filter);
      case 'IS_ALIVE':
        return data.alive === (filter === 'true');
      case 'NONE':
        return true;
    }
  }

}
