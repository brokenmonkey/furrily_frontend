import {
  trigger,
  style,
  animate,
  transition,
  state,
  Component, 
  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './providers/user';

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
  user;
  constructor(private router: Router, private userService: UserService) {
   setTimeout(value => {
      $('.button-collapse').sideNav({
          menuWidth: 300, // Default is 300
          edge: 'right', // Choose the horizontal origin
          closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
          draggable: true // Choose whether you can drag to open on touch screens
        });
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
          });
        }, 300);
    this.user = userService.getUser();
  }
  search_toggle() {
    this.state = (this.state === 'hide' ? 'show' : 'hide');
    console.log(this.state);
  }

  ngOnInit() {
      this.router.events.subscribe((url) => {
        this.user = this.userService.getUser();
        if (this.user.token) {
          if (url.url === '/login' || url.url === '/') {
            this.router.navigate(['/filter']);
            this.shouldShowNav = true;
          }

        } else {
          this.router.navigate(['/login']);
          this.shouldShowNav = false;
        }
      });
  }
}
