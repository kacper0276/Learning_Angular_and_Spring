import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { postcodeValidator } from './postcode.validator';

export class ClientValidators {
  static postcode(control: AbstractControl): ValidationErrors | null {
    const postcodePattern = /^\d{2}-\d{3}$/;
    const value = control.value;

    if (!value || postcodePattern.test(value)) {
      return null;
    }

    return { invalidPostcode: { value } };
  }

  // Lub
  static postcodeInne(control: AbstractControl): ValidatorFn {
    return postcodeValidator();
  }
}
