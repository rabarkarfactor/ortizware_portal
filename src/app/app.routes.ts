import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { ProfileadmComponent } from './pages/profileadm/profileadm.component';
import { UsradmComponent } from './pages/usradm/usradm.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'warehouse', component: WarehouseComponent },
    { path: 'profileadm', component: ProfileadmComponent },
    { path: 'usradm', component: UsradmComponent }
];
