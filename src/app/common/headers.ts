import { Headers } from 'angular2/http';

export const contentHeaders = new Headers();
// contentHeaders.append('Accept', 'application/json');
// contentHeaders.append('Content-Type', 'application/json');
// public void setUserCredentials(String username, String password) {
//   mUsername = username;
//   mPassword = password;
//   mAuthorizationHeader = "Basic " + Base64.encodeToString(
//       (username + ":" + password).getBytes(), Base64.NO_WRAP);
//
//   mPassword = generatePasswordHash(mUsername, password);
// }


export const appEndpoint = "https://evhc-test-api.untwined-solutions.co.uk/v1";
