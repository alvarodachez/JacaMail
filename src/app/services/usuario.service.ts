import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatosConJwt, Usuario } from '../interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioAutenticado: Usuario;
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<Usuario>();

  constructor(private http: HttpClient) { }

  ratificaPasswordUsuarioAutenticado(password: string): Observable<Object> {
    const dto = {
      'password': password
    };
    return this.http.post<Object>('/usuario/ratificaPassword', dto);
  }

  cambiaPasswordUsuarioAutenticado(nuevaPassword: string): Observable<Object> {
    const dto = {
      'password': nuevaPassword
    };
    return this.http.post<Object>('/usuario/modificaPassword', dto);
  }

  autenticaUsuario(usuario: string, password: string): Observable<DatosConJwt> {
    const md5 = new Md5();
    const jsonObject = {
      usuario: usuario,
      password: md5.appendStr(password).end().toString()
    };

    return this.http.post<DatosConJwt>('/usuario/autentica', jsonObject).pipe(
      tap(data => {
        console.log('Desde tap miro los datos recibidos ' + data["jwt"]);
      })
    );


  }

  getUsuarioAutenticado(incluirImagen: boolean = false): Observable<Usuario> {

    return this.http.get<Usuario>('/usuario/getAutenticado?imagen=' + incluirImagen).pipe(
      tap(usuarioAutenticado => {
        if ((this.usuarioAutenticado == null && usuarioAutenticado != null) || (this.usuarioAutenticado != null && usuarioAutenticado == null) || (this.usuarioAutenticado != null && usuarioAutenticado == null && this.usuarioAutenticado.id != usuarioAutenticado.id)) {
          this.emitirNuevoCambioEnUsuarioAutenticado();
          this.usuarioAutenticado = usuarioAutenticado;
        }
      })
    )
  }

  emitirNuevoCambioEnUsuarioAutenticado() {
    this.getUsuarioAutenticado(true).subscribe(usuarioAutenticado => {
      this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
    })
  }

  actualizaDatosUsuario(usuario: Usuario){
    return this.http.post<String>('/usuario/update',usuario).pipe(
      tap(strResult => {
        this.emitirNuevoCambioEnUsuarioAutenticado();
      })
    )
  }

  getUsuario(id: number, incluirImagen: boolean = false): Observable<Usuario> {
    var url= '/usuario/get?id=' + id + '&imagen=' + incluirImagen;
    return this.http.get<Usuario>(url);
  }

  filterUsuariosByNombreOrEmail(filtro: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('/usuario/filterByNombreOrEmail?filtro=' + filtro).pipe(
      tap(result => console.log(result))
    );
  }
}
