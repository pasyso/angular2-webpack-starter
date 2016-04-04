import { Component } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { contentHeaders } from '../common/headers';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap';
// let styles   = require('app/login/login.css');
// let template = require('app/login/login.html');

@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, BUTTON_DIRECTIVES ],
  templateUrl: 'app/components/login/login.html',
  styleUrls: [ 'app/components/login/login.css' ]
})
export class Login {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    console.log("login");
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    console.log("login", body);
    // this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
    //   .subscribe(
    //     response => {
    //       localStorage.setItem('jwt', response.json().id_token);
    //       this.router.parent.navigateByUrl('/home');
    //     },
    //     error => {
    //       alert(error.text());
    //       console.log(error.text());
    //     }
    //   );
  }

  // signup(event) {
  //   event.preventDefault();
  //   this.router.parent.navigateByUrl('/signup');
  // }
}
