import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'E-commerceApp';

  constructor(private router: Router) {}

  ngOnInit() {
    // Handle route changes for analytics or other purposes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // You can add analytics tracking here
      console.log('Navigation to:', event.url);
    });

    // Check authentication status on app initialization
    this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus(): void {
    const token = localStorage.getItem('etoken');
    const currentUrl = this.router.url;
    
    console.log('Current URL:', currentUrl);
    console.log('Token exists:', !!token);
    
    // If no token and not on auth pages, redirect to login
    if (!token && !this.isAuthPage(currentUrl)) {
      console.log('Redirecting to login - no token and not on auth page');
      this.router.navigate(['/login']);
    } else if (token && this.isAuthPage(currentUrl)) {
      // If user has token but is on auth page, redirect to home
      console.log('Redirecting to home - user authenticated but on auth page');
      this.router.navigate(['/home']);
    }
  }

  private isAuthPage(url: string): boolean {
    const authPages = ['/login', '/register', '/forgetPassord', '/auth'];
    return authPages.some(page => url.includes(page));
  }
}