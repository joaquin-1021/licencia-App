import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-solicitud',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIcon,
    FormsModule,
    HttpClientModule,
    MatSelect,
    MatOption,
    MatToolbar,
    ReactiveFormsModule,
    LoadingOverlayComponent,
  ],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.css',
})
export class SolicitudComponent implements OnInit {
  isLoading = false;
  formSolicitud!: FormGroup;
  username: any = '';

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username');
    });

    this.formSolicitud = this.fb.group({
      nroDocumento: [''],
      tipoOperacion: [''],
      clase: [''],
    });
  }

  onSubmit() {
    const body = {
      titular: {
        nroDocumento: this.formSolicitud.get('nroDocumento')?.value,
      },
      operacion: this.formSolicitud.get('tipoOperacion')?.value,
      clase: this.formSolicitud.get('clase')?.value,
      usuario: {
        username: this.username,
      },
    };

    console.log(body);
    this.isLoading = true;

    fetch('http://152.170.128.205:8080/solicitud/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.status === 409) {
        this.snackbar.open('Titular no existente', 'error')
      }
      if (response.status === 500) {
        this.snackbar.open('Error de servidor', 'error')
      }
      if (response.status === 201) {
        this.snackbar.open('Solicitud generada con exito', 'success');
        this.router.navigate(["menu", this.username])
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
    this.router.navigate(['menu', this.username]);
  }
}
