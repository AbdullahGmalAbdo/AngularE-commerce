import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 baseUrl:string = `https://ecommerce.routemisr.com/api/v1/`;
  constructor(private _HttpClient:HttpClient) { } 
   
 getProducts(pagenum : number = 1):Observable<any>{
 return this._HttpClient.get(this.baseUrl +`products?page=${pagenum}`)
 } 
 getCategories():Observable<any>{ 
 return this._HttpClient.get(this.baseUrl +'categories')
 }

 getCategoriesDetails( id :string | null):Observable<any>{ 
 return this._HttpClient.get(this.baseUrl +`categories/${id}`)
 }
 getProductDetails(id:string | null):Observable<any>{
 return this._HttpClient.get(this.baseUrl +`products/${id}`)
 }
 
 prand():Observable<any>{
 return this._HttpClient.get(this.baseUrl +`brands`)
 }
 
 







} 
