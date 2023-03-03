import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css']
})
export class CreateBrandComponent implements OnInit {
  brand:Brand=new Brand();
  ngOnInit(): void {
  }
  
  constructor(private brandService:BrandService,
              private router:Router){}
  onSubmit() {
    this.addBrand();
  }
  
  addBrand(){
    this.brandService.addBrand(this.brand).subscribe(
      resp=>{
        console.log(this.brand);
        console.log(resp);
        this.goToAllBrands();
      },
      error=>{
        console.log(error);
      },
      ()=>{
        console.log("complete");
      }
    )}
  goToAllBrands(){
    this.router.navigate(["getAllBrands"]);
  }


}
