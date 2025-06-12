import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
      numeroLicencia: [''],
      nombre: [''],
      apellido: [''],
      tipoDocumento: [''],
      nroDocumento: [''],
      fechaNacimiento: [''],
      direccion: [''],
      donante: [''],
      grupoSangre: [''],
      clase: [''],
      cuit: [''],
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
      this.imprimir(base64ImageDorso, base64ImageFrontal)

    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }


  imprimir(imagenDorso:string, imagenFrontal:string) {
    const reciboNo = '123456789';
    const fecha = '07 de Marzo de 2024';
    const title = 'pdf-angular';
    const products = [
      { nombre: 'Laptop', cantidad: 2, total: 1500 },
      { nombre: 'Teclado', cantidad: 5, total: 50 },
      { nombre: 'Monitor', cantidad: 1, total: 300 },
      { nombre: 'Ratón', cantidad: 3, total: 30 },
      { nombre: 'Auriculares', cantidad: 4, total: 120 },
      { nombre: 'Impresora', cantidad: 1, total: 200 },
      { nombre: 'Cámara', cantidad: 2, total: 500 },
      { nombre: 'Micrófono', cantidad: 3, total: 80 },
      { nombre: 'Altavoces', cantidad: 2, total: 100 },
      { nombre: 'Webcam', cantidad: 1, total: 70 },
      { nombre: 'Tarjeta gráfica', cantidad: 1, total: 400 },
      { nombre: 'Placa base', cantidad: 2, total: 150 },
      { nombre: 'Memoria RAM', cantidad: 4, total: 250 },
      { nombre: 'Disco duro', cantidad: 3, total: 300 },
      { nombre: 'Fuente de alimentación', cantidad: 2, total: 100 },
      { nombre: 'Silla ergonómica', cantidad: 1, total: 150 },
      { nombre: 'Teclado mecánico', cantidad: 2, total: 120 },
      { nombre: 'Monitor 4K', cantidad: 1, total: 600 },
      { nombre: 'Charger portátil', cantidad: 3, total: 45 },
      { nombre: 'Smartphone', cantidad: 1, total: 500 },
      { nombre: 'Tablet', cantidad: 2, total: 250 },
      { nombre: 'Disco SSD', cantidad: 2, total: 180 },
      { nombre: 'Cable HDMI', cantidad: 6, total: 15 },
      { nombre: 'Proyector', cantidad: 1, total: 350 },
      { nombre: 'Funda para Laptop', cantidad: 4, total: 40 },
      { nombre: 'Hub USB', cantidad: 5, total: 25 },
      { nombre: 'Lámpara LED', cantidad: 3, total: 60 },
      { nombre: 'Batería externa', cantidad: 4, total: 80 },
      { nombre: 'Sofá inteligente', cantidad: 1, total: 800 },
      { nombre: 'Reloj inteligente', cantidad: 2, total: 150 },
      { nombre: 'Gafas VR', cantidad: 1, total: 300 },
      { nombre: 'Dispositivo de streaming', cantidad: 3, total: 120 },
      { nombre: 'Smartwatch', cantidad: 4, total: 200 },
      { nombre: 'Teclado numérico', cantidad: 5, total: 40 },
      { nombre: 'Cargador inalámbrico', cantidad: 6, total: 50 },
      { nombre: 'Cámara de seguridad', cantidad: 2, total: 180 },
      { nombre: 'Soporte para laptop', cantidad: 3, total: 35 },
    ];
    generatePDF(imagenDorso, imagenFrontal);
  }
}
