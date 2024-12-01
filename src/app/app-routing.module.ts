import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GraficasComponent } from './screens/graficas/graficas.component';
import { RegistrarDatosComponent } from './screens/registrar-datos/registrar-datos.component';



const routes: Routes = [
   { path: 'estadisticas', component: GraficasComponent, pathMatch: 'full'},
   { path: '', component: RegistrarDatosComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
