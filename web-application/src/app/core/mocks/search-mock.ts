import { SearchItem } from '../../shared/models';

export class SearchMock {
  constructor() { }

  public static getSearchElements(): SearchItem[] {
    return [
      new SearchItem('Hola', '0'),
      new SearchItem('Chao', '1'),
      new SearchItem('Asd', '2'),
      new SearchItem('Dfg', '3')
    ];
  }
}
