import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './interfaces/customer.interface';
import { Observable } from 'rxjs';
const API_URL = ' http://localhost:3000/customers';


@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL);
  }
  search(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?q=${name}`);
  }
  getById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/${id}`);
  }
  createPokemon(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL, customer);
  }
  deleteCustomer(customer: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${API_URL}/${customer.id}`);
  }
  getCustoomerByAccountNumber(accountNumber: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?account.accountNumber=${accountNumber}`);
  }
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${API_URL}/${customer.id}`, customer);
  }
}
