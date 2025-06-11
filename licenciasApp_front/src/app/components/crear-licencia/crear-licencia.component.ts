import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-licencia',
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIcon,
    FormsModule,
    HttpClientModule, MatSelect, MatOption, MatToolbar, ReactiveFormsModule],
  templateUrl: './crear-licencia.component.html',
  styleUrl: './crear-licencia.component.css'
})
export class CrearLicenciaComponent {

  show  =  false
  formLicencia!: FormGroup
  imagenUrl: string | null = null
  botonOculto = true
  username:any = ""


  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  constructor(private fl: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.formLicencia = this.fl.group({
      numeroLicencia: [''],
      nombre: [''],
      apellido: [''],
      tipoDocumento: [''],
      nroDocumento: [''],
      fechaNacimiento: [''],
      direccion: [''],
      donante: [''],
      grupoSangre: [''],
      clase:[''],
      cuit:[''],
    });

    this.route.paramMap.subscribe(params => {
      this.username = params.get('username')
    });

  }

  emitirLicencia(){
    this.show = true
  }
  cargarImagen(): void {
    this.inputFile.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagenUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  ocultarBoton(){
    this.botonOculto = !this.botonOculto
  }

    cancel() {
    this.router.navigate(["menu", this.username])
  }
}
