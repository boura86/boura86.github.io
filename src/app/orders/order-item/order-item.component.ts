import { Component, OnInit, Input } from '@angular/core';
import { OrderItem } from 'src/app/shared/order-item';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  orderItem: OrderItem;
  itemList: Array<Item>;
  @Input() data: any;
  isValid = true;
  constructor(public activeModal: NgbActiveModal, private itemService: ItemService,
   private orderService: OrderService) { }

  ngOnInit() {
    this.itemService.getItemList()
      .subscribe(resp => {
        this.itemList = resp;
      })
    console.log(this.data);
    if (this.data.orderItemIndex == null) {
      this.orderItem = {
        OrderItemID: null,
        OrderID:this.data.orderID,
        Price: 0,
        ItemName: '',
        ItemID: 0,
        Quantity: 0,
        Total: 0
      };
    }else {
      console.log(this.data.orderItemIndex);
      this.orderItem = Object.assign(this.orderService.orderItems[this.data.orderItemIndex])
    }
    
  }
  updatePrice(ctrl) {
    console.log(ctrl);
    if (ctrl.selectedIndex == 0) {
      this.orderItem.Price = 0;
      this.orderItem.ItemName = '';
    }else {
     this.orderItem.Price = this.itemList[ctrl.selectedIndex - 1].Price;
     this.orderItem.ItemName = this.itemList[ctrl.selectedIndex - 1].Name;
    }
    this.updateTotal();
  }
  updateTotal() {
    this.orderItem.Total = parseFloat((this.orderItem.Quantity * this.orderItem.Price).toFixed(2));
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    if (this.valiationForm(form.value)) {
      if (this.data.orderItemIndex == null) {
        this.orderService.orderItems.push(form.value);
      }else
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      
      this.activeModal.close();
    }
    
  }
  valiationForm(form: OrderItem) {
    this.isValid = true;
    if (form.ItemID == 0) {
      this.isValid = false;
    } else if (form.Quantity == 0) {
      this.isValid = false;
    }
    return this.isValid;
  }
}
