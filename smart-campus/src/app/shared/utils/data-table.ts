import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ViewChild } from '@angular/core';
import { Subscribable } from './subscribable';
import { Router, ActivatedRoute } from '@angular/router';

export abstract class DataTable<T, U> extends Subscribable {

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<T>;
  public filterValue = '';
  public filterType: U | 'NONE' = 'NONE';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  protected abstract filterPredicate: (data: T, filter: string) => boolean;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router) {
    super();
    this.dataSource = new MatTableDataSource();
  }

  /**
   * Inits all the configurations for the data table.
   *
   */
  public initDataTable(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, attribute) => data[attribute];
    this.dataSource.filterPredicate = this.filterPredicate;
  }

  /**
   * Triggered when pressing "Create app" button.
   *
   * @date 2019-04-03
   */
  public onCreateRecord(): void {
    this.router.navigate([ '0' ], { relativeTo: this.activatedRoute });
  }

  /**
   * Triggered when pressing "Edit" application button.
   *
   * @date 2019-04-04
   * @param id - id of the application to be edited.
   */
  public onEditRecord(id: number): void {
    this.router.navigate([ id ], { relativeTo: this.activatedRoute });
  }

  public onFilterTypeChange(newFilterType: U): void {
    this.filterValue = '';
    this.applyFilter();
    this.filterType = newFilterType;
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
