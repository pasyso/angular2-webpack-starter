/**
 * Created by pasyso on 27.03.16.
 */
import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
  selector:'status-selector',
  template:`<div>
  <select #sel (change)="select.emit(sel.value)">
    <option *ngFor="#status of statusNames">
      {{status}}
    </option>  
  </select>
  </div>`
})

export class StatusSelector{
  @Output() select = new EventEmitter();
  statuses = ["all","completed","uncompleted"];
  statusNames = ["все","завершенные","незавершенные"];

  ngOnInit(){
    this.select.emit(this.statuses[0]);
  }
}
