import {  
  trigger,
  style,
  animate,
  transition,
  state,
  Component,
  OnInit } from '@angular/core';
  import { FormGroup,FormControl,Validators } from '@angular/forms';
  import { HttpService } from '../../providers/http'
  import { UserService } from '../../providers/user'
declare var Materialize;
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
  loginForm : FormGroup;
  signupForm : FormGroup;
  constructor(private user: UserService, private http: HttpService) { 

    this.loginForm = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required)
    })
    this.signupForm =  new FormGroup({
      "firstname": new FormControl('', Validators.required),
      "lastname": new FormControl('', Validators.required),
      "email": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required),
      "confirm_password": new FormControl('', Validators.required),
    })
  }
  ngOnInit() {
  }
  form_toggle() {
    this.state = (this.state === 'login' ? 'signup' : 'login');
    console.log(this.state);
  }
  login(){
    if (this.loginForm.valid){
      this.user.login(this.loginForm.value["username"],this.loginForm.value["password"])
        .subscribe(data => {
          Materialize.toast("login_thay_gayu");
        })
    }
  }
  signup(){
    if (this.signupForm.valid && this.signupForm.value['password'] == this.signupForm.value['confirm_password']){
      // this.user.signuo(this.signupForm.value["firstname"])
      this.http.post("/api/signup", this.signupForm.value)
        .subscribe(res => {
          Materialize.toast("signup_thay_gayu");
          // console.log("chodu");
          
        })
    }
  }
}
