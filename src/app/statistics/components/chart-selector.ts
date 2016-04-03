/**
 * Created by pasyso on 27.03.16.
 */
import {Component, Output, EventEmitter} from 'angular2/core';
import {StatsService} from "../service/stats-service";

@Component({
  selector:'chart-selector',
  template:`<div>
  <select #sel (change)="select.emit(sel.value)">
    <option *ngFor="#chart of statsService.charts">
      {{chart.title}}
    </option>  
  </select>
  </div>`
})

export class ChartSelector{
  @Output() select = new EventEmitter();
  // statuses = ["Выполненные eVHC","Согласованные работы","Несогласованные работы"];

  constructor(public statsService:StatsService) {
  }

  // ngOnInit(){
  //   this.select.emit(this.statsService.charts[0].title);
  // }
}
