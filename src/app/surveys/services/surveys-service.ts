/**
 * Created by pasyso on 27.03.16.
 */
import {Injectable} from "angular2/core";
import {SurveyModel} from "./survey-model";
// import {SurveyModel} from "./survey-model";


@Injectable()
export class SurveysService{
  private __surveys = [];
  // private __surveys:SurveyModel[] = [];

  get surveys() {
    return this.__surveys;
  }

  set surveys(value: any) {
    this.__surveys = [];
    value.forEach((item) => {
      this.__surveys.push(new SurveyModel(item));
    });
    this.__surveys = [...this.__surveys];
  }

  // addTodo(todo:TodoModel) {
  //   this.todos = [...this.todos, todo];
  // }
  //
  // toggleTodo(todo:TodoModel) {
  //   todo.toggle();
  //
  //   const i = this.todos.indexOf(todo);
  //
  //   this.todos = [...this.todos.slice(0,i), todo, ...this.todos.slice(i+1)];
  // }
}
