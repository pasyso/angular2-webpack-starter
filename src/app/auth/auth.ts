import {Component} from "angular2/core";
import {CORE_DIRECTIVES, FormBuilder, Validators} from "angular2/common";
import {contentHeaders, appEndpoint} from "../common/headers";
import {Http, Headers, RequestMethod} from "angular2/http";
import {Router} from "angular2/router";
import {RequestOptions} from "https";
import {AppState} from "../app/app.service";
// import { Cookie } from 'ng2-cookies/ng2-cookies';

declare var escape: any;

@Component({
  selector: 'auth',
  styles: [ require('./auth.css')],
  directives: [CORE_DIRECTIVES],
  template: require('./auth.html'),
})
export class AuthPage {
  loginForm;

  constructor(public router: Router, public http: Http, fb: FormBuilder, public appState:AppState) {
    this.loginForm = fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      remember: true
    });

    let _build = (<any> http)._backend._browserXHR.build;
    (<any> http)._backend._browserXHR.build = () => {
      let _xhr =  _build();
      _xhr.withCredentials = true;
      return _xhr;
    };

  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = name + "=";
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s\+/g, "");
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "";
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
    var headers = new Headers();
    contentHeaders.forEach((values, key) => { console.log("contentHeaders",key, values)});
    contentHeaders.forEach((values, key) => { headers.set(key, values)});
    headers.append(authHeaderName, authHeaderValue);

    headers.forEach((values, key) => { console.log("headers", key, values)});

    // var cookieValue = Cookie.getCookie('session');
    var cookieValue = this.getCookie('session');
    // console.log("cookie-value", document.cookie);
    // console.log(authHeaderValue);
    // console.log(headers);
    this.http.get(appEndpoint + '/users/' + username, { headers: headers })
      .subscribe(
        response => {
          console.log("response", response);
          var user = response.json();
          this.appState.set("user", user);
          console.log("response system-client-id:", response.json().systemClientId);
          console.log("user", user);

          // Cookie.setCookie('cookieName', 'cookieValue');
          // localStorage.setItem('jwt', response.json().id_token);
          this.router.parent.navigateByUrl('/surveys');
        },
        error => {
          // alert(error.text( ));
          console.log(error);
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


  test() {
    var headers = new Headers();
    contentHeaders.forEach((values, key) => { headers.set(key, values)});

    this.http.get(appEndpoint + '/system-clients/1/surveys/', { headers: headers })
      .subscribe(
        response => {
          console.log("response2", response);
          // Cookie.setCookie('cookieName', 'cookieValue');
          // localStorage.setItem('jwt', response.json().id_token);
          // this.router.parent.navigateByUrl('/home');
        },
        error => {
          // alert(error.text( ));
          console.log(error);
        }
      );
  }
}


export function urlBase64Encode(str) {
  // return window.btoa(escape(encodeURIComponent(str)));
  return window.btoa(str);
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
