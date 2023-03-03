import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { HttpClientModule} from "@angular/common/http";
import { CreateCategoryComponent } from './create-category/create-category.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { CreateBrandComponent } from './create-brand/create-brand.component';
import { UpdateBrandComponent } from './update-brand/update-brand.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { GenerateFieldComponent } from './generate-field/generate-field.component';
import { ServerListComponent } from './server-list/server-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryListComponent,
    CreateCategoryComponent,
    TestComponent,
    CreateProductComponent,
    BrandListComponent,
    CreateBrandComponent,
    UpdateBrandComponent,
    CategoryDetailsComponent,
    UpdateCategoryComponent,
    UpdateProductComponent,
    ProductDetailsComponent,
    OrderListComponent,
    OrderDetailsComponent,
    CreateOrderComponent,
    GenerateFieldComponent,
    ServerListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatSelectModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
