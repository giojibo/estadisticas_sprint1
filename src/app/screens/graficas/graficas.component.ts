import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';


Chart.register(...registerables);

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit{
  public chartCalorias: any;
  public chartPorciones: any;  

  ngOnInit(): void {
    this.cargarGraficaCalorias();
    this.cargarGraficaPorciones();
  }

  cargarGraficaCalorias(): void {
        const data = {
          labels: ['Consumidas', 'Restantes', 'Exedentes'],
          datasets: [
            {
              label: 'Calorías',
              data: [150, 50, 30], // Datos de ejemplo
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverOffset: 4,
            }
          ]
        };
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
        };
    
        this.chartCalorias = new Chart('chartCaloriasCanvas', {
          type: 'doughnut', // Tipo de gráfico
          data: data,
          options:{},
        });
      }

      cargarGraficaPorciones(): void {
        const data = {
          labels: ['Consumidas', 'Faltantes', 'Excedentes'],
          datasets: [
            {
              label: 'Porciones',
              data: [ 20, 15, 5], // Datos de ejemplo
              backgroundColor: ['#00FF00', '#FF00FF', '#0000FF'],
              hoverOffset: 4,
            }
          ]
        };
    
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
        };
    
        this.chartPorciones = new Chart('chartPorcionesCanvas', {
          type: 'doughnut', // Tipo de gráfico
          data: data,
          options: {},
        });
      }
    
  //Histograma
  lineChartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [
      {
        data:[75, 72, 71, 70, 68, 69, 70, 69, 69, 68, 67, 65],
        label: 'Registro de peso',
        backgroundColor: 'red',
        borderWidth: 2,
      fill: false,
      tension: 0
      }
    ]
  }
  lineChartOption: any = {
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
  
  lineChartPlugins = [ DatalabelsPlugin ];
}