import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';

import { Application } from 'src/app/shared/models/application';
import { ApplicationService } from 'src/app/core/services/application.service';
import { AppService } from 'src/app/app.service';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { ApplicationsFilter } from 'src/app/shared/models/types';
import { Util } from 'src/app/shared/utils/util';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogData } from 'src/app/shared/components/confirm-dialog/dialog-data';

/**
 * Page to manage all the user's applications.
 *
 * @date 2019-04-03
 * @export
 */
@Component({
  selector: 'sc-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent extends Subscribable implements OnInit {

  public displayedApplicationsColumns = [ 'name', 'description', 'actions' ];

  public applicationsDataSource: MatTableDataSource<Application>;

  public filterType: ApplicationsFilter = 'NONE';

  public filterValue = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Creates an instance of ApplicationsComponent.
   * @date 2019-04-03
   * @param activatedRoute - current Route.
   * @param applicationService - Application's related service.
   * @param router - Angular router.
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    public applicationService: ApplicationService,
    private dialog: MatDialog,
    private router: Router) {
      super();
      this.applicationsDataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.applicationsDataSource.paginator = this.paginator;
    this.applicationsDataSource.sort = this.sort;
    this.applicationsDataSource.sortingDataAccessor = (data, attribute) => data[attribute];
    this.applicationsDataSource.filterPredicate = (data: Application, filter: string) => {
      if (this.filterType === 'NAME') {
        return Util.stringContains(data.name, filter);
      } else {
        return Util.stringContains(data.description, filter);
      }
    };
    this.getApplications();
  }

  /**
   * Triggered when pressing "Create app" button.
   *
   * @date 2019-04-03
   */
  public createApplication(): void {
    this.router.navigate([ '0' ], { relativeTo: this.activatedRoute });
  }

  /**
   * Triggered when pressing "Delete" application button.
   *
   * @date 2019-04-04
   * @param id - id of the application to be deleted.
   */
  public onDeleteApplication(id: number, name: string): void {
    const deleteDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: new DialogData(
        'Eliminar aplicación',
        `Está seguro que desea eliminar la aplicación ${ name }`,
        id)
    });

    deleteDialog.afterClosed()
      .pipe(
        take(1),
        takeUntil(this.destroyed))
      .subscribe(result => result ? this.deleteApplication(result) : null);
  }

  /**
   *  Deletes the application identified by its id.
   *
   * @date 2019-04-05
   * @param id - id of the application to be deleted.
   */
  private deleteApplication(id: number) {
    this.applicationService.deleteApplication(id)
      .pipe(take(1), takeUntil(this.destroyed))
      .subscribe(
        (res: ApiResponse) => {
          this.applicationService.applications.splice(
            this.applicationService.applications.findIndex(application => application.id === id), 1);
          this.applicationsDataSource = new MatTableDataSource(this.applicationService.applications);
          this.applicationsDataSource.paginator = this.paginator;
          if (this.applicationService.applications.length % this.applicationsDataSource.paginator.pageSize === 0) {
            this.applicationsDataSource.paginator.previousPage();
          }
        },
        (err: HttpErrorResponse) => this.appService.handleGenericError(err)
      );
  }

  /**
   * Triggered when pressing "Edit" application button.
   *
   * @date 2019-04-04
   * @param id - id of the application to be edited.
   */
  public onEditApplication(id: number): void {
    this.router.navigate([ id ], { relativeTo: this.activatedRoute });
  }

  /**
   * Retrieves the application for the user logged in.
   *
   * @date 2019-04-04
   */
  private getApplications(): void {
    this.applicationService.getApplicationsForUser(this.appService.user.id)
    .pipe(take(1), takeUntil(this.destroyed))
    .subscribe(
      (applications: Application[]) => {
        this.applicationService.applications = applications;
        this.applicationsDataSource.data = applications;
      },
      (err: HttpErrorResponse) => this.appService.handleGenericError(err));
  }

  /**
   * Applies the Filter definition for the current datasource using as value the content of filterValue.
   *
   * @date 2019-04-05
   */
  public applyFilter(): void {
    this.applicationsDataSource.filter = this.filterValue;
  }

}
