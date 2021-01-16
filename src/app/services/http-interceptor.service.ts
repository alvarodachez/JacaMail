import { Injectable } from '@angular/core';
import { AutenticadorJwtService } from '../../../../AngularMailClienteModulo6/src/app/services/autenticador-jwt.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  urlWebApi = 'http://localhost:8080';

  constructor(private autenticadorJwt: AutenticadorJwtService) { }


  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    
    const token: string = this.autenticadorJwt.recuperaJWT();
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8') });
    }

    
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    
    const newUrl = { url: this.urlWebApi + request.url };
    request = Object.assign(request, newUrl);
    const newUrlWithParams = { urlWithParams: this.urlWebApi + request.urlWithParams };
    request = Object.assign(request, newUrlWithParams);

    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          
        }
        return event;
      }),
      finalize(() => {
      })
    );
  }
}
