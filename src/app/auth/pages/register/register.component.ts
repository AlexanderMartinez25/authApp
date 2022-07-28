import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor(private fb: FormBuilder,
    private router: Router,
    private as: AuthService) { }

  miFormulario: FormGroup = this.fb.group({
    name: ['Alexander', [Validators.required, Validators.minLength(3)]],
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  })

  registro() {
    const { name, email, password } = this.miFormulario.value;

    this.as.registro(name, email, password)
      .subscribe((ok) => {

        if (ok === true) {
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire('Error', ok, 'error')
        }
      })
  }
}
