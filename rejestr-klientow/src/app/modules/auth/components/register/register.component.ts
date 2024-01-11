import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  get controls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    // this.registerForm.controls.email.valueChanges.subscribe((text) => {
    //   console.log(text);
    // });
    this.controls.username.addValidators(Validators.minLength(5)); // Dodaje do obecnych validatorów
    // Starszy sposób
    // this.controls.username.setValidators([Validators.minLength(5), Validators.required]); // Nadpisuje stare validatory

    // this.registerForm.controls.email.disable();

    // this.controls.username.setValue('test1');
    // this.registerForm.setValue({
    //   email: 'test@ad',
    //   username: '',
    //   password: '',
    // });

    // patchValue - nie trzeba przekazywać całego obiektu
    // this.registerForm.patchValue({
    //   email: 'Sigma@op',
    // });
  }

  // enableControl() {
  //   this.registerForm.controls.email.enable();
  // }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Musisz podać jakąś wartość.';
    }

    if (control.hasError('minlength')) {
      return 'Przekazałeś za mało znaków w kontrolce';
    }

    if (control.hasError('maxlength')) {
      return 'Przekazałeś za dużo znaków w kontrolce';
    }

    return control.hasError('email') ? 'Nieprawidłowy adres email' : '';
  }

  onRegister() {
    // console.log(this.registerForm.value); // email - wylączona zawiera:  password: "", username: ""
    // console.log(this.registerForm.getRawValue()); // Jeśli kontrolka jest wyłączona to nadal jej pole jest w obiekcie
  }
}
