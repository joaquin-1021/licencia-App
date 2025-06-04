import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-alta-titular',
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIcon,
    FormsModule,
    HttpClientModule,],
  templateUrl: './alta-titular.component.html',
  styleUrl: './alta-titular.component.css'
})
export class AltaTitularComponent {

}
