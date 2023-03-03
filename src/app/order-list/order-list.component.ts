import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Orders } from '../orders';
import { Product } from '../product';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{
  orders!:Orders[];
  products!:Product[];
  ngOnInit(): void {
    this.getAllOrders();
  }
  constructor(private orderService:OrderService,
              private router:Router){

  }
  getAllOrders(){
    this.orderService.getAllOrders().subscribe(
      data=>{
        console.log(data);
        this.orders=data;
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("Complete");
      }
    )
  }
  
  getOrderDetails(orderId:number){
    this.router.navigate(["getOrderById",orderId]);
  }
  addOrder(){
    this.router.navigate(["addOrder"]);
  }
}
