import { Component } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone-control.component.html',
  styleUrl: './phone-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneControlComponent,
      multi: true,
    },
  ],
})
export class PhoneControlComponent implements ControlValueAccessor {
  numberPrefixControl = new FormControl('');
  numberControl = new FormControl('');

  onChange = (value: string | null) => {};
  onTouch = () => {};

  constructor() {
    combineLatest([
      this.numberPrefixControl.valueChanges,
      this.numberControl.valueChanges,
    ]).subscribe(([prefix, number]) => {
      if (prefix && number) {
        this.onChange(`+${prefix}${number}`);
      } else {
        this.onChange(null);
      }
    });
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  writeValue(obj: any): void {}

  // Ta nie jest wymagana
  setDisabledState?(isDisabled: boolean): void {}
}
