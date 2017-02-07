import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-postgig',
  templateUrl: './postgig.component.html',
  // styleUrls: ['./postgig.component.sass']
})
export class PostgigComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      $('.chips').material_chip();
  $('.chips-initial').material_chip({
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  });
  $('.chips-placeholder').material_chip({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: '+Tag',
  });
  $('.chips-autocomplete').material_chip({
    autocompleteData: {
      'Apple': null,
      'Microsoft': null,
      'Google': null
    }
  });
  }

}
