import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
    transform(value: any, term: string): any {
       let filter = term.toLocaleLowerCase();
       return filter ? value.filter(product=> product.name.toLocaleLowerCase().indexOf(filter) != -1) : value;
    }
}