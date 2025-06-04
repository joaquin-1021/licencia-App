import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient) {}

  login() {
    const url = `152.170.128.205:8080/usuario/login?nombre=${this.username}&password=${this.password}`;
    console.log(url);

    this.http
      .get('http://152.170.128.205:8080/usuario/login', {
        params: {
          nombre: this.username,
          password: this.password,
        },
      })
      .subscribe({
        next: (response) => {
          console.log('Respuesta:', response);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
  }
}
