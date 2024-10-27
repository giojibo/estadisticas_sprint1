import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent {

  public porciones: number | undefined;
  public comentarios: string | undefined; 

  
  onSubmit() {
    // Registrar las porciones consumidas y los comentarios del paciente
    console.log('Porciones:', this.porciones);
    console.log('Comentarios:', this.comentarios);
  }
}
