import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/core/services/products.service';
import { Categories } from 'src/app/core/interfaces/categories';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands : Categories [] =[]

  constructor (private _ProductsService:ProductsService){}
  ngOnInit(): void {

    this._ProductsService.prand().subscribe({
      next:(res)=>{
    console.log(res);
       this.brands = res.data
    
      },
      error : (err)=>{
        console.log(err);
        
      }
    })
  }


}
