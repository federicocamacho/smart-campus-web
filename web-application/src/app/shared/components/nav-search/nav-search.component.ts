import { Component, OnInit, Input } from '@angular/core';
import { SearchItem } from '../../models';

/**
 * Navbar search input.
 *
 * @date 2018-08-17
 * @export
 * @class NavSearchComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'sc-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {

  /**
   * The elements retrieved.
   *
   * @type {SearchItem[]}
   * @memberof NavSearchComponent
   */
  @Input('dataSet') dataSet: SearchItem[];

  /**
   * Input's placeholder.
   *
   * @type {string}
   * @memberof NavSearchComponent
   */
  @Input('placeholder') placeholder: string;

  /**
   * The elements retrieved after filtering (query).
   *
   * @type {SearchItem[]}
   * @memberof NavSearchComponent
   */
  public filteredSet: SearchItem[];

  /**
   * Indicates if the user is searching or not (for styling).
   *
   * @type {boolean}
   * @memberof NavSearchComponent
   */
  public isSearching: boolean;

  /**
   * Search string wrote by the user.
   *
   * @type {string}
   * @memberof NavSearchComponent
   */
  public query: string;

  /**
   * Creates an instance of NavSearchComponent.
   * @date 2018-08-17
   * @memberof NavSearchComponent
   */
  constructor() {
    this.query = '';
    this.isSearching = true;
  }

  ngOnInit() {}

  /**
   * Method triggered everytime the user changes the search criteria.
   *
   * @date 2018-08-17
   * @param {string} query
   * @returns {void}
   * @memberof NavSearchComponent
   */
  public queryChanged(query: string): void {
    if (!query) { return; }
    this.filteredSet = this.dataSet
      .filter(data => data.name.toLowerCase().indexOf(this.query.toLowerCase()) === 0);
    this.isSearching = false;
  }

  /**
   * Method triggered everytime the user selects a searc result item.
   *
   * @date 2018-08-17
   * @param {SearchItem} element
   * @memberof NavSearchComponent
   */
  public selectElement(element: SearchItem): void {
    this.query = element.name;
  }

}
