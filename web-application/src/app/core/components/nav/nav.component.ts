import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchItem } from '../../../shared/models';
import { SearchMock } from '../../mocks/search-mock';

/**
 * Component that includes navbar and side menu.
 *
 * @date 2018-08-17
 * @export
 * @class NavComponent
 */
@Component({
  selector: 'sc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  /**
   * Describes wether the device is a mobile or not.
   *
   * @type {Observable<boolean>}
   * @memberof NavComponent
   */
  public isHandset: Observable<boolean>;

  /**
   * Describes if the side menu is opened or closed.
   *
   * @type {boolean}
   * @memberof NavComponent
   */
  public isOpened: boolean;

  /**
   * Set of elements that are retrieved from a search in nav-search component (NOT IMPLEMENTED YET).
   *
   * @type {SearchItem[]}
   * @memberof NavComponent
   */
  public searchElements: SearchItem[];

  /**
   * Creates an instance of NavComponent.
   * @date 2018-08-17
   * @param {BreakpointObserver} breakpointObserver
   * @memberof NavComponent
   */
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );

    this.searchElements = SearchMock.getSearchElements();
  }

  /**
   * Change if side menu is shown/hidden after an user action.
   *
   * @date 2018-08-17
   * @param {boolean} isOpened
   * @memberof NavComponent
   */
  public menuToggled(isOpened: boolean) {
    this.isOpened = isOpened;
  }

}
