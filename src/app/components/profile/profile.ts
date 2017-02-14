import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../providers/http';
import { UserService } from '../../providers/user';
import { Loader } from '../../providers/loader';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $;
declare var Materialize;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {

  public isMe = false;
  public user = {};
  public gigs = [];
  public reviews = [];
  public projectForm: FormGroup;
  constructor(private router: Router, private currentRoute: ActivatedRoute, private http: HttpService, private userService: UserService) {
    this.projectForm = new FormGroup({
      title : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      date : new FormControl('', Validators.required)
    });
  }

  initJqueryPlugins() {
    $('.modal').modal();
    $('#selectSkills').material_chip({
          secondaryPlaceholder: 'Skills Used',
    });
  }

  saveProject() {
    Loader.present();
    let skills = $('.chips').material_chip('data');
    if (skills.length > 0) {
    let thumbnailRequest = this.collectFiles('#thumbnail');
    let attachmentRequest = this.collectFiles('#attachments');
      skills = skills.map(skill => skill.tag);
      Observable.forkJoin(
        this.uploadFiles(thumbnailRequest).map(res => res.json()),
        this.uploadFiles(attachmentRequest).map(res => res.json())
        )
        .subscribe(response => {
          console.log(response[0].response);
          let payload = this.projectForm.value;
          payload.image = response[0].response;
          payload.attachments = response[1].response;
          payload.skills = skills;
          this.http.put('/api/users', {portfolio : [payload]})
            .map(res => res.json())
            .subscribe(editResponse => {
              Materialize.toast('Added to portfolio', 2000);
              Loader.dismiss();
            }, err => {
              Materialize.toast(JSON.stringify(err), 2000);
              Loader.dismiss();
            });
        }, err => {
          Materialize.toast(JSON.stringify(err), 2000);
          Loader.dismiss();
        });
    } else {
      Materialize.toast('Please Select Atleast 2 skills');
    }
  }

  uploadFiles(formData) {
    return this.http.post('/api/upload', formData, null, true);
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

  openCreateProjectModal() {
    this.openModal('#createPortfolio');
  }

  openEditSkillModal() {
    this.openModal('#skillModal');
  }

  deletePortfolio(index) {
    Loader.present();
    this.http.delete('/api/users/portfolio/' + index)
      .map(res => res.json())
      .subscribe(response => {
        this.user['portfolio'].splice(index, 1);
        Materialize.toast('Item Removed From Portfolio');
        Loader.dismiss();
      }, err => {
        Materialize.toast('Something went wrong');
        Loader.dismiss();
      })
  }

  openModal(selector) {
    $(selector).modal('open');
  }

  ngOnInit() {
    Loader.present();
    setTimeout(this.initJqueryPlugins, 500);
    this.currentRoute.params
      .map(params => params['id'])
      .subscribe(userId => {
        if (!userId) {
          this.isMe = true;
          userId = this.userService.getUser().objectId;
        } else {
          this.isMe = false;
        }

        Observable.forkJoin(
          this.http.get('/api/users/' + userId).map(res => res.json()),
          this.http.get('/api/user/gigs/' + userId).map(res => res.json()),
          this.http.get('/api/user/review/' + userId).map(res => res.json())
        ).subscribe(response => {
            this.user = response[0].response;
            this.gigs = response[1].response;
            this.reviews = response[2].response;
            console.log(this.reviews);
            let data = [];
            for (let i = 0; i < this.user['skills'].length; i++) {
              data.push({tag : this.user['skills'][i]});
            }
            $('#editSkills').material_chip({
                  secondaryPlaceholder: 'My Skills',
                  data: data
            });

            Loader.dismiss();
          }, err => {
            Loader.dismiss();
            Materialize.toast('Something went wrong please try again', 2000);
          });
      });
  }

  saveSkills() {
    Loader.present();
    let skills = $('#editSkills').material_chip('data').map(skill => skill.tag);
    this.http.put('/api/users', {skills : skills})
      .map(res => res.json())
      .subscribe(response => {
        this.user['skills'] = skills;
        $('#skillModal').modal('close');
        Loader.dismiss();
      });
  }

}
