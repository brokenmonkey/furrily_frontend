import {   
  trigger,
  style,
  animate,
  transition,
  state,
  Component, 
  OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
    animations: [
      trigger('search' , [
      state('hide', style({
        left: "100%"
      })),
      state('show', style({
        left: 0
      })),
      transition('hide => show', animate('200ms ease-out')),
      transition('show => hide', animate('200ms ease-out'))
  , ])
  ]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  shouldShowNav = true;
  state: string = 'hide';
  constructor(private router: Router) {

  }
  search_toggle() {
    this.state = (this.state === 'hide' ? 'show' : 'hide');
    console.log(this.state);
  }
  ngOnInit() {
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
      });
      this.router.events.subscribe((url) => {
        console.log(url.url);
        if (url.url === '/login' || url.url === '/') {
          this.shouldShowNav = false;
        }
      });
  }
}
