import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit{
  brands!:Brand[];
  id!:number;
constructor(private brandService:BrandService,
            private router:Router,
            private routerActive:ActivatedRoute){}
ngOnInit(): void {
  this.getAllBrands();
}
getAllBrands(){
  return this.brandService.getAllBrands().subscribe(resp=>{
    console.log(resp);
    this.brands=resp;
  },error=>{
    console.log(error);
  },
  ()=>{
    console.log("Complete");
  }
  )}
  
  addBrand(){
    this.router.navigate(["addBrand"]);
  }

  updateBrand(id:number){
    this.router.navigate(["updateBrand/",id]);
  }
  deleteBrand(id:number){
    console.log(id);
    this.brandService.deleteBrand(id).subscribe(
      resp=>{
        console.log(resp);
        this.goToList();
      },
      error=>{
        console.log(error);
      }
    )}
    goToList(){
      this.brandService.getAllBrands().subscribe(
        resp=>{
          this.brands=resp;
        },
        error=>{
          console.log(error);
        },
        ()=>{
          console.log("completed");
        }
      )
    }
}
