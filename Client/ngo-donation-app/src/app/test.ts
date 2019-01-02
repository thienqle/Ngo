import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {CanActivate,Router,ActivatedRoute} from '@angular/router';

/*@Injectable({
  providedIn: 'root'
})
export class GaurdServiceService1 implements CanActivate{

  currentpath : any;
  
  constructor(private location: Location,private router:Router,private activateRouter:ActivatedRoute) { 
  }
  
  getCurrentPath(){
    this.router.events.subscribe((val) => {
      this.currentpath = this.location.path();
    });
    return this.currentpath
  }
}*/
