import { Component ,ViewChild,ElementRef, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Brand } from '../brand';
import { Category } from '../category';
import { Product } from '../product';
import { Status } from '../status.enum';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  

  form!: FormGroup;
  prr:Product = new Product();
  products!:Product[];
  formFieldsP: Product[]=[this.prr];
  category:Category=new Category();
  brand:Brand=new Brand();
  ngOnInit() {
   this.form = new FormGroup({
      p: new FormArray([
        new FormGroup({
         /* name: new FormControl(''),
          address: new FormControl(''),
          number: new FormControl(''),
          email: new FormControl('')*/
          
        })
      ])
    });

    console.log(this.form);
  }

  get p(): FormArray {
    return this.form.get('p') as FormArray;
  }

  addp() {
    this.p.push(
      new FormGroup({
        name: new FormControl(''),
        address: new FormControl(''),
        number: new FormControl(''),
        email: new FormControl('')
      })
    );
    console.log(this.p);
  }

  name = 'Angular';  
    
  productForm: FormGroup; 
  product!:Product; 
     
  constructor(private fb:FormBuilder) {  
     
    this.productForm = this.fb.group({  
      name: '',  
      quantities: this.fb.array([]) ,  
    });  
  }  
    
  quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  } 
     
     
  addQuantity() {  
    this.formFieldsP.push(this.prr);
  }  
     
  removeQuantity(i:number) {  
    this.formFieldsP.splice(i, 1);
  }  
     
  onSubmit() {  
    console.log(this.productForm.value);  
  }  
   formArray = new FormArray(
    this.formFieldsP.map(p => new FormGroup({

    }))
  );
  
   formGroup = new FormGroup({
    products: this.formArray
  });
  
}
