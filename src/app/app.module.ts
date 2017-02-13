import { routes } from './app.router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Util } from './providers/util';
import { UserService } from './providers/user';
import { HttpService } from './providers/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SearchComponent } from './components/search/search.component';
import { PostGigComponent } from './components/post-gig/post-gig.component';
import { GigPageComponent } from './components/gig-page/gig-page.component';
import { CartComponent } from './components/cart/cart.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    SearchComponent,
    PostGigComponent,
    GigPageComponent,
    CartComponent,
    ChatComponent,
    HomeComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    ReactiveFormsModule
  ],
  providers: [
    HttpModule,
    HttpService,
    Util,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
