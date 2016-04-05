/**
 * Created by pasyso on 27.03.16.
 */
import {Pipe} from "angular2/core"

@Pipe({
  name: "search"
})
export class SearchPipe {
  transform(value, [term]) {
    return value.filter((item)=>item.orderId.includes(term));
  }
}
