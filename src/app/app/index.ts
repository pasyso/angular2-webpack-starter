// App
import {StatsService} from "./../statistics/service/stats-service";
export * from './app.component.ts';
export * from './app.service.ts';

import {AppState} from './app.service.ts';
import {TodoService} from "../test/todo/services/todo-service";

// Application wide providers
export const APP_PROVIDERS = [
  AppState, StatsService, TodoService,
];
