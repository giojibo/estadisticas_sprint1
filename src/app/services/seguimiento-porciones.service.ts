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
export class SeguimientoPorcionesService {

  constructor( 
    private http: HttpClient,
  ) { }

  registrarPorciones(data:any): Observable<any>
  {
    return this.http.post<any>(`${enviroment.url_api}/porciones/porciones/`, data, httpOptions);
  }
  obtenerPorciones(): Observable<any>{
    return this.http.get<any>(`${enviroment.url_api}/porciones/porciones/`, httpOptions );
  }
}
