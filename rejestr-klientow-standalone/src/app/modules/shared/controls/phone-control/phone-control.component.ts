import { Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';

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
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatInput,
        ReactiveFormsModule,
        MatError,
    ],
})
export class PhoneControlComponent implements ControlValueAccessor, OnDestroy {
  numberPrefixControl = new FormControl('', [Validators.required]);
  numberControl = new FormControl('', [Validators.required]);
  sub = new Subscription();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: string | null) => {};
  onTouch = () => {};

  constructor() {
    this.sub.add(
      combineLatest([
        this.numberPrefixControl.valueChanges,
        this.numberControl.valueChanges,
      ]).subscribe(([prefix, number]) => {
        if (prefix && number) {
          this.onChange(`+${prefix}${number}`);
        } else {
          this.onChange(null);
        }
      }),
    );
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  writeValue(value: string): void {
    const valueWithoutPlus = value.replace('+', '');
    const prefix = valueWithoutPlus.slice(0, 2);
    const number = valueWithoutPlus.slice(2);

    this.numberPrefixControl.setValue(prefix);
    this.numberControl.setValue(number);
  }

  // Ta nie jest wymagana
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.numberControl.disable();
      this.numberPrefixControl.disable();
    } else {
      this.numberControl.enable();
      this.numberPrefixControl.enable();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
