import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appFirstLetter]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: FirstLetterDirective, multi: true },
    // multi - powoduje że nie nadpisujemy innych walidatorów, inaczej byłby brany pod uwagę tylko ostatni
  ],
})
export class FirstLetterDirective implements Validator {
  // @Input('appFirstLetter') firstLetter = '';
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    // Zwracamy obiekt lub null
    if (control.value) {
      const forbidden = !new RegExp('[a-zA-Z]', 'i').test(control.value[0]);
      return forbidden ? { firstLetter: { value: control.value } } : null;
    }
    return null;
  }

  // Nie obowiązkowy - odnosi się do właściwości z dekoratorem @Input()
  registerOnValidatorChange?(fn: () => void): void {}
}
