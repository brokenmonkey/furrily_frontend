import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../providers/http';
import { Loader } from '../../providers/loader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-post-gig',
  templateUrl: './post-gig.component.html',
  // styleUrls: ['./postgig.component.sass']
})
export class PostGigComponent implements OnInit {

  title;
  gigForm: FormGroup;
  banners;
  attachments;
  gigId;
  constructor(private http: HttpService, private route: ActivatedRoute) {
    this.title = 'Post a GIG';
    this.gigForm = new FormGroup({
        title : new FormControl('', Validators.required),
        description : new FormControl('', Validators.required),
        price : new FormControl('', Validators.required),
        time : new FormControl('', Validators.required)
    });
    this.route.params
      .map(params => params['id'])
      .subscribe(gigId => {
        if (gigId) {
          this.gigId = gigId;
          this.title = 'Edit Gig';
        }
      });
  }

  selectFile($event, which) {
    console.log(which);
    if (which === 'banners') {
      this.banners = $event.srcElement.files;
    } else {
      this.attachments = $event.srcElement.files;
    }
    console.log(this.banners);

  }

  initilizeChipField(selector, data?) {
    data = data || [];
    $('.chips').material_chip({data : data});
  }

  ngOnInit() {
    if (this.gigId) {
      this.http.get('/api/gigs/' + this.gigId)
        .map(res => res.json().response)
        .subscribe(response => {
          console.log(response);

          this.initilizeChipField('skills', response.skills.map(skill => { return {tag : skill}; }));
          this.initilizeChipField('categories', response.categories.map(category => { return {tag : category}; }));
          this.gigForm.patchValue(response);
          Materialize.updateTextFields();
        });
    } else {
      this.initilizeChipField('skills');
      this.initilizeChipField('categories');
    }
  }

  edit() {
    Loader.present();
    let payload = this.gigForm.value;
      payload.skills = this.getValuesFromChip('#skills');
      payload.categories = this.getValuesFromChip('#skills');
      payload.objectId = this.gigId;
      if (payload.skills.length < 2) {
        Materialize.toast('Please Select atleast two skills');
      } else if (payload.categories.length < 2) {
        Materialize.toast('Please Select atleast two categories');
      } else {
          this.http.put('/api/gigs', payload)
            .map(res => res.json())
            .subscribe(saveResponse => {
              Materialize.toast('Gig Updated', 5000);
              Loader.dismiss();
            }, err => {
              Loader.dismiss();
              Materialize.toast('Something went wrong', 5000);
            });
      }

  }

  decide() {
    if (this.gigId) {
      this.edit();
    } else {
      this.save();
    }
  }

  getFormDataObject(fileGroup) {
    let formData = new FormData();
    if (fileGroup) {
      for (let i = 0; i < fileGroup.length; i++) {
        formData.append(i, fileGroup[i]);
      }
    }
    return formData;
  }

  getValuesFromChip(selector) {
    let data = $(selector).material_chip('data').map((value) => { return value.tag; });
    return data;
  }

  save() {
    Loader.present();
    Observable.forkJoin(
      this.http.post('/api/upload', this.getFormDataObject(this.banners), null, true).map(res => res.json()),
      this.http.post('/api/upload', this.getFormDataObject(this.attachments), null, true).map(res => res.json())
    ).subscribe(uploadResponse => {
      let bannerUrls = uploadResponse[0].response;
      let attachmentUrls = uploadResponse[1].response;
      console.log(bannerUrls);
      if (bannerUrls.length >= 2) {
        let payload = this.gigForm.value;
        payload.banners = bannerUrls;
        payload.attachments = attachmentUrls;
        payload.skills = this.getValuesFromChip('#skills');
        payload.categories = this.getValuesFromChip('#categories');
        if (payload.skills.length < 2) {
          Materialize.toast('Please Select atleast two skills');
        } else if (payload.categories.length < 2) {
          Materialize.toast('Please Select atleast two categories');
        } else {
          this.http.post('/api/gigs', payload)
            .map(res => res.json())
            .subscribe(saveResponse => {
              Materialize.toast('Gig Posted', 5000);
              Loader.dismiss();
            }, err => {
              Materialize.toast('Something went wrong', 5000);
              console.log(err);
              Loader.dismiss()
            });
        }
      } else {
        Materialize.toast('Please Upload atleast two banners');
      }
    }, err => {
      console.log(err);
    });
  }

}
