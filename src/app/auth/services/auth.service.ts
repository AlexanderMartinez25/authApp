import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _usuario!: Usuario

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        //si las credenciales son correctas guardamos los datos del usuario
        tap(resp => {
          if (resp.ok) {
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!
            }
          }
        }),
        // mutar la respuesta del servicio
        map(resp => resp.ok),
        // si las credenciales son inválidads mandamos un mensaje
        // asi lo podemos ejecutar sin que explote en la consola del navegador
        catchError(err => of(false))
      )

  }
}
