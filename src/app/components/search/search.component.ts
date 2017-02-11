import { 
  trigger,
  style,
  animate,
  transition,
  state,
  Component,
  OnInit } from '@angular/core';
var $;
var noUiSlider;
var wNumb;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  // styleUrls: ['./search.component.sass']
  animations: [
    trigger("filters",[
      state("hide", style({
        top: "-100%"
      })),
      state("show", style({
        top: "0"
      })),
      state("desktop", style({
        top: 0 ,
        left: 0
      })),
      transition('* => *', animate('200ms ease-out'))
    ])
  ]
})
export class SearchComponent implements OnInit {
  state: string = "hide"
  constructor() { }
  filter_toggle() {
    this.state = (this.state === 'hide' ? 'show' : 'hide');
    console.log(this.state);
  }
  ngOnInit() {
  //   var slider = document.getElementById('slider');
  //   noUiSlider.create(slider, {
  //   start: [20, 80],
  //   connect: true,
  //   step: 1,
  //   range: {
  //     'min': 0,
  //     'max': 100
  //   },
  //   format: wNumb({
  //     decimals: 0
  //   })
  // });
        
  }

}
