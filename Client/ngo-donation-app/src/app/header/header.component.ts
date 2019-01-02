import { Component, OnInit, OnChanges,Input,Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges {

  constructor(private auth: AuthService,private route: Router) { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

  logout(){
    this.auth.logout();
    this.route.navigate(['']);
  }

  dashboard(){
    this.route.navigate(['admin']);
  }

  getUser(){
    return localStorage.getItem('username');
  }
}
