/**
 * Created by pasyso on 28.03.16.
 */
import {Component, ElementRef, ViewChild, Input} from 'angular2/core';
import {StatsService} from "../service/stats-service";

declare var google:any;

google.charts.load('current', {packages: ['corechart', 'bar','table'], language: 'ru'});

@Component({
  selector: 'simple-chart',
  styles: [ require('./simple-chart.css') ],
  // templateUrl: 'app/components/statistics/simple/simple-chart.html',
  template: `<div>
  <!--<div ngClass="visualization_wrap" (window:resize)="onWindowResize($event)">-->
  <div #visualization ngClass="visualization2" (window:resize)="onWindowResize($event)"></div>  
  <!--</div>-->
  <div #table></div>
</div>`
})

// google.chart-data-models.load('current', {packages: ['corechart']});
// google.chart-data-models.setOnLoadCallback(drawChart);

export class SimpleChart {
  @ViewChild('visualization')
  chartHolder;

  @ViewChild('table')
  tableHolder;

  private __initialized:boolean = false;

  private __showTable:boolean;
  @Input()
  set showTable(c: boolean) {
    this.__showTable = c;
    // console.log("showTable >>> " + c);
    if (this.__initialized) {
      this.drawTable();
    }
  }

  get showTable() {
    return this.__showTable;
  }

  prevWidth;
  prevHeight;

  dataModel =  null;

  @Input()
  set dataModelName(dmName) {
    // console.log("dataModelName=" + dmName);
    var dm = this.statsService.charts.filter(function ( obj ) {
      return obj.title === dmName;
    })[0];
    // console.log(dm);
    if (dm === null) return;
    this.dataModel = dm;
    if (this.__initialized) {
      this.draw();
    }
  }


  constructor(public statsService:StatsService) {
  }

//   drawPieChart(holder) {
//     console.log("drawchart");
//     if (!google) {
//       console.error("drawChart >>> google undefined");
//     }
//     // Create the data table.
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'Topping');
//     data.addColumn('number', 'Slices');
//     data.addRows([
//       ['Mushrooms', 3],
//       ['Onions', 1],
//       ['Olives', 1],
//       ['Zucchini', 1],
//       ['Pepperoni', 2]
//     ]);
//
// // Set chart options
//     var options = {
//       'title': 'How Much Pizza I Ate Last Night',
//       'width': 400,
//       'height': 300
//     };
//
//     // Instantiate and draw our chart, passing in some options.
//     var chart = new google.visualization.PieChart(holder);
//     chart.draw(data, options);
//   }

  dataView;
  chartView;

  draw() {
    let thiz = this;
    thiz.dataModel.init();
    thiz.drawChart();
    thiz.drawTable();
  }

  drawChart() {
    let thiz = this;
    // console.log("drawChart");
    thiz.dataView = new google.visualization.DataView(thiz.dataModel.data);
    thiz.chartView = new google.visualization.BarChart(thiz.chartHolder.nativeElement);
    thiz.chartView.draw(thiz.dataView, thiz.dataModel.options);
  }

  drawTable() {
    let thiz = this;
    if (thiz.showTable) {
      if (thiz.dataView === null) {
        return;
      }
      var table = new google.visualization.Table(thiz.tableHolder.nativeElement);
      table.draw(thiz.dataView, {width: '100%', height: '100%'});

      google.visualization.events.addListener(table, 'sort',
        function (event) {
          thiz.dataModel.data.sort([{column: event.column, desc: !event.ascending}]);
          thiz.chartView.draw(thiz.dataView, thiz.dataModel.options);
        });
    } else {
      thiz.tableHolder.nativeElement.innerHTML = "";
    }
  }

  ngAfterViewInit() {
    // console.log("ngAfterViewInit " + this.chartHolder);
    this.prevWidth = window.innerWidth;
    this.prevHeight = window.innerHeight;

    var thiz = this;
    google.charts.setOnLoadCallback(function () {
      // thiz.drawPieChart(thiz.el);
      if (thiz.dataModel === null) {
        console.log("dataModel is null");
      } else {
        thiz.draw();
      }
      thiz.__initialized = true;
    });
  }


  private resizeRunnable = null;

  onWindowResize(event) {
    const threshold = 50;
    if (Math.abs(event.target.innerWidth - this.prevWidth) < threshold
      && Math.abs(event.target.innerHeight - this.prevHeight) < threshold) return;

    this.prevWidth = event.target.innerWidth;
    this.prevHeight = event.target.innerHeight;

    if (this.resizeRunnable != null) clearTimeout(this.resizeRunnable);
    let thiz = this;
    this.resizeRunnable = setTimeout(function () {
      thiz.draw();
      thiz.resizeRunnable = null;
    }, 100);
  }

}
