import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Orders } from '../orders';
import { Product } from '../product';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  orders:Orders=new Orders();
  products!:Product[];
  orderId!:number;
  ngOnInit(): void {
    this.orderId=this.routerActive.snapshot.params['id'];
    this.getOrderById(this.orderId);
  }
  constructor(private orderService:OrderService,
              private routerActive:ActivatedRoute){
  }
  getOrderById(orderId:number){
    this.orderService.getOrderById(orderId).subscribe(
      data=>{
        console.log(data);
        this.orders=data;
        this.getAllProductsOfOrder();
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("Complete");
      }
    )
  }
  getAllProductsOfOrder(){
    this.orderService.getAllProductsOfOrder(this.orderId).subscribe(
      data=>{
        console.log(data);
        this.products=data;
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("Complete");
      }
    )
  }
}
