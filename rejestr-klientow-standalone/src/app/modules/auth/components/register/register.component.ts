import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { PostUser } from '../../../core/models/user.model';
import { Router } from '@angular/router';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatIconButton,
        MatSuffix,
        MatIcon,
        MatButton,
        NgIf,
        AlertComponent,
    ],
})
export class RegisterComponent implements OnInit {
  hide = true;
  errorMessage = '';
  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(50),
      ],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    // hobbies: new FormArray([new FormControl('')]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }

  // get hobbies() {
  //   return this.registerForm.get('hobbies') as FormArray;
  // }

  // addControl() {
  //   this.hobbies.push(new FormControl(''));
  // }

  // removeControl(index: number) {
  //   this.hobbies.removeAt(index);
  // }

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
    const userData: PostUser = this.registerForm.getRawValue();
    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/logowanie']);
      },
      error: (err) => {
        this.errorMessage = 'Wystąpił błąd.';
      },
    });
    // console.log(this.registerForm.value); // email - wylączona zawiera:  password: "", username: ""
    // console.log(this.registerForm.getRawValue()); // Jeśli kontrolka jest wyłączona to nadal jej pole jest w obiekcie
  }
}
