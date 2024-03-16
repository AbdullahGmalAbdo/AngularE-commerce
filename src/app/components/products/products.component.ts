import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { TextcutPipe } from 'src/app/core/pipe/textcut.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,TextcutPipe,NgxPaginationModule,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  Prouducts :Product[]=[]
  wishListData : string[] =[]
  pageSize :number = 0
  CerentPage :number = 1
  total :number = 0
  term : string =''
  constructor(private _ProductsService:ProductsService,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private toastr:ToastrService,
    private WishlistService:WishlistService,
    ){}
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next:(Response)=>{
      this.Prouducts=Response.data;
      this.pageSize = Response.metadata.limit
      this.CerentPage = Response.metadata.currentPage
      this.total = Response.results

      }
    })
    
    this.WishlistService.gitWishList().subscribe({
      next:(res)=>{
        const newData = res.data.map((e : any)=> e._id )
      this.wishListData=newData;
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


  pageChanged(event : any):void {
    this._ProductsService.getProducts(event).subscribe({
      next:(Response)=>{
      this.Prouducts=Response.data;
      this.pageSize = Response.metadata.limit
      this.CerentPage = Response.metadata.currentPage
      this.total = Response.results
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
