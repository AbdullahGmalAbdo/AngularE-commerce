import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from 'src/app/components/nav-blank/nav-blank.component';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css'],
  imports: [CommonModule,NavBlankComponent,RouterOutlet,FooterComponent,RouterLinkActive],
})
export class BlankLayoutComponent {
  goUp(){
    scrollTo(0,0)
  }
}
