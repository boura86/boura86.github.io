import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../shared/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<Observable<Customer[]>> {

  constructor(private customerService: CustomerService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : Observable<Customer[]> {
    console.log('laaaa');
    return this.customerService.getCustomerList();
  }
}
