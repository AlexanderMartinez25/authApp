import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private as: AuthService) { }

  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  login() {
    const { email, password } = this.miFormulario.value;

    this.as.login(email, password)
      .subscribe((ok) => {

        if (ok === true) {
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire('Error', ok, 'error')
        }

      })
  }

}
