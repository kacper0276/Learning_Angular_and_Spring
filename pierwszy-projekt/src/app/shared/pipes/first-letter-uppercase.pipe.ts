import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUppercase',
  standalone: true,
  pure: true // Domyślnie na true - jeśli obiekt to pipe wykona się dopiero gdy zmieni się referencja do obiektu/tablicy
  // pure: false - wykona się zawsze gdy Angular wykryje jakąś zmianę
})
export class FirstLetterUppercasePipe implements PipeTransform {

  transform(value: string): string {
    
    return value[0].toUpperCase() + value.slice(1);
  }

}
