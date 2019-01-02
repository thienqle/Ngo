import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['../app.component.css'],
  animations: [
    trigger('translateUp',[
      transition('void => *',[
        style({opacity:1,transform:'translateY(20px)'}),
        animate(500,style({opacity:1,transform:'translateY(0px)'}))
      ])
    ])
  ]
})
export class VisitorComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onClick(status:Number){
    this.auth.status = status;
  }

}
