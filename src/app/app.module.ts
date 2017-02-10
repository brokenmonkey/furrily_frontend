import { routes } from './app.router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Util } from './providers/util';
import { UserService } from './providers/user';
import { HttpService } from './providers/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { SearchComponent } from './components/search/search.component';
import { PostgigComponent } from './components/postgig/postgig.component';
import { GigpageComponent } from './components/gigpage/gigpage.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyprofileComponent,
    EditprofileComponent,
    SearchComponent,
    PostgigComponent,
    GigpageComponent,
    CartComponent,
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
