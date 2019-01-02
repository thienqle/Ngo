import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'; //Using ../ to access parent level

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['../app.component.css']
})
export class MaincontentComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
