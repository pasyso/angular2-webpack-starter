import {StatsService} from "./../stats-service";
/**
 * Created by pasyso on 28.03.16.
 */
declare var google:any;

export class ChartPackageAmountDataModel {

  constructor(public statsService:StatsService) {
  }

  title = 'Сумма согласованных работ eVHC';
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
    this.data.addColumn('number', '"Зеленый тип"');
    this.data.addColumn('number', '"Желтый тип"');
    this.data.addColumn('number', '"Красный тип"');

    var dataRows = [];
    stats.statByName.forEach(function (value, key, map) {
      // console.log(value);
      dataRows.push([key,
        value["approved_amount_green"],
        value["approved_amount_amber"],
        value["approved_amount_red"]
        // (value["approved_amount_red"]+value["approved_amount_amber"]+value["approved_amount_green"])
      ]);
    });
    this.data.addRows(dataRows);

    this.options = {
      title: this.title,
      height:''+dataRows.length*40,
      axisTitlesPosition: 'out',
      'isStacked': true,
      pieSliceText: 'percentage',
      colors: ['#005A2B', '#ffc107', '#C00000'],
      chartArea: {
        left: "25%",
        // top: "3%",
        height: "80%",
        width: "50%"
      },
      hAxis: {
        title: 'рубли',
        minValue: 0,
      },
      vAxis: {
        title: 'Мастер'
      },
      // bars: 'horizontal'
    };
  }
}
