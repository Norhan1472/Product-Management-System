import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{

  Categorys!:Category[];  
  showText: boolean = false;


  ngOnInit(): void {
      this.getAllCategorys();
  }
  constructor(private categoryService:CategoryService,private router:Router){

  }
  getAllCategorys(){
    this.categoryService.getAllCategorys().subscribe(data=>{
      console.log("hello");
      console.log(data);
      this.Categorys=data;
      console.log("here");
      console.log(this.Categorys.at(0)?.brands)
    },
    (error)=>{
      console.log(error);
    }
    );
  }
  addCategory(){
    this.router.navigate(["addCategory"]);
  }
  
  getDetails(id:number){
    this.router.navigate(["getCategoryById",id]);
  }
  update(id:number){
    this.router.navigate(["updateCategory",id]);
  }
  delete(id:number){
    this.deleteById(id);
  }
  deleteById(id:number){
    this.categoryService.deleteCategory(id).subscribe(resp=>{
      console.log(resp);
      //reload page from databadse
      this.reloadPage();
    },
    error=>{
      console.log(error);
    }
    )
  }
  reloadPage(){
    this.categoryService.getAllCategorys().subscribe(
      resp=>{
        this.Categorys=resp;
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("complete");
      }
      )
  }
}
