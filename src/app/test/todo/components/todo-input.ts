/**
 * Created by pasyso on 27.03.16.
 */
import {Component} from "angular2/core";
import {TodoService} from "./../services/todo-service";
import {TodoModel} from "./../services/todo-model";

@Component({
  selector : 'todo-input',
  template: `<div>
  Here will be data
  <form (submit)="onSubmit()">
  <!--<input type="text" #myInput>-->
  <input type="text" [(ngModel)]="todoModel.title">
  {{todoModel.title}}
  <!--<button (mouseover)="onClick($event, myInput.value)">Click me</button>-->
  <!--<button (mouseover)="onClick()">Click me</button>-->
  </form>
  </div>`
})

export class TodoInput{
  todoModel:TodoModel = new TodoModel();

  constructor(public todoService:TodoService){
    this.todoService = todoService;
    // console.log(todoService);
  }

  // onClick(event, value){
  //   this.todoService.todos.push(value);
  //   console.log(this.todoService.todos)
  //   // console.log(event, value);
  // }

  onSubmit(){
    this.todoService.addTodo(this.todoModel);
    console.log(this.todoService.todos)
    this.todoModel = new TodoModel();
  }

}

