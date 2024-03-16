import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textcut',
  standalone: true
})
export class TextcutPipe implements PipeTransform {

  transform(text:string,limit:number): string {
    return text.split(' ').splice(0,limit).join(' ')
  }

}
