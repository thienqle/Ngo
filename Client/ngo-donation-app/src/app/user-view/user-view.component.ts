import { Component, OnInit } from '@angular/core';
import {DonationType} from '../donation-type';
import {Donation} from '../donation';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  donationtypes:any;
  constructor(private auth: AuthService,private route:Router) { 
    
  }

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
        this.donationtypes = this.auth.CONATIONTYPES;
      },
      (err) => {
        console.log("Cannot get donation type");
        console.log(err)
      }
    )
  }

  onClick(){
    this.route.navigate(['regular']);
  }
}
