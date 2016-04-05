import { Headers } from 'angular2/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
// contentHeaders.append('access-control-allow-credentials','true');
// contentHeaders.append('Content-Type', 'application/json');
// contentHeaders.append('XUser-Agent', 'NP3');
// public void setUserCredentials(String username, String password) {
//   mUsername = username;
//   mPassword = password;
//   mAuthorizationHeader = "Basic " + Base64.encodeToString(
//       (username + ":" + password).getBytes(), Base64.NO_WRAP);
//
//   mPassword = generatePasswordHash(mUsername, password);
// }


export const appEndpoint = "http://127.0.0.1:8080/https://evhc-test-api.untwined-solutions.co.uk/v1";
