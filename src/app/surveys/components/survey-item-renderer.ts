/**
 * Created by pasyso on 27.03.16.
 */
import {Component, Input, ViewEncapsulation, Output, EventEmitter} from "angular2/core"

@Component({
  selector: 'survey-item-renderer',
  template: `
  <style>
    .completed { 
        text-decoration: line-through;
    }
  </style>
  <div>
      <span [ngClass]="survey.status">{{survey.orderId}}</span>      
   </div>`
})

export class SurveyItemRenderer {
  @Input() survey;
  // @Output() toggle = new EventEmitter();
}
