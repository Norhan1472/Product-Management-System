import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products!:Product[];

  ngOnInit(): void {
    this.getAllProducts();
  }
  constructor(private productservice:ProductService,private router :Router){

  }
  getAllProducts(){
    this.productservice.getAllProduct().subscribe(data=>{
      console.log("list All Products");
      console.log(data);
      this.products=data;
  },
  (error)=>{
    console.log(error);
  }
  );
  }
  goToAddProduct(){
    this.router.navigate(["addProduct"]);
  }
  deleteProduct(productSerialNumber:string){
    this.productservice.deleteProduct(productSerialNumber).subscribe(
      resp=>{
        console.log(resp);
        this.getAllProducts();
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("Complete");
      }
    )
  }
  updateProduct(productSerialNumber:string){
    this.router.navigate(["updateProduct",productSerialNumber]);
  }
  productDetails(productSerialNumber:string){
    this.router.navigate(["getProductById",productSerialNumber]);
  }
}
