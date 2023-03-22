import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CustomerServiceService } from '../customer-service.service';
import { Customer } from '../interfaces/customer.interface';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent {
  pokemonId?: string
  customer?: Customer;

  constructor(private route: ActivatedRoute , private customerService:CustomerServiceService ,private router :Router) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params) => this.customerService.getById(params["id"]))
    ).subscribe({
      next: (customer) => {this.customer = customer},
      error: (err) => {this.router.navigate(["/not-found"])}
    }
    );
    }
}
