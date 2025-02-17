import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

export function getBackendEndpoint() {
  return environment.apiEndPoint;
}

export function getApiErrorDetails(error: any) {
  if(error instanceof HttpErrorResponse) {
      return {
          errorSource: 'Api',
          statusDescription: error.message
      };
  }
  else if(error.error)
      return error.error;
  else {
      return {
          errorSource: 'Api',
          statusDescription: 'Unknown Error Received'
      };
  }
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'BACKEND_ENDPOINT', useFactory: getBackendEndpoint, deps: [] }
];

if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
