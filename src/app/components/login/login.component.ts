import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router ){}
  errMsg : string=''
  spinner : boolean = false;
  loginForm:FormGroup = new FormGroup(
    {
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)]),
  })

  handelLoginForm():void{
    this.spinner =true;
  const userData : object = this.loginForm.value;
  if(this.loginForm.valid){
    this._AuthService.login(userData).subscribe({
     next: (Response)=>{
    if(Response.message=='success'){
      localStorage.setItem('etoken',Response.token)
      this._AuthService.userData()
      this._Router.navigate(['/home'])
      this.spinner =false;
    } 
     }, 
     error:(err)=>{
      this.errMsg= err.error.message
      this.spinner =false;
     }
    }) 
  }
  }




}
