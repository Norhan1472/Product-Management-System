import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from './orders';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseLink = "http://localhost:8080/api/order/v1/"
  constructor(private httpClient:HttpClient) { }
  getAllOrders():Observable<Orders[]>{
    return this.httpClient.get<Orders[]>(`${this.baseLink+"getAllOrders"}`);
  }
  getAllProductsOfOrder(orderId:number):Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseLink+"getAllProductsOfOrder/"}${orderId}`);
  }
  getOrderById(orderId:number):Observable<Orders>{
    return this.httpClient.get<Orders>(`${this.baseLink+"getOrderById/"}${orderId}`);
  }
  
}
