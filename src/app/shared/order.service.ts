import { Injectable } from '@angular/core';
import { OrderItem } from './order-item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orderItems: Array<OrderItem>;
  constructor(private http: HttpClient) { }

  saveOrUpdateOrder(data) {
    var body = {
      ...data,
      OrderItem: this.orderItems
    };
    console.log(body);
   return this.http.post(environment.apiUrl + "/Orders", body);
  }
}
