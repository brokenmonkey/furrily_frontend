import { Component, OnInit } from '@angular/core';

declare var $;
@Component({
  selector: 'app-gigpage',
  templateUrl: './gigpage.component.html',
  // styleUrls: ['./gigpage.component.sass']
})
export class GigpageComponent implements OnInit {
  dateObj : Date;
  constructor() {
    this.dateObj = new Date()
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
