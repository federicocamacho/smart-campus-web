import { StatisticPk } from './statisticPk';

export class Statistic {
  public id: StatisticPk;
  public count: number;

  constructor(id: StatisticPk, count: number) {
    this.id = id;
    this.count = count;
  }
}
