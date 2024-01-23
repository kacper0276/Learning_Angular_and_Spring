import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function headerInterceptor(
  request: HttpRequest<unknown>, // Requesta nie można mutować
  next: HttpHandlerFn,
) {
  const newReq = request.clone({
    setHeaders: {
      'X-Test': 'test',
    },
  });

  return next(request);
}
