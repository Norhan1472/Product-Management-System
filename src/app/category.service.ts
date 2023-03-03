import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseLink="http://localhost:8080/api/category/v2/"
  constructor(private httpClient:HttpClient) { }

  getAllCategorys():Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.baseLink+"getALLCategory"}`);
  }
  addCategory(category :Category):Observable<Category>{
    return this.httpClient.post<Category>(`${this.baseLink+"addCategory"}`,category);
  }
  getCategoryById(id:number):Observable<Category>{
    return this.httpClient.get<Category>(`${this.baseLink+"getCategoryById"}/${id}`);
  }
  assignBrandToCategory(categoryId:number,brandId:number):Observable<Object>{//,brandId:number//categoryId:number
    return this.httpClient.
    put(`${this.baseLink+"assignBrandToCategory"}/${categoryId}/brand/${brandId}`,null);
  }
  deleteCategory(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseLink+"deleteCategory/"}${id}`);
  }
  updateCategory(id:number,category:Category):Observable<Object>{
    return this.httpClient.put(`${this.baseLink+"updateCategory/"}${id}`,category)
  }
  getCategoryByName(categoryName:string):Observable<Category>{
    return this.httpClient.get<Category>(`${this.baseLink+"getCategoryByName/"}${categoryName}`);
  }
}
