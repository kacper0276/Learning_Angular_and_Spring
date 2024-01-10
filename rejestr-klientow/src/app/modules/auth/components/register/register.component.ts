import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    // this.registerForm.controls.email.valueChanges.subscribe((text) => {
    //   console.log(text);
    // });
    console.log('');
    // this.registerForm.controls.email.disable();
  }

  // enableControl() {
  //   this.registerForm.controls.email.enable();
  // }

  onRegister() {
    // console.log(this.registerForm.value); // email - wylączona zawiera:  password: "", username: ""
    // console.log(this.registerForm.getRawValue()); // Jeśli kontrolka jest wyłączona to nadal jej pole jest w obiekcie
  }
}
