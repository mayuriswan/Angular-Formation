import { Component } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { Customer } from '../interfaces/customer.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  customers: Customer[] = [];
  totalBalance=0;
  constructor( private customerService : CustomerServiceService) { }
  ngOnInit(): void {
    

  this.customerService.getCustomers().subscribe((data: Customer[]) => {
    this.customers = data;
    this.totalBalance = this.customers.reduce((acc, customer) => acc + customer.account.balance, 0);
});
console.log(this.customers)
  


}}
