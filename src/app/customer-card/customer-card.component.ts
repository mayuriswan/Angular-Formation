import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../interfaces/customer.interface';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent {
  @Input() customer?: Customer;
  @Output() delete = new EventEmitter<Customer>();


  onDelete(customer:Customer|undefined) {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      // Code to delete the customer goes here
      console.log("hello")
      this.delete.emit(this.customer);
    }
  
  }
}
