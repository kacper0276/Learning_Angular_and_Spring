import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';

      if (error.status >= 400 && error.status < 500) {
        errorMsg = error.error.message || 'Wystąpił błąd. Spróbuj ponownie.';
      } else {
        errorMsg = 'Wystąpił błąd. Spróbuj ponownie.';
      }

      return throwError(errorMsg);
    }),
  );
};
