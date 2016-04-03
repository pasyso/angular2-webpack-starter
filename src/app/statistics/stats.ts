/**
 * Created by pasyso on 27.03.16.
 */
import {Component} from 'angular2/core';
import {StatsService} from "./service/stats-service";
// import {Report} from "./report";
// import {BarChartDemo} from "./bar-chart-demo";
import {SimpleChart} from "./components/simple-chart";
import {ChartSelector} from "./components/chart-selector";

@Component({
  selector: 'stats-app',
  providers: [],
  pipes: [],
  directives:[SimpleChart,ChartSelector],
//  directives: [ROUTER_DIRECTIVES],
//  templateUrl: 'app/seed-app.html',
//   directives: [TodoInput,TodoList, StatusSelector, SearchBox],

  template: `<div>
  <!--<button (click)="onClick()">Click me</button>-->
  <chart-selector (select)="dataModelName=$event"></chart-selector>
  <label><input type="checkbox" #show [(ngModel)]="selected"/>Показать таблицу</label>
  <simple-chart [showTable]="selected" [dataModelName]="dataModelName"></simple-chart>
  </div>`

  // template: `<simple-chart></simple-chart>`
  // template: `<line-chart-demo></line-chart-demo>`
})
export class StatsApp {
  data;

  selected:boolean = true;
  dataModelName;

  constructor(public statsService:StatsService) {
    this.dataModelName = statsService.charts[0].title;
  }

  onClick() {
    this.data = this.statsService.getStats();
    console.log(this.data);
  }
}
