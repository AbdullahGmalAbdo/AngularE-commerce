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
import { Categories } from 'src/app/core/interfaces/categories';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, TextcutPipe, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Prouducts: Product[] = [];
  filteredProducts: Product[] = [];
  wishListData: string[] = [];
  categories: Categories[] = [];
  
  // Pagination
  pageSize: number = 12;
  CerentPage: number = 1;
  total: number = 0;
  
  // Search and Filters
  term: string = '';
  selectedCategories: string[] = [];
  priceRange = { min: 0, max: 10000 };
  minPrice: number = 0;
  maxPrice: number = 10000;
  selectedRating: number = 0;
  sortBy: string = '';
  
  // UI State
  viewMode: 'grid' | 'list' = 'grid';
  showMobileFilter: boolean = false;
  isAddingToCart: boolean = false;
  
  // Filter Options
  ratingOptions: number[] = [4, 3, 2, 1];

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private toastr: ToastrService,
    private WishlistService: WishlistService,
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
        this.filteredProducts = [...this.Prouducts];
        this.pageSize = Response.metadata.limit;
        this.CerentPage = Response.metadata.currentPage;
        this.total = Response.results;
        this.calculatePriceRange();
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

  calculatePriceRange(): void {
    if (this.Prouducts.length > 0) {
      const prices = this.Prouducts.map(p => p.price);
      this.minPrice = Math.min(...prices);
      this.maxPrice = Math.max(...prices);
      this.priceRange = { min: this.minPrice, max: this.maxPrice };
    }
  }

  getFilteredProducts(): Product[] {
    let filtered = [...this.Prouducts];

    // Search filter
    if (this.term) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(this.term.toLowerCase())
      );
    }

    // Category filter
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        this.selectedCategories.includes(product.category.name)
      );
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= this.priceRange.min && product.price <= this.priceRange.max
    );

    // Rating filter
    if (this.selectedRating > 0) {
      filtered = filtered.filter(product => 
        product.ratingsAverage >= this.selectedRating
      );
    }

    // Sort
    if (this.sortBy) {
      filtered = this.sortProducts(filtered);
    }

    this.filteredProducts = filtered;
    return filtered;
  }

  sortProducts(products: Product[]): Product[] {
    switch (this.sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
      case 'newest':
        return products.reverse();
      default:
        return products;
    }
  }

  // Filter Event Handlers
  onSearchChange(): void {
    this.CerentPage = 1;
    this.getFilteredProducts();
  }

  onCategoryChange(event: any, categoryName: string): void {
    if (event.target.checked) {
      this.selectedCategories.push(categoryName);
    } else {
      this.selectedCategories = this.selectedCategories.filter(name => name !== categoryName);
    }
    this.CerentPage = 1;
    this.getFilteredProducts();
  }

  onPriceRangeChange(): void {
    this.CerentPage = 1;
    this.getFilteredProducts();
  }

  onRatingChange(rating: number): void {
    this.selectedRating = this.selectedRating === rating ? 0 : rating;
    this.CerentPage = 1;
    this.getFilteredProducts();
  }

  onSortChange(): void {
    this.CerentPage = 1;
    this.getFilteredProducts();
  }

  clearAllFilters(): void {
    this.term = '';
    this.selectedCategories = [];
    this.priceRange = { min: this.minPrice, max: this.maxPrice };
    this.selectedRating = 0;
    this.sortBy = '';
    this.CerentPage = 1;
    this.getFilteredProducts();
  }

  // UI Event Handlers
  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  toggleMobileFilter(): void {
    this.showMobileFilter = !this.showMobileFilter;
  }

  // Cart and Wishlist Actions
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

  pageChanged(event: any): void {
    this.CerentPage = event;
  }
}