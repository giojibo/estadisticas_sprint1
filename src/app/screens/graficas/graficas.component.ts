import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { SeguimientoCaloricoService } from 'src/app/services/seguimiento-calorico.service';
import { SeguimientoPesoMensualService } from 'src/app/services/seguimiento-peso-mensual.service';
import { SeguimientoPorcionesService } from 'src/app/services/seguimiento-porciones.service';


Chart.register(...registerables);

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit{
  public chartCalorias: any;
  public chartPorciones: any;  
  public chartPesoMensual: any;  // Para el gráfico de peso mensual

  // Propiedades para el gráfico de línea
  public lineChartData: any = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [
      {
        data: [75, 72, 71, 70, 68, 69, 70, 69, 69, 68, 67, 65], // Datos predeterminados
        label: 'Registro de peso',
        backgroundColor: 'red',
        borderWidth: 2,
        fill: false,
        tension: 0
      }
    ]
  };

  public lineChartOption: any = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#444',
        anchor: 'end',
        align: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: 63,
        suggestedMax: 70
      }
    }
  };

  public lineChartPlugins = [DatalabelsPlugin];
  public paciente: string = 'Giovani';

  constructor(
    private seguimientoServices: SeguimientoCaloricoService,
    private porcionesServices: SeguimientoPorcionesService,
    private pesoMensualServices: SeguimientoPesoMensualService,
  ){}

  ngOnInit(): void {
    this.cargarDatosDinamicos(); 
    this.cargarGraficaCalorias();
    this.cargarGraficaPorciones();
  }

  
  cargarGraficaCalorias(): void {
    this.seguimientoServices.obtenerSeguimientos().subscribe(
      (datos) => {
        // Procesar los datos del backend para usarlos en la gráfica
        const caloriasConsumidas = datos[0]?.calorias_consumidas || 0;
        const caloriasRecomendadas = datos[0]?.calorias_recomendadas || 0;
        const caloriasRestantes = caloriasRecomendadas - caloriasConsumidas > 0 ? caloriasRecomendadas - caloriasConsumidas : 0;
        const caloriasExcedentes = caloriasConsumidas > caloriasRecomendadas ? caloriasConsumidas - caloriasRecomendadas : 0;

        const data = {
          labels: ['Consumidas', 'Restantes', 'Excedentes'],
          datasets: [
            {
              label: 'Calorías',
              data: [caloriasConsumidas, caloriasRestantes, caloriasExcedentes],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverOffset: 4,
            }
          ]
        };

        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,  // Usa 'as const' para asegurarte de que el valor sea del tipo correcto
            },
            tooltip: {
              enabled: true,
            },
          },
        };

        this.chartCalorias = new Chart('chartCaloriasCanvas', {
          type: 'doughnut',
          data: data,
          options: options,
        });
      },
      (error) => {
        console.error('Error al obtener datos de seguimiento calórico:', error);
      }
    );
  }

  cargarGraficaPorciones(): void {
    this.porcionesServices.obtenerPorciones().subscribe(
      (datos) => {
        const porcionesConsumidas = datos[0]?.porciones_consumidas || 0;
        const porcionesRecomendadas = datos[0]?.porciones_recomendadas || 0;
        const porcionesExcedentes = datos[0]?.porciones_excedentes || 0;
  
        const data = {
          labels: ['Consumidas', 'Faltantes', 'Excedentes'],
          datasets: [
            {
              label: 'Porciones',
              data: [porcionesConsumidas, porcionesRecomendadas - porcionesConsumidas, porcionesExcedentes],
              backgroundColor: ['#00FF00', '#FF00FF', '#0000FF'],
              hoverOffset: 4,
            }
          ]
        };
  
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const, // Resuelve el error
            },
            tooltip: {
              enabled: true,
            },
          },
        };
  
        this.chartPorciones = new Chart('chartPorcionesCanvas', {
          type: 'doughnut',
          data: data,
          options: options,
        });
      },
      (error) => {
        console.error('Error al obtener datos de seguimiento de porciones:', error);
      }
    );
  }
  
  // Cargar datos dinámicos para el gráfico de línea
  cargarDatosDinamicos(): void {
    this.pesoMensualServices.getPesosMensuales(this.paciente).subscribe(
      (datos) => {
        if (datos && datos.length) {
          const meses = datos.map((d: any) => d.mes);
          const pesos = datos.map((d: any) => d.peso_calculado);

          this.lineChartData.labels = meses;
          this.lineChartData.datasets[0].data = pesos;

          // Ahora se carga el gráfico de líneas dinámicamente
          this.chartPesoMensual = new Chart('chartPesoMensualCanvas', {
            type: 'line',
            data: this.lineChartData,
            options: this.lineChartOption,
            plugins: this.lineChartPlugins
          });
        }
      },
      (error) => {
        console.error('Error al obtener datos de peso mensual:', error);
      }
    );
  }
}