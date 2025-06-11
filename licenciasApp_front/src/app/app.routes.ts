import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AltaTitularComponent } from './components/alta-titular/alta-titular.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CrearLicenciaComponent } from './components/crear-licencia/crear-licencia.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent },
  {path:'alta-titular/:username', component: AltaTitularComponent},
  {path:'menu/:username', component: MenuComponent},
  {path:'register', component: RegistroComponent},
  {path:'licencia/:username', component: CrearLicenciaComponent},
  {path:'**', redirectTo:'login'}
];
