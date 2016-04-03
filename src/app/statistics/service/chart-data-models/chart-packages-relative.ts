import {StatsService} from "./../stats-service";
/**
 * Created by pasyso on 28.03.16.
 */
declare var google:any;

export class ChartPackageRelativeDataModel {

  constructor(public statsService:StatsService) {
  }

  title = 'Доля согласованных в стоимости выявленных работ';
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
    this.data.addColumn('number', '"Красный тип"');
    this.data.addColumn('number', '"Желтый тип"');
    this.data.addColumn('number', 'Всего');

    var dataRows = [];
    stats.statByName.forEach(function (value, key, map) {
      // console.log(value);
      var red = value["approved_amount_red"]/value["identified_amount_red"]*100;
      var yellow = value["approved_amount_amber"]/value["identified_amount_amber"]*100;
      var total = (value["approved_amount_red"]+value["approved_amount_amber"]+value["approved_amount_green"])/(value["identified_amount_red"]+value["identified_amount_amber"]+value["identified_amount_green"])*100;
      dataRows.push([key,
        (isNaN(red)? 0 : red),
        (isNaN(yellow)? 0 : yellow),
        (isNaN(total) ? 0 : total)
      ]);
    });
    this.data.addRows(dataRows);
    this.options = {
      title: this.title,
      height:''+dataRows.length*40,
      axisTitlesPosition: 'out',
      colors: ['#C00000', '#ffc107', '#000'],
      chartArea: {
        left: "25%",
        // top: "3%",
        height: "80%",
        width: "50%"
      },
      hAxis: {
        title: '%',
        minValue: 0,
      },
      vAxis: {
        title: 'Мастер'
      },
      // bars: 'horizontal'
    };
  }
}
