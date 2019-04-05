import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from 'src/app/core/services/application.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscribable } from 'src/app/shared/utils/subscribable';
import { AppService } from 'src/app/app.service';
import { take, takeUntil } from 'rxjs/operators';
import { Application } from 'src/app/shared/models/application';
import { HttpErrorResponse } from '@angular/common/http';

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
    private router: Router) {
      super();
      this.applicationService.applications = new MatTableDataSource();
  }

  ngOnInit() {
    this.applicationService.applications.paginator = this.paginator;
    this.applicationService.applications.sort = this.sort;
    this.applicationService.applications.sortingDataAccessor = (data, attribute) => data[attribute];
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

  public deleteApplication(index: number): void {

  }

  /**
   * Retrieves the application for the user logged in.
   *
   * @date 2019-04-04
   */
  private getApplications(): void {
    if (!this.appService.isUserAuthenticated()) {
      return;
    }
    this.applicationService.getApplicationsForUser(this.appService.user.id)
    .pipe(take(1), takeUntil(this.destroyed))
    .subscribe(
      (applications: Application[]) => {
        this.applicationService.applications.data = applications;
      },
      (err: HttpErrorResponse) => this.appService.handleGenericError(err));
  }

}
