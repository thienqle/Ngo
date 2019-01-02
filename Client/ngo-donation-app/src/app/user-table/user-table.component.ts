import { Component, OnInit,OnChanges } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit,OnChanges {

  firstname : any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.managerment_status = 0;
    this.auth.getAllUsers();
    this.auth.current_edit_user_id =null;
    this.firstname = localStorage.getItem('firstname');
  }

  ngOnChanges(){
    this.ngOnInit();
  }

  changeStatus(n:number,id:any,firstName,lastName,emailID,type){
    this.auth.managerment_status = n;
    this.auth.getAllUsers();
    if(n==2){
      this.auth.current_edit_user_id = id;
      this.auth.current_edit_element.firstName = firstName;
      this.auth.current_edit_element.lastName = lastName;
      this.auth.current_edit_element.emailId = emailID;
      this.auth.current_edit_element.type = type;
    }
  }
  
  deleteUser(id:any){
    this.auth.deleteUser(id);
    this.auth.getAllUsers();
  }
}
