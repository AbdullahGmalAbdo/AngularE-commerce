import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userDataInfo : any =''

  constructor(private _httpClient: HttpClient) { }

  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/auth/";

  register(userdata: object): Observable<any> {
    return this._httpClient.post(this.baseUrl + 'signup', userdata);
  }
  login(userdata: object): Observable<any> {
    return this._httpClient.post(this.baseUrl + 'signin', userdata);
  }

  userData():void {
    const encode = localStorage.getItem('etoken');
    if (encode !== null) {
        const decode = jwtDecode(encode)
        this.userDataInfo=decode;
    }
}
}
