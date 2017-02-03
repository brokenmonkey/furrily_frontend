import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';

export const router: Routes = [
    { path: '', redirectTo: 'myprofile', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'myprofile', component: MyprofileComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);