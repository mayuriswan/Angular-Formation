import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateCustomerComponent } from "./create-customer/create-customer.component";
import { CustomerListingComponent } from "./customer-listing/customer-listing.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DetailsPageComponent } from "./details-page/details-page.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { UpdateCustomerComponent } from "./update-customer/update-customer.component";

const routes :Routes = [
    { path: '', component: DashboardComponent , pathMatch: 'full'},
    { path: 'customers/customer/:id', component: DetailsPageComponent},
    { path: 'customers/create',redirectTo: 'create'},
    { path:"customers/update/:id", component: UpdateCustomerComponent},
    { path: 'create', component: CreateCustomerComponent},
    { path: 'customers', component: CustomerListingComponent},
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
    

] 

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
