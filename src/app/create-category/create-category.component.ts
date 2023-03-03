import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit{
   category : Category=new Category();
   brandId!:number;
  brands!:Brand[];
  form:FormGroup;
   
  ngOnInit(): void {
    this.getAllBrands();
  }
  constructor(private categoryService:CategoryService,
              private router:Router,
              private fb:FormBuilder,
              private brandService:BrandService){
                this.form=fb.group({
                  selectedBrands : new FormArray([]),
                  categoryName: new FormControl('')

                });
                /*this.form = new FormGroup({
                });*/

              }
  
  addCategory(){
    this.categoryService.addCategory(this.category).subscribe(
      resp=>{
        console.log("moooooon");
        console.log(resp);
        console.log(resp.categoryId);
        console.log(this.category);
        //console.log(this.form.value.selectedBrands);
        
        //console.log(this.form.selectedBrands.value);
        this.loopFunction(resp.categoryId);
        //this.goToAssignBrand(this.category.categoryId,this.brandId);
        this.goToListCategory();
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("Complete");
      }
    )
  }
  loopFunction(categoryId:number){
    for (let idBrand of this.form.value.selectedBrands){
      this.assignBrandToCategory(categoryId,idBrand);
      console.log(idBrand);
    }
  }
  assignBrandToCategory(categoryId:number,brandId:number){
    this.categoryService.assignBrandToCategory(categoryId,brandId).subscribe(
      resp=>{
        console.log(resp);
    },
    error=>{
      console.log(error);
    },
    ()=>{
      console.log("complete");
    }
    )
  }
  onSubmit(){
    this.addCategory();
  }
  goToListCategory(){
      this.router.navigate(["getALLCategory"]);
  }
  onCheckboxChange(event:any){
    const selectedBrands=this.form.controls['selectedBrands'] as FormArray;
    if(event.target.checked){
      console.log("helllllllppp");
      console.log(new FormControl(event.target.value));

      selectedBrands.push(new FormControl(event.target.value));
      console.log(selectedBrands);
    }else{
      const index = selectedBrands.controls
      .findIndex(x => x.value === event.target.value);
      selectedBrands.removeAt(index);
    }

  }
  getAllBrands(){
    this.brandService.getAllBrands().subscribe(resp=>{
      console.log(resp);
      this.brands=resp;
    },
    error=>{
      console.log(error);
    }
    )
  }

}
