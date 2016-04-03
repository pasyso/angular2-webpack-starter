/**
 * Created by pasyso on 27.03.16.
 */
import {Injectable} from "angular2/core";
import {StatsModel} from "./stats-model";
import {ChartDataModel} from "./chart-data-models/chart-data-model";
import {ChartPackageAmountDataModel} from "./chart-data-models/chart-packages-amount";
import {ChartPackageIdentifiedAmountDataModel} from "./chart-data-models/chart-packages-identified-amount";
import {ChartPackageRelativeDataModel} from "./chart-data-models/chart-packages-relative";
// declare var Papa: any;
var Papa = require('papaparse');

@Injectable()
export class StatsService{
  stats:StatsModel = new StatsModel();

  charts = [
    new ChartDataModel(this),
    new ChartPackageAmountDataModel(this),
    new ChartPackageRelativeDataModel(this),
    new ChartPackageIdentifiedAmountDataModel(this),
    new ChartPackageIdentifiedAmountDataModel(this,'red'),
    new ChartPackageIdentifiedAmountDataModel(this,'amber')
  ];

  constructor() {
    Papa.SCRIPT_PATH = "papaparse/papaparse.js";
    this.getStats();
  }

  getStats() {
    const url = "http://localhost:3000/app/statistics/eVHC_Statistics.csv";
    var thiz = this;
    Papa.parse(url, {
      download: true,
      dynamicTyping: true,
      header:true,
      step: function(row) {
        thiz.stats.add(row.data[0]);
        // console.log("Row:", row.data);
      },
      complete: function() {
        console.log("All done!");
        // console.log(thiz.stats);
      }
    });


    // return Papa.parse("Column 1,Column 2,Column 3,Column 4\n1-1,1-2,1-3,1-4\n2-1,2-2,2-3,2-4\n3-1,3-2,3-3,3-4\n4,5,6,7");
    //   {
    //   worker: false,
    //   step: function(row) {
    //     console.log("Row:", row.data);
    //   },
    //   complete: function() {
    //     console.log("All done!");
    //   }
    // });
  }
}
