import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { CustomerServiceService } from '../customer-service.service';
import { Customer } from '../interfaces/customer.interface';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  customer: any;
  errorMessage: string="";
  customerForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const account = this.formBuilder.group({
      type: ['', Validators.required],
      balance: [0],
      accountNumber: "",
    });
  
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      image : [''],
      gender : ['',[Validators.required]],
      address : ['', Validators.minLength(5)],
      account : account,
    });
    
  }
 

  submit() {
    this.isLoading = true;
    this.customerService
      .updateCustomer(this.customer)
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        this.customerForm.reset();
        this.router.navigate(['/customers/customer', customer.id]);
      });
      
  }

  getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

  canSubmit(): boolean {
    return this.customerForm.dirty && this.customerForm.valid;
  }

 




  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService. getById(id||'')
      .subscribe(
        customer => this.customer = customer,
        error => this.errorMessage = error
      );
  }

  updateCustomer(): void {
    this.customerService.updateCustomer(this.customer)
      .subscribe(
        () => console.log('Customer updated'),
        error => this.errorMessage = error
      );
  }
}
