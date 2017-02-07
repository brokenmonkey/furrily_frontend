import { Component, OnInit } from '@angular/core';

declare var $;
@Component({
  selector: 'app-gigpage',
  templateUrl: './gigpage.component.html',
  // styleUrls: ['./gigpage.component.sass']
})
export class GigpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('.carousel.carousel-slider').carousel({fullWidth: true});
      
  $(document).ready(function(){
    $('.collapsible').collapsible();
  });
        
  }

}
