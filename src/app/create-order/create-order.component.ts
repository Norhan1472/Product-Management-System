import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Brand } from '../brand';
import { Category } from '../category';
import { OrderService } from '../order.service';
import { Orders } from '../orders';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit{
  orders:Orders=new Orders();
  product:Product=new Product();
  form:FormGroup;
  productForm!:FormGroup;
  products!:Product[];
  category:Category = new Category();
  brand : Brand= new Brand();
  formFields: Product = new Product();
  prr:Product = new Product();

  formFieldsP: Product[]=[this.prr] ;//= new Product();
   i=1;
  
  ngOnInit(): void {
    this.product.category=new Category();
    this.product.brand=new Brand();
    this.getAllProductThatActive();
    //this.productForm=new FormGroup({
    /*  p: new FormArray([
        new FormGroup({
          productOfForm:new FormControl('')
        })
      ])*/
   // });

    console.log(this.form);
    /*this.productForm = new FormGroup({
      quantities: new FormArray([
        new FormGroup({
          qty: new FormControl(''),
          price: new FormControl('')
        })
      ])
    });*/

    //console.log(this.form);
    this.productForm = new FormGroup({
      categoryName: new FormControl(''),
      brandName: new FormControl(''),
    });
   // this.productForm.controls['categoryName'].setValue(this.product.category.categoryName);
  }
  
  /*get p(): FormArray {
    return this.form.get('p') as FormArray;
  }

  addp() {
    this.p.push(
      new FormGroup({

      })
    );
  }*/
  constructor(private orderService:OrderService,
              private fb:FormBuilder,
              private productService:ProductService){

        this.form=fb.group({

        });
       // this.productForm=fb.group({})
  }
  /*quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  }  */
     
     
     
  removeQuantity(i:number) {  
    this.formFieldsP.splice(i, 1);  
  }  
     
  onSubmit() {
    console.log(this.productForm.value);
  }
  getAllProductThatActive(){
    this.productService.getAllProductThatActive().subscribe(
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
  onSelectedProduct(product:any){
    console.log("productsss");
    console.log(product.target.value);
     
    //if (this.i){
    this.getProductById(product.target.value);
   //  this.i=0;
  // }

    
  }
  getProductById(productSerialNumber:string){
    this.productService.getProductById(productSerialNumber).subscribe(
      data=>{
        console.log(data);
        this.product=data;
        this.productForm.controls['categoryName'].setValue(this.product.category.categoryName);
        this.productForm.controls['brandName'].setValue(this.product.brand.brandName);
              },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("Complete");
      }
    )
  }
  generateFields(){
    this.formFields = new Product();
  }
  addFormField() {
    console.log("hhhhhhhhhh");
    this.prr=this.product;
    console.log(this.product.category.categoryName);
    this.formFieldsP.push(this.product);
    console.log(this.formFieldsP);
     this.formFieldsP.push(new Product());
   
  }

}


