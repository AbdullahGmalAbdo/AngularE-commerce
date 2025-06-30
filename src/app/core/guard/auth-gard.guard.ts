import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGardGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  
  // Check if user is authenticated
  const token = localStorage.getItem('etoken');
  
  if (token) {
    // User is authenticated, allow access
    return true;
  } else {
    // User is not authenticated, redirect to login
    console.log('User not authenticated, redirecting to login');
    _Router.navigate(['/login']);
    return false;
  }
};