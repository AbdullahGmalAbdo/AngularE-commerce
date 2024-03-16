import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/wishlist.service';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productId:string | null=''
  productDetails:any = null
  wishListData : string[] =[]
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _ProductsService:ProductsService,
    private _Renderer2:Renderer2,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private toastr:ToastrService){}
  ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(parms)=>{
      this.productId=parms.get('id')      
    }
   })
   this._ProductsService.getProductDetails(this.productId).subscribe({
    next:(data)=>{
      this.productDetails=data.data;
      // console.log(this.productDetails)
    }
   })
  } 




  addToCartt(id:any , element : HTMLButtonElement):void {

   
    this._Renderer2.setAttribute(element,'disabled','true')

    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.toastr.success(response.message);
        this._Renderer2.removeAttribute(element,'disabled')
        this._CartService.carNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })


  }


  ProoductDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplaySpeed:1000,
    autoplay:true,
    autoplayTimeout:2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
    },
    nav: true
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
       this.wishListData = res.data;    
       // console.log(res);
       // console.log(this.wishListData.length);
       this._WishlistService.wishlistNumber.next(this.wishListData.length)
     },
     error:(err)=>{
     console.log(err);
     }
    })
   }
 
  

}
