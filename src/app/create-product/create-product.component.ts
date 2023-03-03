import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Status } from '../status.enum';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  statusData = Status;
  keys=Object.keys;
  brandNames!:Set<Brand>;
  brand!:Brand;
  categorysList!:Category[];
  category!:Category;
  products : Product=new Product();
  productTest:Product=new Product();
  ngOnInit(): void {
    this.getAllCategorys();
      
  }
  constructor(private productService:ProductService,
              private router:Router,
              private brandService:BrandService,
              private categoryService:CategoryService){}
  getAllCategorys(){
    this.categoryService.getAllCategorys().subscribe(
      resp=>{
        console.log(resp);
        this.categorysList=resp;
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("Complete");
      })
  }
  onSelectedStatus(status:any){
    console.log("STATUS");
    console.log(status);
    this.products.status=status;
    console.log(this.products.status);
  }
  onSelectedCategory(category:string){
    console.log(category);
    this.categoryService.getCategoryByName(category).subscribe(
      resp=>{
        console.log(resp);
        this.category=resp;
        this.getAllBrandsOfCategory();
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("Complete");
      }
    )
    
  }
  saveProduct(){
    this.products.category=this.category;
    this.products.brand=this.brand;
    console.log(this.products.category);
    console.log(this.products.brand);
    this.productService.addProduct(this.products).subscribe(data=>{
      console.log("nnnn");
      console.log(this.products.productSerialNumber);
      console.log(data);
      console.log("qqqqqqqqqq");
      console.log(data.productSerialNumber);
      console.log(this.category.categoryId);
      console.log(this.brand.brandId);
      console.log();
      
      this.goToAllProducts();
     // this.assignBrandAndCategoryToProduct(data.productSerialNumber,this.category.categoryId,this.brand.brandId);
      console.log("Here");
      console.log(this.brand.brandId);
    },
    (error)=>{
      console.log(error);
    }
    );
  }

  onSubmit(){
    this.saveProduct();
  }

  onSelectedBrand(value:string):void {
    console.log(value);
    
    this.getBrandByName(value);

	}

  goToAllProducts(){
    this.router.navigate(["getALLProducts"]);
  }

  getAllBrandsOfCategory(){
   this.brandNames=this.category.brands;
   console.log(this.brandNames);
  }

  getBrandByName(brandName:string){
    this.brandService.getBrandByName(brandName).subscribe(
      resp=>{
        console.log(resp);
        this.brand=resp;
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("Complete");
      }
    )
  }
 /* assignBrandAndCategoryToProduct(productSerialNumber:string,categoryId:number,brandId:number){
    console.log("llll");
    console.log(productSerialNumber);
    console.log(categoryId);
    console.log(brandId);
    console.log("lllll");
    console.log((productSerialNumber.replace(/['"]/g, '')));
    productSerialNumber=productSerialNumber.replace(/['"]/g, '');
    categoryId=1;
    brandId=1;
    this.productService.assignCategoryAndBrandToProduct(productSerialNumber,categoryId,brandId).subscribe(
      resp=>{
        console.log(resp);
        this.goToAllProducts();
      },
      error=>{
        console.log(error);
      },
    ()=>{
      console.log("Complete");
    }
    )
  }*/


}
