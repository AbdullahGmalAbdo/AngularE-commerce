import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavAuthComponent } from 'src/app/components/nav-auth/nav-auth.component';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.css'],
    imports: [CommonModule,NavAuthComponent,RouterOutlet,FooterComponent,RouterLinkActive]
})
export class AuthLayoutComponent {

}
