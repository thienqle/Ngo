import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators  } from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  personalForm : FormGroup;
  countries = ['Brazil','France','Germany', 'Italy','USA'];

  constructor(private formBuilder: FormBuilder,private auth: AuthService) {
    //this.personalForm = this.createFormGroup();
    this.personalForm = this.createFormGroupWithBuilder(this.formBuilder);
    this.auth.gift_form = null;
    this.auth.user_form = null;
  }

  isValid(controlName){
    return this.personalForm.get(controlName).invalid && this.personalForm.get(controlName).touched;
  }

  ngOnInit() {
    this.personalForm = this.createFormGroupWithBuilder(this.formBuilder);
    //this.personalForm = this.createFormGroup();
    this.auth.gift_form = null;
    this.auth.user_form = null;
  }

  //first
  createFormGroup() {
    return new FormGroup({
      personalData: new FormGroup({
        firstname: new FormControl(this.auth.user_detail.firstName,Validators.required),
        lastname: new FormControl(this.auth.user_detail.lastName,Validators.required),
        phone: new FormControl(this.auth.user_detail.phone,Validators.required),
        email: new FormControl(this.auth.user_detail.emailId,[Validators.required,Validators.required]),
        address1: new FormControl(this.auth.user_detail.address1,Validators.required),
        address2: new FormControl(this.auth.user_detail.address2,Validators.required),
        city: new FormControl(this.auth.user_detail.city,Validators.required),
        state: new FormControl(this.auth.user_detail.state,Validators.required),
        zip: new FormControl(this.auth.user_detail.zipCode,Validators.required),
        country: new FormControl(this.auth.user_detail.country,Validators.required),
        urbanization:new FormControl(this.auth.user_detail.urbanization,Validators.required),
      }),
      requestType: new FormControl(),
      text: new FormControl()
    });
  }

  //Second
  createFormGroupWithBuilder(formBuilder: FormBuilder) {
    console.log("Form created call!");
    console.log(this.auth.user_detail);
    console.log(this.auth.user_auth);

    return formBuilder.group({
      personalData: formBuilder.group({
        firstname: [this.auth.user_detail.firstName,Validators.required],
        lastname: [this.auth.user_detail.lastName,Validators.required],
        phone: [this.auth.user_detail.phone,Validators.required],
        email: [this.auth.user_detail.emailId,[Validators.required,Validators.email]],
        address1: [this.auth.user_detail.address1,Validators.required],
        address2: [this.auth.user_detail.address2,Validators.required],
        city: [this.auth.user_detail.city,Validators.required],
        state: [this.auth.user_detail.state,Validators.required],
        zip: [this.auth.user_detail.zipCode,Validators.required],
        country: [this.auth.user_detail.country,Validators.required],
        urbanization:[this.auth.user_detail.urbanization,Validators.required],
      }),
      requestType: '',
      text: ''
    });
  }

  revert() {
    // Resets to blank object
    this.personalForm.reset();
  }

  onSubmit() {
    console.log(this.personalForm);
    if(this.personalForm.valid){
      this.auth.status = 1;
      this.auth.user_form = this.personalForm.value.personalData;
      this.auth.user_form._id = this.auth.user_detail.id;
      console.log(this.auth.user_form);
      this.auth.editAllUserDetail(this.auth.user_form).subscribe(
        (result)=>{console.log("success to update whole object"); console.log(result);},
        (err)=>{console.log(err)}
      );
    }
  }

  onCancel(){
    this.auth.status = 1;
  }
}
