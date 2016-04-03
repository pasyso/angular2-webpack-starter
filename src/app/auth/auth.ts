import {Component} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";

@Component({
  selector: 'auth',
  template: require('./auth.html'),
  styles: [ require('./auth.css')],
  directives: [CORE_DIRECTIVES]
})
export class AuthPage {
}
