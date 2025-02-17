import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'welcome', component: WelcomeComponent },
];
