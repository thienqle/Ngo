import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {

  donationtypes:any;
  forms = []
  
  date: any; 
  fullname: any;

  constructor(private auth: AuthService,public router: Router) { 
    this.donationtypes = this.auth.CONATIONTYPES;
    for (let donation of this.donationtypes){
      this.forms.push({
        id:donation.id,
        type: donation.name,
        amount:0,
        monthly: false
      });
    }
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    this.date = mm + '/' + dd + '/' + yyyy;
    this.fullname = this.auth.user_detail.firstName + " " + this.auth.user_detail.lastName;
  }

  ngOnInit() {
  }

  onDonation(){
    this.auth.Orders.splice(0,this.auth.Orders.length);
    for(let form of this.forms){
      let order = {
        fullname:this.fullname,
        date: this.date,
        amount: form.amount,
        donationtype: form.type,
        monthly: form.monthly
      }
      this.auth.Orders.push(order);
    }
    this.auth.status = 2;
  }

  onCancel(){
    this.router.navigate[''];
  }

}
