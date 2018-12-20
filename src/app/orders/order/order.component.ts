import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order';
import { NgForm } from '@angular/forms';
import { OrderItem } from 'src/app/shared/order-item';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { OrderItemComponent } from '../order-item/order-item.component';
import { OrderService } from 'src/app/shared/order.service';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer';
import { CustomerResolver } from 'src/app/resolver/customer-resolver.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Order;
  customers: any;
  isValid: boolean = true;
  constructor(private modalService: NgbModal, 
              private  orderService: OrderService,
              private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.resetForm();
    console.log(this.route.snapshot);
     this.route.data.subscribe(resp => {
       console.log(resp);
       this.customers =  resp.customers;
     })
    console.log(this.customers);
  }

  resetForm(formOrder?: NgForm) {
    this.order = {
      OrderID: null,
      OrderNo: Math.floor(10000 + Math.random()*90000),
      CustomerID:0,
      PMethod: '',
      GTotal:0
    }
    this.orderService.orderItems = [];
  }
  addOrEditOrderItem(orderItemIndex, orderID) {
    console.log('ici')
    const modalRef = this.modalService.open(OrderItemComponent, { size: 'lg' });
    modalRef.componentInstance.data = {orderItemIndex, orderID};
    modalRef.result.then(() => {
      console.log('iciicici');
      this.updateGrandTotal();
    });
  }
  onDeleteOrderItem(orderItemID: number, index: number, orderID: number) {
    this.orderService.orderItems.splice(index,1);
    this.updateGrandTotal();
  }
  updateGrandTotal() {
    this.order.GTotal = this.orderService.orderItems.reduce((prev, curr) =>{
      return prev + curr.Total
    }, 0);
    this.order.GTotal = parseFloat(this.order.GTotal.toFixed(2));
  }
  validationForm() {
    this.isValid = true;
    if (this.order.CustomerID == 0)
        this.isValid = false;
      else if (this.orderService.orderItems.length == 0)
        this.isValid = false;
      
    return this.isValid;
  }
  onSubmit() {
    if (this.validationForm()) {
        this.orderService.saveOrUpdateOrder(this.order)
        .subscribe(resp => {
          this.resetForm();
        })
    }
  }
}
