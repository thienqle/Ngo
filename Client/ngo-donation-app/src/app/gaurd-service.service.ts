import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {CanActivate,Router,ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GaurdServiceService implements CanActivate{

  currentpath : any;
  constructor(private location: Location,private router:Router,private activateRouter:ActivatedRoute) { 
    /*this.router.events.subscribe((val) => {
      this.currentpath = this.location.path();
      console.log(this.currentpath);
   });*/
  }

  canActivate() {
    if(localStorage.getItem('role') == 'regular' || localStorage.getItem('role')=='admin'){
      return true;
    } 
    this.router.navigate(['error']);
    return false;  
  }

  
  getCurrentPath(){
    this.router.events.subscribe((val) => {
      this.currentpath = this.location.path();
      console.log(this.currentpath);
    });

  }
}
