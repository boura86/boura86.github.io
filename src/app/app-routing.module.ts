import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { HomeComponent } from './home/home.component';
import { CustomerResolver } from './resolver/customer-resolver.service';
const routes: Routes = [
  { path: '', component: HomeComponent, resolve: {customers: CustomerResolver} },
  { path: 'orders', component: OrdersComponent },
  { path: 'order', children: [
      {path:'', component:OrderComponent},
      {path:'edit/:id', component:OrderComponent},
  ] }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
