import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { AltaTitularComponent } from './components/alta-titular/alta-titular.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AltaTitularComponent, CommonModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'licenciasApp';
}



