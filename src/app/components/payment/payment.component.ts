import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  implements OnInit{
  cartId:any =''
  spinner : boolean = false;

  constructor(private  _ActivatedRoute : ActivatedRoute,
    private _CartService:CartService){}
  ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(Response)=>{
    this.cartId=Response.get('id')
    console.log(this.cartId);
    
    }
  })
  }

  orderForm : FormGroup =new FormGroup ({
   details : new FormControl(''),
   phone : new FormControl(''),
   city : new FormControl(''),
  })
  HandelForm(): void{   
    this.spinner =true;
   this._CartService.checkOut(this.cartId,this.orderForm.value).subscribe({
    next:(response)=>{
      // console.log(res.status);
      if(response.status == "success"){
        window.open(response.session.url)
        this.spinner =false;
      }
    },
    error:(err)=>{
      this.spinner =false;
    }
   })
   
  }

}
