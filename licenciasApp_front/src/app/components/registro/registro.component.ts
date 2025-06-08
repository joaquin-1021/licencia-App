import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { observeOn } from 'rxjs';
import { NgModel } from '@angular/forms';
import { SnackbarService } from '../../shared/snackbar.service';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-registro',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIcon,
    FormsModule,
    HttpClientModule,
    LoadingOverlayComponent
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  hidePassword = true;
  hidePasswordConfirm = true;
  password = '';
  passwordConfirm = '';
  username = '';
  formSubmitted = false;
  loading = false;

  constructor(private router: Router, private snackbar: SnackbarService) {}

  confirmRegister(password:NgModel, passwordConfirm:NgModel, username:NgModel) {
    this.formSubmitted = true
    this.loading = true

    const formEmpty = this.password && this.passwordConfirm && this.username
    const passwordsMatch = this.passwordsMatch()

    if (!formEmpty) {
      password.control.markAsTouched()
      passwordConfirm.control.markAsTouched()
      username.control.markAsTouched()
    } else if (!passwordsMatch) {
      this.snackbar.open('Las contraseñas no coinciden', 'error')
    } else {
      console.log(this.username + this.password)
      const body = {
        username: this.username,
        password: this.password
      }

      const url = 'http://152.170.128.205:8080/usuario/crear'

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }).then(response => {
        if(response.status == 409) {
          this.loading = false
          this.snackbar.open('Usuario ya existente', 'error')
        } else if(response.status == 201) {
          this.loading = false
          this.snackbar.open('Usuario creado con exito', 'success')
          this.router.navigate(["login"])
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  togglePasswordConfirmVisibility() {
    this.hidePasswordConfirm = !this.hidePasswordConfirm;
  }

  passwordsMatch(): boolean {
    return this.password === this.passwordConfirm;
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
