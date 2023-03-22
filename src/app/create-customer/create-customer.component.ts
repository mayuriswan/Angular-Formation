import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { CustomerServiceService } from '../customer-service.service';
import { Customer } from '../interfaces/customer.interface';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent  {
  customerForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerServiceService,
    private router: Router
  ) {
    const account = this.formBuilder.group({
      type: ['', Validators.required],
      balance: [0],
      accountNumber: ['', [Validators.required , Validators.pattern('^[0-9]{4} [0-9]{4} [0-9]{4}$')],[this.validateAccountNumber.bind(this)]],
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
      .createPokemon(this.customerForm.value)
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

  validateAccountNumber(
    control: AbstractControl
  ): Observable<{ nameExists: boolean } | null> {
    return this.customerService.getCustoomerByAccountNumber(control.value).pipe(
      debounceTime(500), distinctUntilChanged(),
      map((pokemons: Customer[]) => {
        if (pokemons.length > 0) {
          return { nameExists: true };
        }
        return null;
      }),
      )
    ;
  }

}