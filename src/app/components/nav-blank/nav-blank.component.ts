import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLink,RouterLinkActive],
templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {
  cartItemNumber : number = 0 
  wishListNumber : number =0

  constructor(private _Router:Router,
    private _CartService:CartService,
    private _WishlistService:WishlistService
    ){}

  ngOnInit(): void {
  this._CartService.carNumber.subscribe({
    next:(data)=>{
      this.cartItemNumber = data;  
          
    }
  })
  
  this._WishlistService.wishlistNumber.subscribe({
    next:(res)=>{
      this.wishListNumber = res ;
      
    }
  })


   

  this._CartService.getUserCart().subscribe({
    next:(respons)=>{
    this.cartItemNumber = respons.numOfCartItems 
    }
  })

  this._WishlistService.gitWishList().subscribe({
    next:(respons)=>{
    let wishListCount =  respons.data
    this.wishListNumber = wishListCount.length  
    }
  })
  


  }


  signOUt(){
    localStorage.removeItem('etoken')
  this._Router.navigate(['/login'])
  }
}
