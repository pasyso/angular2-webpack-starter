import {Component} from "angular2/core";
import {CORE_DIRECTIVES, FormBuilder, Validators} from "angular2/common";
import {contentHeaders, appEndpoint} from "../common/headers";
import {Http, Headers, RequestMethod} from "angular2/http";
import {Router} from "angular2/router";
import {SurveysService} from "./services/surveys-service";
import {SurveyList} from "./components/survey-list";
import {StatusSelector} from "./components/status-selector";
import {SearchBox} from "./components/search-box";
import {AppState} from "../app/app.service";

declare var escape: any;

@Component({
  selector: 'surveys-page',
  styles: [ require('./surveys.css')],
  directives: [SurveyList, StatusSelector, SearchBox],
  template: require('./surveys.html'),
})
export class SurveysPage {
  loginForm;

  constructor(public router: Router, public http: Http, fb: FormBuilder, public surveysSerive:SurveysService, public appState:AppState) {
    if (this.surveysSerive.surveys == null || this.surveysSerive.surveys.length == 0) {
      this.getSurveys();
    }
  }

  getSurveys() {
    var user = this.appState.get("user");
    if (user == null) return;
    var systemClientId = user.systemClientId;
    if (systemClientId == null) return;
    console.log('getSurveys',user);
    
    var headers = new Headers();
    contentHeaders.forEach((values, key) => { headers.set(key, values)});

    this.http.get(appEndpoint + '/system-clients/'+systemClientId+'/surveys/', { headers: headers })
      .subscribe(
        response => {
          console.log("response2", response);
          this.surveysSerive.surveys = response.json();
        },
        error => {
          // alert(error.text( ));
          console.log(error);
        }
      );
  }
}
