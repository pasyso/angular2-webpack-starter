/**
 * Created by pasyso on 27.03.16.
 */
import {Component, Input} from 'angular2/core';
// import {TodoItemRenderer} from "./survey-item-renderer";
// import {SearchPipe} from "./../../search/pipes/search-pipe";
// import {StartedPipe} from "./../pipes/started-pipe";
import {SurveysService} from "../services/surveys-service";
import {SurveyItemRenderer} from "./survey-item-renderer";
import {CompletedPipe} from "../pipes/completed-pipe";
import {SearchPipe} from "../pipes/search-pipe";


@Component({
  selector:'survey-list',
  pipes: [CompletedPipe,SearchPipe],
  directives: [SurveyItemRenderer],
  // template:`<div>{{todoService | json}}</div>`
  template:`<div>
  <ul>
    <li *ngFor="#survey of surveysService.surveys 
    | completed : status
    | search : search
    ">
    <survey-item-renderer [survey]="survey"></survey-item-renderer>
    </li>
  </ul>
  </div>`
})

export class SurveyList{
  @Input() status;
  @Input() search;
  constructor(public surveysService: SurveysService) {

  }
}
