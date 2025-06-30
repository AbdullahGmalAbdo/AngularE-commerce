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
  imports: [CommonModule, TextcutPipe, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Prouducts: Product[] = [];
  wishListData: string[] = [];
  categories: Categories[] = [];
  isAddingToCart: boolean = false;

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private WishlistService: WishlistService,
    private _Renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadWishlist();
  }

  loadProducts(): void {
    this._ProductsService.getProducts().subscribe({
      next: (Response) => {
        this.Prouducts = Response.data;
      }
    });
  }

  loadCategories(): void {
    this._ProductsService.getCategories().subscribe({
      next: (Response) => {
        this.categories = Response.data;
      }
    });
  }

  loadWishlist(): void {
    this.WishlistService.gitWishList().subscribe({
      next: (res) => {
        const newData = res.data.map((e: any) => e._id);
        this.wishListData = newData;
      }
    });
  }

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 400,
    autoplaySpeed: 1000,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1200: {
        items: 5
      }
    },
    nav: true
  };

  staticSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    items: 1,
    nav: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    autoplay: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn'
  };

  addToCartt(id: any, element: HTMLButtonElement): void {
    this.isAddingToCart = true;
    this._Renderer2.setAttribute(element, 'disabled', 'true');

    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.carNumber.next(response.numOfCartItems);
        this.isAddingToCart = false;
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
        this.isAddingToCart = false;
      }
    });
  }

  addWishlist(id: string): void {
    this.WishlistService.addProductToWishList(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.wishListData = res.data;
        this.WishlistService.wishlistNumber.next(this.wishListData.length);
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }

  removeFav(id: string): void {
    this.WishlistService.removeItemFromWishList(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message);
        this.wishListData = res.data;
        this.WishlistService.wishlistNumber.next(this.wishListData.length);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}