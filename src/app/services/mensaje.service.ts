import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje, ListadoMensajes, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  public static readonly RECIBIDOS = 0;
  public static readonly ENVIADOS = 1;
  public static readonly SPAM = 2;
  public static readonly ARCHIVADOS = 3;

  constructor(private http: HttpClient) { }

  getListadoMensajes(tipo: number, pagina: number, lineasPorPagina: number): Observable<ListadoMensajes> {
    return this.http.get<ListadoMensajes>('/mensajes/listadoPorTipo?tipo=' + tipo + '&pagina=' + pagina + '&mensajesPorPagina=' + lineasPorPagina).pipe();
  }
  accionSobreMensajes(ids: number[], tipoAccion: number) {
    var dto = {
      'ids': ids,
      'tipoAccion': tipoAccion
    };
    return this.http.post<string>('/mensajes/accionSobreMensajes', dto);
  }
  enviarNuevoMensaje(destinatarios: Usuario[], asunto: string, cuerpo: string) {
    var idsDestinatarios: number[] = []; // Construyo un array vacío de tipo number
    // Para cada usuario recibido, tomo su "id" y lo agrego al array
    destinatarios.forEach(usuario => idsDestinatarios.push(usuario.id));
    // Construyo un objeto para enviar al servidor
    var dto = {
      'idsDestinatarios': idsDestinatarios,
      'asunto': asunto,
      'cuerpo': cuerpo
    };
    // realizo la petición y devuelvo el Observable
    return this.http.put<string>('/mensajes/nuevo', dto);
  }
}
