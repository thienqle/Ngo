import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing.module';
import { SectionComponent } from './section/section.component';
import { VisitorComponent } from './visitor/visitor.component';
import { AdminComponent } from './admin/admin.component';
import { RegularComponent } from './regular/regular.component';
import {GaurdServiceService} from './gaurd-service.service';
import {GaurdServiceAdminService} from './gaurd-service-admin.service';
import { DonationComponent } from './donation/donation.component';
import { ErrorComponent } from './error/error.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from './material';
import { UserViewComponent } from './user-view/user-view.component';
import { GiftsComponent } from './gifts/gifts.component';
import { UserManagermentComponent } from './user-managerment/user-managerment.component';
import { UserTableComponent } from './user-table/user-table.component';
import { OrderComponent } from './order/order.component';
import {FirstCharPipe} from './firstchar.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MaincontentComponent,
    RegisterComponent,
    LoginComponent,
    SectionComponent,
    VisitorComponent,
    AdminComponent,
    RegularComponent,
    DonationComponent,
    ErrorComponent,
    PersonalInformationComponent,
    UserViewComponent,
    GiftsComponent,
    UserManagermentComponent,
    UserTableComponent,
    OrderComponent,
    FirstCharPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [AuthService,GaurdServiceAdminService,
              GaurdServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
