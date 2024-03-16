import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(Prouducts :any[] ,term:string ): any [] {

  
    return Prouducts.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase())

    
    )
  }



  

}
