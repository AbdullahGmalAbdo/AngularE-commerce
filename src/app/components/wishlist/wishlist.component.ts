import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { TextcutPipe } from 'src/app/core/pipe/textcut.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
Renderer2
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,RouterLink,TextcutPipe
  ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishListData : string[] =[]
  Prouducts :Product[]=[]
  constructor( 
    private _WishlistService:WishlistService ,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private toastr: ToastrService,
    ){}
  ngOnInit(): void {
    
    this._WishlistService.gitWishList().subscribe({
    next:(res)=>{
     console.log(res);
     this.Prouducts = res.data
     const newData = res.data.map((e : any)=> e._id )
       this.wishListData =newData;

    },
    error : (err)=>{
      console.log(err);
      
    }
    })


  

  }

  addToCartt(id:any , element : HTMLButtonElement):void {   
    this._Renderer2.setAttribute(element,'disabled','true')
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this.toastr.success(response.message);
        this._Renderer2.removeAttribute(element,'disabled')
        this._CartService.carNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }
  
  addWishlist(id : string) : void {
    this._WishlistService.addProductToWishList(id).subscribe({
     next:(res)=>{
       this.toastr.success(res.message);  
       this.wishListData = res.data;    
       this._WishlistService.wishlistNumber.next(this.wishListData.length)
     },
     error:(err)=>{
       this.toastr.success(err.message);      
     }
    })
   }
 
   removeFav(id : string):void {
    this._WishlistService.removeItemFromWishList(id).subscribe({
     next:(res)=>{
       this.toastr.success(res.message);      
       this.Prouducts = res.data;    
       this._WishlistService.wishlistNumber.next(this.Prouducts.length)
       console.log(res);
       this._WishlistService.gitWishList().subscribe({
        next:(res)=>{
          this.Prouducts = res.data;    
        }

       })
      
     },
     error:(err)=>{
     console.log(err);
     }
    })
   }


  

}
