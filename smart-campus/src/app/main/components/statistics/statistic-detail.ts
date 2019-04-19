import { Statistic } from 'src/app/shared/models/statistic';

export class StatisticDetail {
  barChartLabels: string[];
  barChartData: any[];

  constructor() {
    this.barChartLabels = new Array();
    this.barChartData = new Array();
  }

  addElement(statistic: Statistic, type: string, subtype: string) {
    type = String(statistic.id[type]);
    subtype = String(statistic.id[subtype]);
    let chartDataSets = this.barChartData.find(e => e.label === type);
    if (!chartDataSets) {
      chartDataSets = {
        label: type,
        data: []
      };
      this.barChartData.push(chartDataSets);
    }
    const barChartLabels = this.barChartLabels.find(e => e === subtype);
    if (!barChartLabels) {
      this.barChartLabels.push(subtype);
    }
    const data = statistic.count;
    chartDataSets.data.push(data);
  }

  sortData() {

  }
}
