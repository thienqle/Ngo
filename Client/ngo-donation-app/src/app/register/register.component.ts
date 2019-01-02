import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {

  username: String;
  password: String;
  firstName: String;
  lastName: String;
  email: String;
  type: Number;
  id: any;
  error: any;

  ngOnInit() {
    if(this.auth.managerment_status==2){
      this.onEdit();
    } else {
      this.username = '';
      this.password  = '';
      this.firstName  = '';
      this.lastName  = '';
      this.email  = '';
      this.type = 0;
      this.id = '';
    }
  }

  onEdit(){
    this.type = this.auth.current_edit_element.type;
    this.firstName = this.auth.current_edit_element.firstName;
    this.lastName = this.auth.current_edit_element.lastName;
    this.email = this.auth.current_edit_element.emailId;
  }

  constructor(private auth: AuthService) { }

  public submit() {
    if(this.auth.managerment_status==1){
      this.auth.register(this.username,this.password,this.type,this.id)
        .subscribe(
          result => {
            let user_auth:any = result;
            this.auth.registerDetail(user_auth._id,this.firstName,this.lastName,this.email,this.type).subscribe(
              (result) => {console.log("Success to create new user detail"); 
                           console.log(result)
                           this.auth.getAllUsers();
                           this.auth.managerment_status = 0;
                            },
              (err) => {console.log("Fail to post");console.log(err);this.error = 'Could not register! Please check all of your input'}
            )},
          err => {this.error = 'Could not register! Please check all of your input';}
        );
      } else if (this.auth.managerment_status==2){
        //Get current id 
        this.auth.editDetail(this.auth.current_edit_user_id,this.firstName,this.lastName,this.email,this.type).subscribe(
          (result) => {console.log("success")
                      this.auth.getAllUsers();
                      this.auth.managerment_status = 0;
                    },
          (err) => {console.log("Fail to update"); console.log(err); this.error = err;}
        );
      }
    
  }

  onCancel(){
    this.auth.managerment_status = 0;
  }
}
