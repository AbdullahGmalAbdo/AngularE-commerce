import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { Categories } from 'src/app/core/interfaces/categories';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule],
templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  CategoryId:any
  categoryDetails:Categories =  {
    _id: '',
    name: '',
    image: '',
    updatedAt: ''
  }
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _ProductsService:ProductsService){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
      this.CategoryId = params.get('id');
      }
    })

  this._ProductsService.getCategoriesDetails(this.CategoryId).subscribe({
    next :(res)=>{
     console.log(res);

     this.categoryDetails=res.data
     console.log(this.CategoryId);
     
     
    },
    error:(err)=>{
      console.log(err);
    }

  })

  }

}
