import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginService } from './services/login.service';
import { HttpApiClient } from './services/httpapiclient.service';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    LoginService,
    provideHttpClient(),
    {
      provide: HttpApiClient,
      useClass: HttpApiClient
    },
    {
      provide: 'BACKEND_ENDPOINT',
      useFactory: () => { return environment.apiEndPoint; },
      deps: []
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync()
  ]
};
