import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService
    ,private _Router:Router
    ){}
    errMsg : string=''
    spinner : boolean = false;
registerForm:FormGroup = new FormGroup(
  {
  name:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl("",[Validators.required,Validators.email]),
  password:new FormControl("",[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)]),
  rePassword:new FormControl(""), 
  phone:new FormControl("",Validators.pattern(/^01[0125][0-9]{8}$/)),
},
{Validators : [this.checkRepassword] } as FormControlOptions

)
checkRepassword(Group:FormGroup):void{
  const password = Group.get("password");
  const rePassword = Group.get("rePassword");
  if( rePassword ?.value == " " ){
    rePassword?.setErrors({required : true })
  }
else if(password ?.value != rePassword ?.value ){
  rePassword?.setErrors({mismatch : true })
  }
}

handelForm():void{
  this.spinner =true;
const userData : object = this.registerForm.value;
if(this.registerForm.valid){
  this._AuthService.register(userData).subscribe({
   next: (Response)=>{
  if(Response.message=='success'){
    this._Router.navigate(['/login'])
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


