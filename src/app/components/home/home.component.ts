import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interfaces/product';
import { TextcutPipe } from 'src/app/core/pipe/textcut.pipe';
import { Categories } from 'src/app/core/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/wishlist.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,TextcutPipe,CarouselModule,RouterLink,],
templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Prouducts :Product[]=[]
  wishListData : string[] =[]
  categories :Categories[]=[]
  constructor (private _ProductsService:ProductsService,
    private _CartService:CartService,
    private toastr: ToastrService,
    private WishlistService: WishlistService,
    private _Renderer2:Renderer2){}
  ngOnInit(): void {

    this._ProductsService.getProducts().subscribe({
      next:(Response)=>{
      this.Prouducts=Response.data;
      }
    })
    this._ProductsService.getCategories().subscribe({
      next:(Response)=>{
        this.categories=Response.data;
      }
    })

    this.WishlistService.gitWishList().subscribe({
      next:(res)=>{
        const newData = res.data.map((e : any)=> e._id )
      this.wishListData=newData;
      }
    })
  }

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 400,
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
      740: {
        items:3
      },
      940: {
        items: 5
      }
    },
    nav: false
  }
  staticSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    navText: ['', ''],
    items : 1,
    nav: false,
    autoplayTimeout:4000,
    autoplaySpeed:1000,
    autoplay:true
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
   this.WishlistService.addProductToWishList(id).subscribe({
    next:(res)=>{
      this.toastr.success(res.message);  
      this.wishListData = res.data;    
      this.WishlistService.wishlistNumber.next(this.wishListData.length)
      
    },
    error:(err)=>{
      this.toastr.success(err.message);      
    }
   })
  }

  removeFav(id : string):void {
   this.WishlistService.removeItemFromWishList(id).subscribe({
    next:(res)=>{
      this.toastr.success(res.message);      
      this.wishListData = res.data;    
      // console.log(res);
      // console.log(this.wishListData.length);
      this.WishlistService.wishlistNumber.next(this.wishListData.length)
    },
    error:(err)=>{
    console.log(err);
    }
   })
  }

  
}
