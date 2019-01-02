import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { DonationType } from './donation-type';
import { Donation } from './donation';
import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* Variable new for each session */
  status: Number = 0;
  managerment_status = 0;
  current_edit_user_id: any;
  current_edit_element = {
    firstName: null,
    lastName: null,
    type: null,
    emailId: null,
  }
  /* Variable new for each session */

  userType: any;

  Donation = [
    { id: 1, name: 'Mr. Nice', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' },
    { id: 2, name: 'Mr. Nice', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' },
    { id: 3, name: 'Bombasto', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' },
    { id: 4, name: 'Celeritas', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' },
    { id: 5, name: 'Magneta', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' },
    { id: 6, name: 'RubberMan', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' },
    { id: 7, name: 'Dynama', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' },
    { id: 8, name: 'Dr IQ', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' },
    { id: 9, name: 'Magma', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' },
    { id: 10, name: 'Tornado', date: '12/12/2018', amount: 2500, donation_type: 'Help the needy' }
  ];

  CONATIONTYPES: DonationType[] = [
    { id: 1, name: 'Help the different' },
    { id: 2, name: 'NOt only help' },
    { id: 3, name: 'Hello donation' },
    { id: 4, name: 'Help the needy' }
  ]

  Users: any = [
    { firstName: "admin", lastName: "Le", emailId: "t@gmail.com", role: 1 },
    { firstName: "Thien", lastName: "Le", emailId: "t@gmail.com", role: 1 },
    { firstName: "Thien", lastName: "Le", emailId: "t@gmail.com", role: 2 },
    { firstName: "Thien", lastName: "Le", emailId: "t@gmail.com", role: 1 },
  ]

  isLogin(){
    return localStorage.getItem('token')!==null;
  }
  
  Orders: any = [];

  user_auth = {
    id: null,
    username: null,
    token: null,
    type: null,
  }

  user_detail = {
    id: null,
    firstName: null,
    lastName: null,
    user_type_id: null,
    type: null,
    emailId: null,
    phone: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zipCode: null,
    country: null,
    urbanization: null,
  };

  user_form: any;
  gift_form: any;

  constructor(private http: HttpClient, private route: Router) { }

  register(username: String, password: String, type: Number, id: any) {
    let body = {
      //"_id": id,
      "user_name": username,
      "user_auth_psw": password,
      "user_type_id": type
    }
    return this.http.post('http://localhost:4000/api/ngo/user/register', body, {
      observe: 'body'
    });
  }

  registerDetail(id: any, firstName: String, lastName: String, email: String, role: any) {
    let body = {
      "_id": id,
      "firstName": firstName,
      "lastName": lastName,
      "type": role,
      "emailId": email,
      "phone": null,
      "address1": null,
      "address2": null,
      "city": null,
      "state": null,
      "zipCode": null,
      "country": null,
      "urbanization": null
    }
    return this.http.post('http://localhost:4000/api/ngo/userdetail', body, {
      observe: 'body'
    });
  }

  editDetail(id: any, firstName: String, lastName: String, email: String, role: any) {
    let body = {
      "_id": id,
      "firstName": firstName,
      "lastName": lastName,
      "type": role,
      "emailId": email,
    }
    return this.http.put('http://localhost:4000/api/ngo/userdetail/' + body._id, body, {
      observe: 'body'
    });
  }

  editAllUserDetail(userdetail) {
    let body = {
      "_id": userdetail._id,
      "firstName": userdetail.firstname,
      "lastName": userdetail.lastname,
      "type": userdetail.role,
      "emailId": userdetail.email,
      "phone": userdetail.phone,
      "address1": userdetail.address1,
      "address2": userdetail.address2,
      "city": userdetail.city,
      "state": userdetail.state,
      "zipCode": userdetail.zip,
      "country": userdetail.country,
      "urbanization": userdetail.urbanization
    }
    return this.http.put('http://localhost:4000/api/ngo/userdetail/alldetail/' + body._id, body, {
      observe: 'body'
    });
  }

  login(username: String, password: String) {
    this.logout();
    let body = {
      "username": username,
      "password": password
    }
    return this.http.post('http://localhost:4000/api/ngo/user/login', body, {
      observe: 'body'
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('firstname');
    localStorage.removeItem('username');
    this.status = 0;
    this.managerment_status = 0;
    this.current_edit_user_id = null;
    this.current_edit_element.firstName = null;
    this.current_edit_element.lastName = null;
    this.current_edit_element.type = null;
    this.current_edit_element.emailId = null;

    this.user_detail ={
      id: null,
      firstName: null,
      lastName: null,
      user_type_id: null,
      type: null,
      emailId: null,
      phone: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      zipCode: null,
      country: null,
      urbanization: null,
    };

    this.user_auth = {
      id: null,
      username: null,
      token: null,
      type: null,
    };
    //this.user_auth.token = null;
    this.route.navigate(['']);
  }

  getUserType(username) {
    this.http.get('http://localhost:4000/api/ngo/usertype/username/' + username, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    }).subscribe(
      result => { this.userType = result; console.log("This is a result: "); console.log(result) },
      err => { console.log(err); }
    );
  }

  getUserID(username) {
    this.http.get('http://localhost:4000/api/ngo/info/' + username, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    }).subscribe(
      result => {
        let o: any;
        o = result;
        localStorage.setItem('registered_userID', o._id);
      },
      err => { console.log(err); }
    );
  }

  deleteUser(id: any) {
    this.http.delete('http://localhost:4000/api/ngo/userdetail/' + id).subscribe(
      (result) => { console.log("successfully delete user detail"), console.log(result) },
      (err) => { console.log("cannot delete userdetail"); console.log(err) }
    );
    this.http.delete('http://localhost:4000/api/ngo/user/' + id).subscribe(
      (result) => {
        console.log("successfully delete user"),
        console.log(result);
        this.getAllUsers();
      },
      (err) => { console.log("cannot delete user"); console.log(err) }
    );
  }

  /* This is for login */
  getUserDetailandRedirect(id) {
    this.http.get('http://localhost:4000/api/ngo/info/detailid/' + id, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    }).subscribe(
      result => {
        let o: any;
        o = result;
        this.user_detail.id = o._id;
        this.user_detail.firstName = o.firstName;
        this.user_detail.lastName = o.lastName;
        this.user_detail.user_type_id = o.type;
        this.user_detail.type = o.user_name;
        this.user_detail.emailId = o.emailId;
        this.user_detail.phone = o.phone;
        this.user_detail.address1 = o.address1;
        this.user_detail.address2 = o.address2;
        this.user_detail.city = o.city;
        this.user_detail.state = o.state;
        this.user_detail.zipCode = o.zipCode;
        this.user_detail.country = o.country;
        this.user_detail.urbanization = o.urbanization;
        localStorage.setItem('firstname',o.firstName);
        console.log("In redirection condition: " + o.type);
        console.log(o.type);
        if (o.type == '1') {
          localStorage.setItem('role', 'admin');
          this.route.navigate(['admin']);
        } else {
          localStorage.setItem('role', 'regular');
          this.route.navigate(['regular']);
        }
      },
      err => { console.log(err); }
    );
  }

  getUserDetail(username) {
    console.log("Get user detail");
    this.http.get('http://localhost:4000/api/ngo/info/' + username, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    }).subscribe(
      result => {
        let o: any;
        o = result;
        this.user_auth.id = o._id;
        this.user_auth.username = o.user_name;
        this.user_auth.type = o.user_type_id;
        this.user_auth.token = localStorage.getItem('token');
      },
      err => { console.log(err); }
    );
    this.http.get('http://localhost:4000/api/ngo/userdetail/username/' + username, {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    }).subscribe(
      result => {
        let o: any;
        o = result;
        this.user_detail.id = o._id;
        this.user_detail.firstName = o.firstName;
        this.user_detail.lastName = o.lastName;
        this.user_detail.user_type_id = o.type;
        this.user_detail.type = o.user_name;
        this.user_detail.emailId = o.emailId;
        this.user_detail.phone = o.phone;
        this.user_detail.address1 = o.address1;
        this.user_detail.address2 = o.address2;
        this.user_detail.city = o.city;
        this.user_detail.state = o.state;
        this.user_detail.zipCode = o.zipCode;
        this.user_detail.country = o.country;
        this.user_detail.urbanization = o.urbanization;
        console.log(this.user_detail);
      },
      err => { console.log(err); }
    );
  }

  getAllUsers() {
    this.http.get('http://localhost:4000/api/ngo/userdetail').subscribe(
      result => {
        this.Users = result;
      },
      err => { console.log(err); }
    );
  }

  saveAnOrder(order){
    let body = {
      fullname: order.fullname,
      date: order.date,    
      amount: order.amount,
      donationType: order.donationtype,
      monthly: order.monthly    
    }
    return this.http.post('http://localhost:4000/api/ngo/order', body, {
      observe: 'body'
    });
  }

  /*
   fullname: String,
    date: String,    
    amount: Number,
    donationType: String,
    monthly: Boolean    
  */
  getAllOrders(){
    return this.http.get('http://localhost:4000/api/ngo/order');
  }

  getAllDonationType(){
    return this.http.get('http://localhost:4000/api/ngo/donationtype');
  }

  dashboard() {
    return this.http.get('http://localhost:4000/api/ngo/user/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }

}
