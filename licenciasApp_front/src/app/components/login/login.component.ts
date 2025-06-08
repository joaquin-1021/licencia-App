import { LoadingOverlayComponent } from './../loading-overlay/loading-overlay.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/snackbar.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  username = '';
  password = '';
  hidePassword = true;
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  login(passwordInput: NgModel, usernameInput: NgModel) {
    this.loading = true;
    let formsEmpty = this.username && this.password;

    if (!formsEmpty) {
      passwordInput.control.markAllAsTouched();
      usernameInput.control.markAllAsTouched();
      this.loading = false;
    } else {
      const url = `http://152.170.128.205:8080/usuario/login?username=${this.username}&password=${this.password}`;
      console.log(url);

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        console.log(response)
        if (response.status == 409) {
          this.loading = false;
          this.snackbar.open('Usuario y/o contraseña incorrectos', 'error');
        } else if (response.status == 202) {
          this.loading = false;
          this.router.navigate(['menu',this.username]);
        }
      }).then((data) => {
        console.log(data)
      });
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
