import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators'
import { of, Observable } from 'rxjs';

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

  registro(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        //si todo sale bien, guardamos los datos del usuario y el localstorage
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
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
        catchError(err => of(err.error.msg))
      )
  }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        //si las credenciales son correctas guardamos los datos del usuario
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
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
        catchError(err => of(err.error.msg))
      )

  }

  validarToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!
          }
          return resp.ok!;
        }),
        catchError(err => of(false))
      )
  }

  logOut() {
    localStorage.removeItem('token')
  }
}

