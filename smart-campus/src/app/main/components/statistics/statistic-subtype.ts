import { StatisticDetail } from './statistic-detail';

export class StatisticSubtype {
  hour: StatisticDetail;
  dayOfWeek: StatisticDetail;
  dayOfMonth: StatisticDetail;
  month: StatisticDetail;

  constructor() {
    this.hour = new StatisticDetail();
    this.dayOfWeek = new StatisticDetail();
    this.dayOfMonth = new StatisticDetail();
    this.month = new StatisticDetail();
  }
}
