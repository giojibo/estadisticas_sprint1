import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../environments/environments';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders ()
}

@Injectable({
  providedIn: 'root'
})
export class SeguimientoCaloricoService {

  constructor(
    private http: HttpClient,
  ) { }

  registrarSeguimiento(data: any): Observable<any> {
    return this.http.post<any>(`${enviroment.url_api}/calorias/calorias/`, data, httpOptions);
  }

  obtenerSeguimientos(): Observable<any>{
    return this.http.get<any>(`${enviroment.url_api}/calorias/calorias/`, httpOptions);
  }

}
