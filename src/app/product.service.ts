import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseLink="http://localhost:8080/api/product/v1/";
  constructor(private httpClient:HttpClient) { }

  getAllProduct():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseLink + "getALLProducts"}`);
  }
  
  getAllBrandNames():Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.baseLink + "getUniqueBrands"}`);
  }

  addProduct(product:Product):Observable<Product>{
    return this.httpClient.post<Product>(`${this.baseLink + "addProduct"}`,product);
  }

  assignCategoryAndBrandToProduct(productSerialNumber:string,categoryId:number,brandId:number):Observable<Object>{
    console.log("ddd");
    console.log(productSerialNumber);
    console.log("ddd");
    return this.httpClient.put(`${this.baseLink+"assignCategoryAndBrandToProduct/"}
                                ${productSerialNumber}/category/${categoryId}/brand/${brandId}`,null);
  }

  deleteProduct(productSerialNumber:string):Observable<Object>{
    return this.httpClient.delete(`${this.baseLink+"deleteProduct/"}${productSerialNumber}`);
  }
  updateProduct(productSerialNumber:string,product:Product):Observable<Object>{
    return this.httpClient.put(`${this.baseLink+"updateProduct/"}${productSerialNumber}`,product);
  }
  getProductById(productSerialNumber:string):Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseLink+"getProductById/"}${productSerialNumber}`);
  }
  getAllProductThatActive():Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseLink+"getAllProductThatActive"}`);
  }
}
