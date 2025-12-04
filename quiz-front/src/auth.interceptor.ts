import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token'); // ili localStorage
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.replace(/"/g, '')}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
