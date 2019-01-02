import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-user-managerment',
  templateUrl: './user-managerment.component.html',
  styleUrls: ['./user-managerment.component.css'],
  animations: [
    trigger('translateUp',[
      transition('void => *',[
        style({opacity:1,transform:'translateY(5px)'}),
        animate(500,style({opacity:1,transform:'translateY(0px)'}))
      ])
    ])
  ]
})
export class UserManagermentComponent implements OnInit {

  constructor(private auth: AuthService) { 
    this.auth.managerment_status = 0;
  }

  ngOnInit() {
    this.auth.getAllUsers();
  }

}
