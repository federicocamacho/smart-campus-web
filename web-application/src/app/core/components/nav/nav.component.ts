import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchItem } from '../../../shared/models';
import { SearchMock } from '../../mocks/search-mock';

@Component({
  selector: 'sc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  public isHandset$: Observable<boolean>;
  public isOpened: boolean;
  public searchElements: SearchItem[];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );

    this.searchElements = SearchMock.getSearchElements();
  }

  public menuToggled(isOpened: boolean) {
    this.isOpened = isOpened;
  }

}
