import {StatsService} from "./../stats-service";
import {el} from "angular2/testing_internal";
/**
 * Created by pasyso on 28.03.16.
 */
declare var google:any;

export class ChartPackageIdentifiedAmountDataModel {

  variant = null;

  constructor(public statsService:StatsService, variant:string = null) {
    this.variant = variant;
    if (this.variant === "red") {
      this.title += ": Красный тип";
    } else if (this.variant === "amber") {
      this.title += ": Желтый тип";
    }
  }

  title = 'Сумма выявленных работ eVHC';
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
    this.data.addColumn('number', 'Согласовано');
    this.data.addColumn('number', 'Отложено');
    this.data.addColumn('number', 'Отклонено');
    var dataRows = [];
    
    if (this.variant === "red") {
      stats.statByName.forEach(function (value, key, map) {
        dataRows.push([key,
          value["approved_amount_red"],
          value["deferred_amount_red"],
          value["rejected_amount_red"]
        ]);
      });
    } else if (this.variant === "amber") {
      stats.statByName.forEach(function (value, key, map) {
        dataRows.push([key,
          value["approved_amount_amber"],
          value["deferred_amount_amber"],
          value["rejected_amount_amber"]
        ]);
      });
    } else {
      stats.statByName.forEach(function (value, key, map) {
        dataRows.push([key,
          (value["approved_amount_red"] + value["approved_amount_amber"] + value["approved_amount_green"]),
          (value["deferred_amount_red"] + value["deferred_amount_amber"] + value["deferred_amount_green"]),
          (value["rejected_amount_red"] + value["rejected_amount_amber"] + value["rejected_amount_green"])
        ]);
      });
    }

    this.data.addRows(dataRows);

    this.options = {
      title: this.title,
      height: '' + dataRows.length * 40,
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
