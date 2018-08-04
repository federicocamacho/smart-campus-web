import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SearchItem } from '../../models';

@Component({
  selector: 'sc-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {

  @Input('dataSet') dataSet: SearchItem[];
  @Input('placeholder') placeholder: string;

  public filteredSet: SearchItem[];
  public isSearching: boolean;
  public query: string;

  constructor() {
    this.query = '';
    this.isSearching = true;
  }

  ngOnInit() {}

  public queryChanged(query: string): void {
    if (!query) { return; }
    this.filteredSet = this.dataSet
      .filter(data => data.name.toLowerCase().indexOf(this.query.toLowerCase()) === 0);
    this.isSearching = false;
  }

  public selectElement(element: SearchItem): void {
    this.query = element.name;
  }

}
