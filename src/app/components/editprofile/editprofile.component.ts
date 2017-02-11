import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpService } from '../../providers/http' 
import { UserService } from '../../providers/user'

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  // styleUrls: ['./editprofile.component.sass']
})
export class EditprofileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
