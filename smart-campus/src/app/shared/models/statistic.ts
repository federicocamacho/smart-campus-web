import { DataStatisticPk } from './data-statistic-pk';

export class Statistic {

  public id: DataStatisticPk;
  public count: number;

  constructor(id: DataStatisticPk, count: number) {
    this.id = id;
    this.count = count;
  }

}
