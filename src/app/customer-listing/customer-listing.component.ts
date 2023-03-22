import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CustomerServiceService } from '../customer-service.service';
import { Customer } from '../interfaces/customer.interface';
import { PaginationInstance } from 'ngx-pagination';


@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.css']
})
export class CustomerListingComponent implements OnInit {
  isDeleteLoading: any[] = [];
    p: number = 1;
        customers: Customer[] = []
        searchQuery = '';
        searchQuerySubject = new Subject<string>();
        constructor(private customerService: CustomerServiceService) {
           
        }
     ngOnInit(): void {
      this.searchQuerySubject
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((query: string) => {
      this.search(query);
    });
    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      this.customers = data;
  });
}
search(query: string) {
  this.customerService.search(query).subscribe((customers) => {
    this.customers = customers;
  });
}

onQuery(event: any) {
  this.searchQuerySubject.next(event.target.value);
}


delete(pokemon: Customer) {
  this.setIsLoading(pokemon, true);
  this.customerService.deleteCustomer(pokemon).subscribe(() => {
    this.customers = this.customers.filter((p) => p.id !== pokemon.id);
    this.setIsLoading(pokemon, false);
  });
}
private setIsLoading(pokemon: Customer, isLoading: boolean) {
  this.isDeleteLoading = this.isDeleteLoading.map((p) => {
    if (p.id === pokemon.id) {
      return { ...p, isLoading };
    }
    return p;
  });
}
getIsDeleteLoading(pokemon: Customer) {
  return this.isDeleteLoading.find((p) => p.id === pokemon.id)?.isLoading;
}
}
