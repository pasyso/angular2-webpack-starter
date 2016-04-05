/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {Home} from '../home';
import {AppState} from './app.service.ts';
import {StatsApp} from "./../statistics/stats";
import {AuthPage} from "./../auth/auth";
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';
import {RouterActive} from "../router-active";
import {TestApp} from "../test/test";
import {SurveysPage} from "../surveys/surveys";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive, Alert ],
  styles: [ require('./app.css') ],
  template: require('./app.html')
})
@RouteConfig([
  // { path: '/', redirectTo: '/home' },
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  // Async load a component using Webpack's require with es6-promise-loader and webpack `require`
  { path: '/about', name: 'About', loader: () => require('es6-promise!./../about/index')('About') },
  { path: '/stats',  name: 'Stats',  component: StatsApp },
  { path: '/login',  name: 'Auth',  component: AuthPage },
  { path: '/test',  name: 'Test',  component: TestApp },
  { path: '/surveys',  name: 'Surveys',  component: SurveysPage },
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState) {}

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
