import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
constructor(private _HttpClient:HttpClient) { }
 carNumber : BehaviorSubject <number> = new BehaviorSubject(0);
 baseUrl : string =`https://ecommerce.routemisr.com/api/v1/`
 
  addToCart(prodid:string):Observable<any>{
  return this._HttpClient.post(this.baseUrl + `cart`,
  {
      productId: prodid,
  })
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `cart`)
  }
  removeCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/${id}`)
  }
  updateCartItem(newCount : number,id:string ):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `cart/${id}`,
    {
      count : newCount,
    })
  }
 
  ClearAll():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart`)
  }
 
   checkOut(CartId : string ,FormData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `orders/checkout-session/${CartId}?url=https://github.com/AbdullahGmalAbdo/E-commerceProject`,
      {
        shippingAddress: FormData
            
       }
    )
   }

  
}
