/**
 * Created by pasyso on 27.03.16.
 */
import {Injectable} from "angular2/core";
import {TodoModel} from "./todo-model";


@Injectable()
export class TodoService{
  todos = [
    new TodoModel("eat"),
    new TodoModel("sleep"),
    new TodoModel("code","completed"),
    new TodoModel("cow"),
    new TodoModel("monkey"),
    new TodoModel("play"),
    new TodoModel("record","completed"),
    new TodoModel("star"),
    new TodoModel("push","completed"),
    new TodoModel("pull"),
    new TodoModel("singer","completed"),
    new TodoModel("swim","completed"),
    new TodoModel("exercise"),
    new TodoModel("load")
  ];

  addTodo(todo:TodoModel) {
    this.todos = [...this.todos, todo];
  }

  toggleTodo(todo:TodoModel) {
    todo.toggle();

    const i = this.todos.indexOf(todo);

    this.todos = [...this.todos.slice(0,i), todo, ...this.todos.slice(i+1)];
  }
}
