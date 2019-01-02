import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  total:any;
  constructor(private auth:AuthService,private route:Router) { }

  ngOnInit() {
    this.calculateTotal();
  }

  calculateTotal(){
    this.total = 0;
    for(let order of this.auth.Orders){
      this.total += order.amount; 
    }
  }

  removeItem(i){
    this.auth.Orders.splice(i,1);
    this.calculateTotal();
  }

  emptyCard(){
    this.auth.Orders.splice(0,this.auth.Orders.length);
    this.auth.status = 0;
    this.calculateTotal();
    this.route.navigate['regular'];
  }

  checkOut(){
    for(let order of this.auth.Orders){
      if(order.amount!=0){
        console.log("This is order:")
        console.log(order)
        this.auth.saveAnOrder(order).subscribe(
          (result) => {console.log("Checkout successfull for " + order.fullname); console.log(result); this.emptyCard()},
          (err) => {console.log("Cannot save order"); console.log(err)}
        );
      }
    }
  }

}
