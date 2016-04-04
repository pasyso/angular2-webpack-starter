/**
 * Created by pasyso on 27.03.16.
 */
import {Component, Input} from 'angular2/core';
import {TodoService} from "./../services/todo-service";
import {TodoItemRenderer} from "./todo-item-renderer";
import {SearchPipe} from "./../../search/pipes/search-pipe";
import {StartedPipe} from "./../pipes/started-pipe";


@Component({
  selector:'todo-list',
  pipes: [StartedPipe,SearchPipe],
  directives: [TodoItemRenderer],
  // template:`<div>{{todoService | json}}</div>`
  template:`<div>
  <ul>
    <li *ngFor="#todo of todoService.todos 
    | started : status
    | search : term
    ">
    <todo-item-renderer 
    [todo]="todo"
    (toggle)="todoService.toggleTodo($event)"
    ></todo-item-renderer>
    </li>
  </ul>
  </div>`
})

export class TodoList{
  @Input() status;
  @Input() term;
  constructor(public todoService: TodoService) {

  }
}
