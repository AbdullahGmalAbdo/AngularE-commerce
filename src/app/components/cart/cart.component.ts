import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor( private _CartService:CartService,
    private _Renderer2:Renderer2  ){}
  cartDetails:any=null
  ngOnInit(): void {
     this._CartService.getUserCart().subscribe({
      next:(response)=>{
      console.log(response);
      this.cartDetails=response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
    }
    deletProduct(id:string,removeItem : HTMLButtonElement):void{
      this._Renderer2.setAttribute(removeItem ,'disabled' , 'true')
     this._CartService.removeCartItem(id).subscribe({
      next:(Response)=>{
       this.cartDetails=Response.data;
       this._Renderer2.removeAttribute(removeItem ,'disabled')
       this._CartService.carNumber.next(Response.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(removeItem ,'disabled')
      }
     })
    }

    
    UpdateCount(count : number , id : string,btnUpdateP : any ,btnUpdateM:any):void{
      if(count >= 1){
        this._Renderer2.setAttribute(btnUpdateP ,'disabled' , 'true')
        this._Renderer2.setAttribute(btnUpdateM ,'disabled' , 'true')
        this._CartService.updateCartItem(count , id).subscribe({
        next:(Response)=>{
          this.cartDetails=Response.data; 
          this._Renderer2.removeAttribute(btnUpdateP ,'disabled')         
          this._Renderer2.removeAttribute(btnUpdateM ,'disabled')         
        },
        error : (err)=>{
          this._Renderer2.removeAttribute(btnUpdateP ,'disabled')
          this._Renderer2.removeAttribute(btnUpdateM,'disabled')
        }
      })
      }
    }

    claerCart():void{
      this._CartService.ClearAll().subscribe({
        next:(res)=>{
          if(res.message=="success"){
            this.cartDetails = null
          }

        }
      })
    }



}
