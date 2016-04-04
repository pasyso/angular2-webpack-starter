import {Component} from "angular2/core";
import {CORE_DIRECTIVES, FormBuilder, Validators} from "angular2/common";
import {contentHeaders, appEndpoint} from "../common/headers";
import {Http, Headers} from "angular2/http";
import {Router} from "angular2/router";

declare var escape: any;

@Component({
  selector: 'auth',
  styles: [ require('./auth.css')],
  directives: [CORE_DIRECTIVES],
  template: require('./auth.html'),
})
export class AuthPage {
  loginForm;

  constructor(public router: Router, public http: Http, fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      remember: true
    });
  }

  login(event) {
    console.log("login", this.loginForm.value);
    event.preventDefault();
    //   mAuthorizationHeader = "Basic " + Base64.encodeToString(
//       (username + ":" + password).getBytes(), Base64.NO_WRAP);

    // headers.append('Authorization', `Bearer ${authToken}`);
    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;

    var authData = username + ':' + password;
    var authHeaderValue = "Basic " + urlBase64Encode(authData);
    var authHeaderName = "Authorization";
    var headers = new Headers(contentHeaders);
    headers.set(authHeaderName, authHeaderValue);
    console.log(headers);

    this.http.get(appEndpoint + '/users/' + username, { headers: headers })
      .subscribe(
        response => {
          console.log("response", response);
          // localStorage.setItem('jwt', response.json().id_token);
          // this.router.parent.navigateByUrl('/home');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );

    // headers.forEach((values, key) => { console.log(key, values)});
    // console.log("login2", body);
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

}


export function urlBase64Encode(str) {
  return window.btoa(escape(encodeURIComponent(str)));
}

export function urlBase64Decode(str:string) {
  var output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0: { break; }
    case 2: { output += '=='; break; }
    case 3: { output += '='; break; }
    default: {
      throw 'Illegal base64url string!';
    }
  }

  return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
}
