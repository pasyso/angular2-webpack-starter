/**
 * Created by pasyso on 27.03.16.
 */
import {Component} from 'angular2/core';

import {TodoInput} from './todo/components/todo-input';
import {TodoList} from './todo/components/todo-list';
import {StatusSelector} from "./todo/components/status-selector";
import {SearchBox} from "./search/components/search-box";

@Component({
  selector: 'test-app',
  providers: [],
  pipes: [],
//  directives: [ROUTER_DIRECTIVES],
//  templateUrl: 'app/seed-app.html',
  directives: [TodoInput,TodoList, StatusSelector, SearchBox],
  template: `<div>
  <search-box (update)="term = $event"></search-box>
  <todo-input></todo-input>
  <status-selector (select)="status = $event"></status-selector>
  <todo-list [status]="status" [term]="term"></todo-list>
  </div>`
})
export class TestApp {

  constructor() {}

}
