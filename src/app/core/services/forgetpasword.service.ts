import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ForgetpaswordService {
  constructor(private _HttpClient:HttpClient){}
  baseUrl : string = `https://ecommerce.routemisr.com/api/v1/auth/`
  forgetpassword(userEmail : object):Observable<any>{
  return this._HttpClient.post(this.baseUrl + `forgotPasswords`,userEmail)
  }

 resetcode(resetcodee : object):Observable<any>{
  return this._HttpClient.post(this.baseUrl+`verifyResetCode` , resetcodee)
 }  
 restPasword(restPasssword  : object):Observable<any>{
  return this._HttpClient.put(this.baseUrl+`resetPassword` , restPasssword)
 }  



}
