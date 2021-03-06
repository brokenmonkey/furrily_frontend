import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SearchComponent } from './components/search/search.component';
import { PostGigComponent } from './components/post-gig/post-gig.component';
import { GigPageComponent } from './components/gig-page/gig-page.component';
import { CartComponent } from './components/cart/cart.component';
import { ChatComponent } from './components/chat/chat.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'my-profile', component: ProfileComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'filter', component: SearchComponent },
    { path: 'post-gig', component: PostGigComponent},
    { path: 'gig-page', component: GigPageComponent},
    { path: 'cart' , component: CartComponent},
    { path: 'chat' , component: ChatComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
