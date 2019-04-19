import { StatisticPk } from './statistic-pk';

export class Statistic {
  public id: StatisticPk;
  public count: number;

  constructor(id: StatisticPk, count: number) {
    this.id = id;
    this.count = count;
  }
}
