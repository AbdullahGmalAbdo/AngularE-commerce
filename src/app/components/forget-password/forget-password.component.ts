import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetpaswordService } from 'src/app/core/services/forgetpasword.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
   step1 : boolean = true
   step2 : boolean = false
   step3 : boolean = false
   email : string = ''
   responseMsg : string =''
   iinfo : string = "Enter Your Email and we will sent you Reset code"
   constructor(private _ForgetpaswordService:ForgetpaswordService
   ,private _Router:Router){}
 
   forgetForm :FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email])
   })
   resetCodeForm :FormGroup = new FormGroup({
    resetCode : new FormControl('')
   })
   resetPasswordForm :FormGroup = new FormGroup({
    // email : this.forgetForm.get('email')?.value,
    newPassword : new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)])
   })

   forget():void{
    let userEmail = this.forgetForm.value
    this.email=userEmail.email
     this._ForgetpaswordService.forgetpassword(userEmail).subscribe({
      next:(res)=>{
        // console.log(res);
        this.step1 =false
        this.step2 =true
        this.iinfo = ''
        this.responseMsg=res.message;
      },
      error : (err)=>{
      this.responseMsg=err.error.message;
      }
     })


   }




   resetCode():void{
      let resetcod =this.resetCodeForm.value
   this._ForgetpaswordService.resetcode(resetcod).subscribe({
    next : (respone)=>{
      this.step2 =false
      this.step3 =true
      this.responseMsg=''
    },
    error : (err)=>{
      this.responseMsg=err.error.message;
    }
   })


  }
   resetPassword():void{
    let resetPassword =this.resetPasswordForm.value
    resetPassword.email =this.email
    this._ForgetpaswordService.restPasword(resetPassword).subscribe({
     next : (respone)=>{
      if(respone.token){
        localStorage.setItem('etoken',respone.token)
        this._Router.navigate(['/home'])
      }
      
     },
     error : (err)=>{
       this.responseMsg=err.error.message;
     }
    })
 
   }



}

