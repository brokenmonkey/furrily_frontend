import { Component, OnInit } from '@angular/core';

declare var $;
@Component({
  selector: 'app-gig-page',
  templateUrl: './gig-page.component.html',
})
export class GigPageComponent implements OnInit {
  dateObj: Date;
  constructor() {
    this.dateObj = new Date();
  }

  ngOnInit() {
      $('.carousel.carousel-slider').carousel({fullWidth: true});
      // var dateObj : Date;
  $(document).ready(function(){
    $('.collapsible').collapsible();
    // console.log(date);
  });
  }

}
