import { GatewaysFilter } from './../../../shared/models/types';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Gateway } from 'src/app/shared/models/gateway';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { Util } from 'src/app/shared/utils/util';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogData } from 'src/app/shared/components/confirm-dialog/dialog-data';
import { take, takeUntil } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { GatewayService } from 'src/app/core/services/gateway.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'sc-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.css']
})
export class GatewaysComponent extends Subscribable implements OnInit {

  public displayedColumns = [ 'name', 'description', 'ip', 'alive', 'actions'];

  public dataSource: MatTableDataSource<Gateway>;

  public filterType: GatewaysFilter = 'NONE';

  public filterValue = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Creates an instance of GatewaysComponent.
   * @param activatedRoute
   * @param appService
   * @param gatewayService
   * @param dialog
   * @param router
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    public gatewayService: GatewayService,
    private dialog: MatDialog,
    private router: Router) {
      super();
      this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
    this.dataSource.filterPredicate = (data: Gateway, filter: string) => {
     return this.filterTable(data, filter);
    };
    this.getGateways();
  }

  /**
   * Filters the records based on the filter type and value.
   *
   * @param data
   * @param filter
   * @returns
   */
  private filterTable(data: Gateway, filter: string): boolean {
    switch (this.filterType) {
      case 'NAME': return Util.stringContains(data.name, filter);
      case 'DESCRIPTION': return Util.stringContains(data.description, filter);
      case 'IP': return Util.stringContains(data.ip, filter);
    }
  }

  /**
   * Triggered when pressing "Create new" button.
   *
   * @date 2019-04-03
   */
  public createRecord(): void {
    this.router.navigate([ '0' ], { relativeTo: this.activatedRoute });
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
   * Triggered when pressing "Edit" gateway button.
   *
   * @date 2019-04-04
   * @param id - id of the gateway to be edited.
   */
  public onEditRecord(id: number): void {
    this.router.navigate([ id ], { relativeTo: this.activatedRoute });
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

  /**
   * Applies the Filter definition for the current datasource using as value the content of filterValue.
   *
   * @date 2019-04-05
   */
  public applyFilter(): void {
    this.dataSource.filter = this.filterValue;
  }

}
