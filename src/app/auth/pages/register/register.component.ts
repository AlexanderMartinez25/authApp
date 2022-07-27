import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor(private fb: FormBuilder) { }

  miFormulario: FormGroup = this.fb.group({
    name: ['Alexander', [Validators.required, Validators.minLength(3)]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  registro() {
    console.log(this.miFormulario.valid);
    console.log(this.miFormulario.value);
  }
}
