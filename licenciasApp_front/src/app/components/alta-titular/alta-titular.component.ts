import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../../shared/snackbar.service';
import { LoadingOverlayComponent } from '../loading-overlay/loading-overlay.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-titular',
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIcon,
    FormsModule,
    HttpClientModule, MatSelect, MatOption, MatToolbar, ReactiveFormsModule, LoadingOverlayComponent],
  templateUrl: './alta-titular.component.html',
  styleUrl: './alta-titular.component.css'
})
export class AltaTitularComponent {

  isLoading = false;
  formTitular!: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: SnackbarService, private router:Router) {}

  ngOnInit(): void {
    this.formTitular = this.fb.group({
      nombre: [''],
      apellido: [''],
      tipoDocumento: [''],
      nroDocumento: [''],
      fechaNacimiento: [''],
      direccion: [''],
      donante: [''],
      grupoSangre: ['']
    });
  }

  onSubmit() {

    const body = {
      nombre : this.formTitular.get('nombre')?.value,
      apellido : this.formTitular.get('apellido')?.value,
      tipoDocumento: this.formTitular.get('tipoDocumento')?.value,
      nroDocumento: Number(this.formTitular.get('nroDocumento')?.value),
      fechaNacimiento: this.formTitular.get('fechaNacimiento')?.value,
      direccion: this.formTitular.get('direccion')?.value,
      donante: this.formTitular.get('donante')?.value == "Si" ? true : false,
      grupoSangre: this.formTitular.get('grupoSangre')?.value
    }

    console.log(body)
    this.isLoading = true;

    fetch('http://152.170.128.205:8080/titular/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.status === 409) {
        this.snackbar.open('El titular ya existe', 'error')
      }
      if (response.status === 500) {
        this.snackbar.open('Error de servidor', 'error')
      }
      if (response.status === 201) {
        this.snackbar.open('Titular registrado exitosamente', 'success');
        this.router.navigate(["menu"])
      }
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      this.snackbar.open('Error', 'error')
      console.error('Error en la petición:', error);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  cancel() {
    this.router.navigate(["menu"])
  }


//   {
//   "tipoDocumento":  "DNI",
//   "nroDocumento": 12345678,
//   "nombre": "Juan",
//   "apellido": "Pérez",
//   "fechaNacimiento": "1990-05-15",
//   "direccion": "Calle Falsa 123",
//   "grupoSangre":  "A",
//   "donante": true,
//   "solicitudes": []
// }

}

