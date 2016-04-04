/**
 * Created by pasyso on 27.03.16.
 */
export class TodoModel{

  constructor(public title:string = "",
              public status:string = "started") {}

  toggle():void {
    this.status = this.status == "started" ? "completed" : "started";
  }
}
