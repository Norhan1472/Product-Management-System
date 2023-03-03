import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Brand } from '../brand';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit{
  brand:Brand = new Brand();
  id!:number;
  constructor(private brandService:BrandService,
              private routerActive:ActivatedRoute,
              private router:Router){
  }

  ngOnInit(): void {
    this.id=this.routerActive.snapshot.params['id'];
    this.getData();
  }
  getData(){
    console.log(this.id);
    console.log("here");
    this.brandService.getBrandById(this.id).subscribe(
      resp=>{
        this.brand=resp;
        console.log(this.brand);
      },
      error=>{
        console.log(error);
      }
    )}
    updateData(){
      this.brandService.updateBrand(this.id,this.brand).subscribe(
        resp=>{
          console.log(resp);
          this.goToAllBrands();
        },
        error=>{
          console.log(error);
        }
      )
    }
    goToAllBrands(){
      this.router.navigate(["getAllBrands"]);
    }
  onSubmit(){
    this.updateData();
  }
}
