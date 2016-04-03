import {StatsService} from "./../stats-service";
/**
 * Created by pasyso on 28.03.16.
 */
declare var google:any;

export class ChartDataModel {

  constructor(public statsService:StatsService) {
  }

  title = 'Выполнение eVHC';
  data = null;
  options;

  init() {
    if (this.data !== null) return;
    if (!google) {
      console.error("init >>> google undefined");
      return;
    }
    // Create the data table.
    var stats = this.statsService.stats;
    this.data = new google.visualization.DataTable();
    this.data.addColumn('string', 'Мастер');
    this.data.addColumn('number', 'Завершенные');
    this.data.addColumn('number', 'Незавершенные');
    this.data.addColumn('number', 'Доля завершенных');

    var dataRows = [];
    stats.statByName.forEach(function (value, key, map) {
      dataRows.push([key, value['survey_completed'], (value['total']-value['survey_completed']),
        value['survey_completed']/value['total']]);
    });
    this.data.addRows(dataRows);

    this.options = {
      title: this.title,
      height:''+dataRows.length*40,
      chartArea: {
        left: "25%",
        // top: "3%",
        height: "80%",
        width: "50%",
      },
      hAxis: {
        title: 'Количество',
        minValue: 0,
      },
      vAxis: {
        title: 'Мастер'
      },
      // bar: {groupWidth: '95%'},
      seriesType: 'bars',
      series: {
        2: {
          type: 'line',
        }
      }

      // ,bars: 'horizontal'
    };
  }
}
