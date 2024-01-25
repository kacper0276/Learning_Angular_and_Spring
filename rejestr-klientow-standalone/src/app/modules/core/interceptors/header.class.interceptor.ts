import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HeaderClassInterseptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const newReq = req.clone({
      setHeaders: {
        'X-Test': 'test',
      },
    });

    return next.handle(newReq);
  }
}
