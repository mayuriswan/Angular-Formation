import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-route.module';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsPageComponent } from './details-page/details-page.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    SearchBarComponent,
    DashboardComponent,
    NotFoundComponent,
    CustomerCardComponent,
    CustomerListingComponent,
    DetailsPageComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
    ReactiveFormsModule,
    NgxPaginationModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
