import { StatisticSubtype } from 'src/app/main/components/statistics/statistic-subtype';
export class StatisticType {
  gatewayId: StatisticSubtype;
  processId: StatisticSubtype;

  constructor() {
    this.gatewayId = new StatisticSubtype();
    this.processId = new StatisticSubtype();
  }
}
