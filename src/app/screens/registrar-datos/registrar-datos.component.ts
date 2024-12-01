import { Component } from '@angular/core';
import { SeguimientoCaloricoService } from 'src/app/services/seguimiento-calorico.service';
import { SeguimientoPesoMensualService } from 'src/app/services/seguimiento-peso-mensual.service';
import { SeguimientoPorcionesService } from 'src/app/services/seguimiento-porciones.service';

@Component({
  selector: 'app-registrar-datos',
  templateUrl: './registrar-datos.component.html',
  styleUrls: ['./registrar-datos.component.scss']
})
export class RegistrarDatosComponent {
  seguimiento: seguimiento_calorico = {
    paciente: '',
    calorias_recomendadas: 0,
    calorias_consumidas: 0,

  };

  porciones: seguimiento_porciones = {
    paciente: '',
    porciones_recomendadas: 0,
    porciones_consumidas: 0,
  };

  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]; 

  registro_peso = {
    paciente: '',
    mes: '',
    anio: new Date().getFullYear(),
    peso_inicial: 0,
    calorias_recomendadas: 0,
    calorias_consumidas: 0,
    calorias_excedentes: 0,
  };
  registros: any[] = [];


  constructor(
    private seguimientoService: SeguimientoCaloricoService,
    private porcionesServices: SeguimientoPorcionesService,
    private pesoMensualServices: SeguimientoPesoMensualService,
  ){}

  registrar(){
    this.seguimientoService.registrarSeguimiento(this.seguimiento).subscribe({
      next: (response)=> {
        console.log('Seguimiento registrado: ', response); 
        alert('Seguimiento registrado exitosamente');
      },
      error: (error)=>{
        console.error('error al registrar seguimiento:', error);
        alert('Error al registrar seguimiento');
      }
    })
  }

  registrar_porciones()
  {
    this.porcionesServices.registrarPorciones(this.porciones).subscribe({
      next: (response)=>{
        console.log('Porciones registradas: ', response);
        alert('Porciones regsitradas con exito');
      },
      error: (error)=>{
        console.error('error al registrar seguimiento', error);
        alert('Error al registrar porciones');
      }
    })
  }

  onSubmit(): void {
    if (
      this.registro_peso.paciente &&
      this.registro_peso.mes &&
      this.registro_peso.anio &&
      this.registro_peso.peso_inicial &&
      this.registro_peso.calorias_recomendadas &&
      this.registro_peso.calorias_consumidas
    ) {
      this.pesoMensualServices.registrarPesoMensual(this.registro_peso).subscribe(
        (response) => {
          this.registros.push(response); // Agregar el nuevo registro a la lista
          this.limpiarFormulario(); // Limpiar el formulario
        },
        (error) => {
          console.error('Error al registrar el peso:', error);
          alert('Error al registrar el peso. Verifica los datos ingresados.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
  
  limpiarFormulario(): void {
    this.registro_peso = {
      paciente: '',
      mes: '',
      anio: new Date().getFullYear(),
      peso_inicial: 0,
      calorias_recomendadas: 0,
      calorias_consumidas: 0,
      calorias_excedentes: 0, // Este campo es opcional
    };
  }
}

export interface seguimiento_calorico {
  paciente: string;
  calorias_recomendadas: number;
  calorias_consumidas: number;
  calorias_excedentes?: number; 
  fecha?: string; 
}

export interface seguimiento_porciones{
  paciente: string;
  porciones_recomendadas: number;
  porciones_consumidas: number;
  porciones_excedentes?: number;
  fecha?: string;
}
