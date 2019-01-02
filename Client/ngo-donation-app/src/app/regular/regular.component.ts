import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: 'app-regular',
  templateUrl: './regular.component.html',
  styleUrls: ['./regular.component.css'],
  animations: [
    trigger('translateUp',[
      transition('void => *',[
        style({opacity:1,transform:'translateY(20px)'}),
        animate(500,style({opacity:1,transform:'translateY(0px)'}))
      ])
    ])
  ]
})
export class RegularComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.status= 0;
  }

}
