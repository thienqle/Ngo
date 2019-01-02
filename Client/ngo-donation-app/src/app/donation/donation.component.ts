import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['../app.component.css']
})
export class DonationComponent implements OnInit {

  donations:any;
  constructor(private auth:AuthService) { }

  //{_id: "5c171a7ec9a5420894e68ade", fullname: "user user", date: "12/16/2018", amount: 50, monthly: false, …}
  ngOnInit() {
    this.auth.getAllOrders().subscribe(
      (data) => {
        console.log("Success get orders");
        console.log(data)
        let orders = data;
        this.auth.Donation.splice(0,this.auth.Donation.length);
        for (let i=0;i<Object.keys(orders).length;i++){
          let o:any = orders[i];
          this.auth.Donation.push({
            id: o._id, 
            name: o.fullname, 
            date: o.date, 
            amount: o.amount, 
            donation_type: o.donationType
          });
        }
        console.log(this.auth.Donation);
        this.donations = this.auth.Donation;
      },
      (err) => {
        console.log("Cannot get orders");
        console.log(err);
      });
  }


}
