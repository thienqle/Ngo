import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient,HttpParams } from '@angular/common/Http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: String;

  //{ id: 1, name: 'Help the different' },
  //    _id: Number, donation_type_nm: String
  ngOnInit() {
    //Get donation type from here
    this.auth.getAllDonationType().subscribe(
      (data) => {
        console.log("Get donation types successful");
        let orders = data;
        this.auth.CONATIONTYPES.splice(0,this.auth.CONATIONTYPES.length);
        for (let i=0;i<Object.keys(orders).length;i++){
          let o:any = orders[i];
          this.auth.CONATIONTYPES.push({
            id: o._id, 
            name: o.donation_type_nm, 
          });
        }
      },
      (err) => {
        console.log("Cannot get donation type");
        console.log(err)
      }
    )
  }

  constructor(private http:HttpClient, private auth: AuthService,public router: Router) { }

  /*public submit_old() {
    this.auth.login(this.username,this.password)
      .pipe(first())
      .subscribe(
        result => {console.log("Good authenticate"),localStorage.setItem('token', result.toString()); 
                   this.getUsername();
                   localStorage.setItem('username',this.username);
                   this.http.get('http://localhost:4000/api/ngo/usertype/username/' + this.username, {
                      observe: 'body',
                      params: new HttpParams().append('token', localStorage.getItem('token'))
                    }).subscribe(
                      result => { 
                        localStorage.setItem('username',this.username);
                        let o:any;
                        o = result;
                        console.log(o);
                        console.log(o._id);
                        //get data first before redirect to another page
                        this.auth.getUserDetailandRedirect(o._id);
                        if (o._id == '1') {
                          localStorage.setItem('role','admin');
                          this.router.navigate(['admin']);
                        } else {
                            localStorage.setItem('role','regular');
                            this.router.navigate(['regular']);
                        }                        
                      } ,
                      err => {console.log(err);}
                    );
                  },
        err => {console.log("Bad authen"),this.error = 'Could not authenticate';console.log(err);this.auth.logout();}
      );  
  }
  */

  public submit() {
    this.auth.login(this.username,this.password)
      .pipe(first())
      .subscribe(
        result => {console.log("Good authenticate"),localStorage.setItem('token', result.toString()); 
                   this.getUsername();
                   localStorage.setItem('username',this.username);
                   this.http.get('http://localhost:4000/api/ngo/info/' + this.username, {
                    observe: 'body',
                    params: new HttpParams().append('token', localStorage.getItem('token'))
                    }).subscribe(
                      result => {
                        let o: any;
                        o = result; 
                        console.log("Debug o._id: " + o._id);
                        this.auth.user_auth.id = o._id;
                        this.auth.user_auth.username = o.user_name;
                        this.auth.user_auth.type = o.user_type_id;
                        localStorage.setItem('username',o.user_name);
                        console.log("Get user id:" + o._id + " - " + o.user_type_id);
                        this.auth.getUserDetailandRedirect(o._id);
                        } ,
                      err => {console.log(err);}
                    );

                  },
        err => {console.log("Bad authen"),this.error = 'Incorrect username or password';console.log(err);this.auth.logout();}
      );
      
  }

  isLogin(){
    return localStorage.getItem('token')!==null;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUsername(){
    this.auth.dashboard()
      .subscribe(
        result => {console.log(result); this.error=null},
        err => this.error = 'You are not authorized!'
      );
  }

}
