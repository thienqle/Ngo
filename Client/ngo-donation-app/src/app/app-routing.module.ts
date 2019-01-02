import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes } from '@angular/router';
import {VisitorComponent} from './visitor/visitor.component';
import {AdminComponent} from './admin/admin.component';
import {RegularComponent} from './regular/regular.component';
import {GaurdServiceService} from './gaurd-service.service';
import {GaurdServiceAdminService} from './gaurd-service-admin.service';
import {RegisterComponent} from './register/register.component';
import {ErrorComponent} from './error/error.component';
import {PersonalInformationComponent} from './personal-information/personal-information.component';

export const routes: Routes = [
  {path: '', component: VisitorComponent},
  {path: 'admin', component: AdminComponent,canActivate:[GaurdServiceAdminService]},
  {path: 'regular', component: RegularComponent,canActivate:[GaurdServiceService]},
  {path: 'register', component: RegisterComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'test',component: RegisterComponent},
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
