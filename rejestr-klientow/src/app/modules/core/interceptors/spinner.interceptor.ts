import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
import { Observable, finalize } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerInterseptor implements HttpInterceptor {
  constructor(private spinnerSerivce: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.spinnerSerivce.showSpinner();

    return next.handle(req).pipe(
      // Służy do wywoływania funkcji gdy Observable się zakończy
      finalize(() => this.spinnerSerivce.hide()),
    );
  }
}
