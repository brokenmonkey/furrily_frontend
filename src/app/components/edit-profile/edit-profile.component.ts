import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../providers/user';
import { HttpService } from '../../providers/http';
import { Loader } from '../../providers/loader';


declare var $;
declare var Materialize;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})


export class EditProfileComponent implements OnInit {

  profilePicture;
  user = {};
  profileForm: FormGroup;
  constructor(private http: HttpService, private userService: UserService) {
    this.profileForm = new FormGroup({
      firstname : new FormControl('', Validators.required),
      lastname : new FormControl('', Validators.required),
      country : new FormControl(''),
      city : new FormControl(''),
      state : new FormControl(''),
      email : new FormControl('', Validators.required),
      bio : new FormControl(''),
      phone_number : new FormControl('')
    });

  }
  collectFiles(selector): any {
    let files = $(selector).prop('files');
    let formData = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append(files[i].fileName, files[i]);
      }
    }
    return formData;
  }

  ngOnInit() {
    Loader.present();
    this.http.get('/api/users/' + this.userService.getUser().objectId)
      .map(res => res.json())
      .subscribe(response => {
        this.user = response.response;
        console.log(this.user['langauges']);

        let langauges = this.user['langauges'].map((value) => {return {tag : value}; });
        console.log(langauges);

        $('.chips').material_chip({
          secondaryPlaceholder: 'Langauges',
          data: langauges
        });

        this.profileForm.patchValue(this.user);
        Materialize.updateTextFields();
        Loader.dismiss();
      });
  }

  save() {
    Loader.present();
    if (this.profilePicture) {
      let formData = new FormData();
      formData.append('dp', this.profilePicture);
      this.http.post('/api/upload', formData, null, true)
        .map(res => res.json())
        .subscribe(uploadResponse => {
          let url = uploadResponse.response[0];
          this.saveProfile(url);
        });
    } else {
      this.saveProfile();
    }
  }

  saveProfile(profilePicture = null) {
    let langauges = $('.chips').material_chip('data').map(skill => skill.tag);
    let payload = this.profileForm.value;
    payload.langauges = langauges;
    if (profilePicture) {
      payload.profilePicture = profilePicture;
    }
    this.http.put('/api/users', payload)
      .map(res => res.json())
      .subscribe(response => {
        Materialize.toast('Profile Updated');
        Loader.dismiss();
      }, err => {
        Materialize.toast('Something went wrong');
        Loader.dismiss();
      });
  }

  fileSelected($event) {
    let file = $event.srcElement.files[0];
    this.profilePicture = file;
    this.loadPreview(file);
  }

  loadPreview(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        $('.profilePicture').css('background',  'url("' + reader.result + '")');
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
  }
}
