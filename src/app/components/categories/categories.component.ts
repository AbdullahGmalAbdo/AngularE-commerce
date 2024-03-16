import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Categories } from 'src/app/core/interfaces/categories';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  Categories : Categories [] =[]
  constructor( private _ProductsService:ProductsService ){}
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next:(res)=>{
        this.Categories = res.data;
        console.log(this.Categories);
      },
      error:(err)=>{
        console.log(err);
      }
    })

}

}
