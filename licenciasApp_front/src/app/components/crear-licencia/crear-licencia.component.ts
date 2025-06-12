import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import generatePDF from '../../lib/pdf';
import pdfMake from 'pdfmake/build/pdfmake';

@Component({
  selector: 'app-crear-licencia',
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
  ],
  templateUrl: './crear-licencia.component.html',
  styleUrl: './crear-licencia.component.css',
})
export class CrearLicenciaComponent {
  show = false;
  formLicencia!: FormGroup;
  imagenUrl: string | null = null;
  botonOculto = true;
  username: any = '';

  @ViewChild('inputFile') inputFile!: ElementRef<HTMLInputElement>;
  constructor(
    private fl: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formLicencia = this.fl.group({
      numeroLicencia: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      nroDocumento: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      donante: ['', Validators.required],
      grupoSangre: ['', Validators.required],
      clase: ['', Validators.required],
      cuit: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username');
    });
  }

  emitirLicencia() {


    this.show = true;

    
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

  ocultarBoton() {
    this.botonOculto = !this.botonOculto;
  }

  cancel() {
    this.router.navigate(['menu', this.username]);
  }

  convertirImagenABase64(ruta:string): Promise<string> {
    const url = ruta;
    return fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo cargar la imagen');
        return response.blob();
      })
      .then((blob) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject('Error al convertir la imagen a base64');
            }
          };
          reader.onerror = () => reject('Error leyendo la imagen');
          reader.readAsDataURL(blob);
        });
      });
  }

  async generarPDF() {
    try {
      const base64ImageDorso = await this.convertirImagenABase64("assets/licencia-dorso.png");
      const base64ImageFrontal = await this.convertirImagenABase64("assets/licencia-frontal.png");
      const base64ImageCuadrado = await this.convertirImagenABase64("assets/qr-cuadrado.png");
      const base64ImageHorizontal = await this.convertirImagenABase64("assets/qr-horizontal.jpg");

      const datosFormulario = this.formLicencia.value;
      console.log('Datos del formulario:', datosFormulario);

      this.imprimir(base64ImageDorso, base64ImageFrontal, base64ImageCuadrado, base64ImageHorizontal, datosFormulario)
      
      

      
      

    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }


  imprimir(imagenDorso:string, imagenFrontal:string , imgCuadrago:string , imgHorizontal:string , datosFormulario:Object){
    generatePDF(imagenDorso, imagenFrontal , imgCuadrago , imgHorizontal , datosFormulario);
  }
}
