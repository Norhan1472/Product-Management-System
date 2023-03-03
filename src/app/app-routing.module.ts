import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './brand-list/brand-list.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CreateBrandComponent } from './create-brand/create-brand.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ServerListComponent } from './server-list/server-list.component';
import { TestComponent } from './test/test.component';
import { UpdateBrandComponent } from './update-brand/update-brand.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [//redirectTo: "getALLProducts"
  {path:'getALLProducts', component:ProductListComponent},
  {path:'getALLCategory' ,component:CategoryListComponent},
  {path:'addCategory',component:CreateCategoryComponent},
  {path:'addProduct',component:CreateProductComponent},
  {path:'getAllBrands',component:BrandListComponent},
  {path:'addBrand',component:CreateBrandComponent},
  {path:'updateBrand/:id',component:UpdateBrandComponent},
  {path:'getCategoryById/:id',component:CategoryDetailsComponent},
  {path:'updateCategory/:id',component:UpdateCategoryComponent},
  {path:'updateProduct/:id',component:UpdateProductComponent},
  {path:'getProductById/:id',component:ProductDetailsComponent},
  {path:'getAllOrders',component:OrderListComponent},
  {path:'getOrderById/:id',component:OrderDetailsComponent},
  {path:'addOrder',component:CreateOrderComponent},
  {path:'getAllServers',component:ServerListComponent},
  {path:"" ,component:TestComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


