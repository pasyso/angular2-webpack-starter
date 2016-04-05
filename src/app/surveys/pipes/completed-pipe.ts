/**
 * Created by pasyso on 27.03.16.
 */
import {Pipe} from "angular2/core"

@Pipe({
  name: "completed"
})
export class CompletedPipe {
  transform(value, [status]) {
    return value.filter((item)=> item.completed === (status === 'completed'));
  }
}
