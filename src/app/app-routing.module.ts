import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGardGuard } from './core/guard/auth-gard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGardGuard],
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>  
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'cart',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'products',
      },
      {
        path: 'payment/:id',
        loadComponent: () => 
          import('./components/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
        title: 'payment',
      },
      {
        path: 'productDetails/:id',
        loadComponent: () =>
          import('./components/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'productDetails',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
        title: 'wishlist',
      },
      {
        path: 'categoriesDetails/:id',
        loadComponent: () =>
          import('./components/category-details/category-details.component').then(
            (m) => m.CategoryDetailsComponent
          ),
        title: 'Categories-Details',
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'forgetPassord',
        loadComponent: () => 
          import('./components/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent
          ),
        title: 'forgetPassord',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'register',
      },
    ],
  },
  // Fallback routes for unauthenticated users
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Register',
  },
  {
    path: 'forgetPassord',
    loadComponent: () => 
      import('./components/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
    title: 'Forget Password',
  },
  // Wildcard route - must be last
  { 
    path: '**',
    loadComponent: () =>  
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: 'Not Found page',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false, // Changed from true to false for better SEO
    scrollPositionRestoration: 'enabled',
    enableTracing: false, // Set to true for debugging
    preloadingStrategy: undefined
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}