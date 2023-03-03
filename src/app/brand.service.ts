import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from './brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseLink="http://localhost:8080/api/brand/v3/"
  constructor(private httpClient:HttpClient) { }

  getAllBrands():Observable<Brand[]>{
    return this.httpClient.get<Brand[]>(`${this.baseLink+"getAllBrands"}`);
  }
  addBrand(brand:Brand):Observable<Object>{
    return this.httpClient.post(`${this.baseLink+"addBrand"}`,brand);
  }
  getBrandById(id:number):Observable<Brand>{
    return this.httpClient.get<Brand>(`${this.baseLink+"getBrandById"}/${id}`);
  }
  updateBrand(id:number,brand:Brand):Observable<Object>{
    return this.httpClient.put(`${this.baseLink+"updateBrand"}/${id}`,brand);
  }
  deleteBrand(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseLink+"deleteBrandById"}/${id}`);
  }
  getBrandByName(brandName:string):Observable<Brand>{
    return this.httpClient.get<Brand>(`${this.baseLink+"getBrandByName/"}${brandName}`);
  }
}
