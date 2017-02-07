import { routes } from './app.router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { SearchComponent } from './components/search/search.component';
import { PostgigComponent } from './components/postgig/postgig.component';
import { GigpageComponent } from './components/gigpage/gigpage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyprofileComponent,
    EditprofileComponent,
    SearchComponent,
    PostgigComponent,
    GigpageComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
