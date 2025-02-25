import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import { PrimeIcons } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    CookieService,
    provideAnimationsAsync(),
    PrimeIcons,
    providePrimeNG({ theme: { preset: Aura, options: {} } }),
    //adding charting function to the app
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(),
    // provideHttpClient(withInterceptors([httpInterceptor])),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
