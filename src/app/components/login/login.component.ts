import {  
  trigger,
  style,
  animate,
  transition,
  state,
  Component,
  OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [
      trigger('changeSize' , [
      state('login', style({
        height: '670px'
      })),
      state('signup', style({
        height: '920px'
      })),
      transition('login => signup', animate('200ms ease-out')),
      transition('signup => login', animate('200ms ease-out'))
  ,]),
    trigger('changeForm' , [
      state('login', style({
        left: '0%'
      })),
      state('signup', style({
        left: 'calc(-100% - 30px)'
      })),
      transition('login => signup', animate('200ms ease-out')),
      transition('signup => login', animate('200ms ease-out'))
  ,]),
  ]


})
export class LoginComponent implements OnInit {
  state: string = 'login'
  constructor() { }

  ngOnInit() {
  }
  form_toggle() {
    this.state = (this.state === 'login' ? 'signup' : 'login');
    console.log(this.state);
  }
}
