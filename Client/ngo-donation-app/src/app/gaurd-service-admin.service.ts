import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {CanActivate,Router,ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GaurdServiceAdminService implements CanActivate{

  constructor(private router:Router,private activateRouter:ActivatedRoute) { }

  canActivate() {
    if(localStorage.getItem('role') == 'admin'){
      return true;
    } 
    this.router.navigate(['error']);
    return false;  
  }
}
