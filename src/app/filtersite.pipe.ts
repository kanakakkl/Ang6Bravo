import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtersite',
  pure: false
})
export class FiltersitePipe implements PipeTransform {

  transform(value: any, filterSiteString:string, propName : string): any {
   if (value.length === 0 ||  filterSiteString === '')
   {
     return value;
   }
   const resultArray = [];
   for (const item of value) {
     if (item[propName] === filterSiteString) {
       resultArray.push(item);
     }
   }
   return resultArray;
  }
}
