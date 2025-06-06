import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AltaTitularComponent } from './components/alta-titular/alta-titular.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent },
  {path:'alta-titular', component: AltaTitularComponent},
  {path:'menu', component: MenuComponent},
  {path:'**', redirectTo:'login'}
];
