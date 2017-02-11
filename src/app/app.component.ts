import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  shouldShowNav = true;

  constructor(private router: Router) {

  }

  ngOnInit() {
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
      });
      this.router.events.subscribe((url) => {
        if (url.url === '/login') {
          this.shouldShowNav = false;
        }
      });
  }
}
