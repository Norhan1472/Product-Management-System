import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productSerialNumber!:string;
  product:Product=new Product();

  ngOnInit(): void {
    this.productSerialNumber=this.routerActive.snapshot.params['id'];
    console.log(this.getProductById);
    this.getProductById();
  }
  constructor(private productService:ProductService,
              private routerActive:ActivatedRoute){}
  getProductById(){
    this.productService.getProductById(this.productSerialNumber).subscribe(data=>{
        console.log(data);
        this.product=data;
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
