import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('translateUp',[
      transition('void => *',[
        style({opacity:1,transform:'translateY(20px)'}),
        animate(500,style({opacity:1,transform:'translateY(0px)'}))
      ])
    ]),
    trigger('translateRight',[
      transition('void => *',[
        style({opacity:1,transform:'translateX(-20px)'}),
        animate(500,style({opacity:1,transform:'translateX(0px)'}))
      ])
    ]),
  ]
})
export class AdminComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.status= 0;
  }

}
