import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title: string = 'Menu'; 
  listItems:string[] = ['User Management','Event Management','User View'];
  
  constructor(private auth:AuthService) {}

  ngOnInit() {
    
  }

  onClick(status:Number){
    this.auth.status = status;
  }

}
