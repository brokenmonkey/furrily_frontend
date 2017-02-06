import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { SearchComponent } from './components/search/search.component';

export const router: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'myprofile', component: MyprofileComponent },
    { path: 'editprofile', component: EditprofileComponent },
    { path: 'search', component: SearchComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);