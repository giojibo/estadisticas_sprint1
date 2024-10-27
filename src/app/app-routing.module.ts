import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GraficasComponent } from './screens/graficas/graficas.component';
import { ReporteComponent } from './screens/reporte/reporte.component';


const routes: Routes = [
   { path: '', component: GraficasComponent, pathMatch: 'full'},
   {path:'seguimiento', component: ReporteComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
