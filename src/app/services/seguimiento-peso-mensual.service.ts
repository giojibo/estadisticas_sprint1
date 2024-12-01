import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environments/environments';


const httpOptions = {
  headers: new HttpHeaders ()
}

@Injectable({
  providedIn: 'root'
})
export class SeguimientoPesoMensualService {

  constructor(
    private http: HttpClient,
  ) { }

  getPesosMensuales(paciente: string): Observable<any>
  {
    return this.http.get<any>(`${enviroment.url_api}/peso-mensual/peso-mensual/?paciente=${paciente}`);
  }

  registrarPesoMensual(data: {mes:string; peso_inicial:number}): Observable<any>
  {
    return this.http.post<any>(`${enviroment.url_api}/peso-mensual/peso-mensual/`, data, httpOptions)
  }
}
