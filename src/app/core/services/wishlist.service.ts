import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistNumber : BehaviorSubject<number> = new BehaviorSubject (0)
  baseUrl : string = `https://ecommerce.routemisr.com/api/v1/`
  constructor(private _HttpClient:HttpClient) { }
  addProductToWishList(id : string):Observable<any> {
    return this._HttpClient.post(this.baseUrl + `wishlist` ,
    {
      productId: id
  }  )
  }

  gitWishList():Observable<any> {
    return this._HttpClient.get(this.baseUrl + `wishlist`)
  }
  removeItemFromWishList(id : string):Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${id}`)
  }
  

}
