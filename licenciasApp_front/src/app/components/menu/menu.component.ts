import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatCardModule, MatIcon, MatInputModule, MatSelect, MatOption, MatToolbar, MatTooltip],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute){}

  username:any = ""

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
      this.username = params.get('username')
    });
  }



  goAltaTitular() {
    this.router.navigate(["alta-titular", this.username])
  }

  logout() {
    this.router.navigate(["login"])
  }

  goSolicitud() {
    this.router.navigate(["solicitud", this.username])
  }

  goLicencia() {
    this.router.navigate(["licencia", this.username])
  }


}
