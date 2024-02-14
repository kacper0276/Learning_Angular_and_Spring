import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, take } from 'rxjs';

export const unauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    take(1), // Ogranicza ilośc zaputań
    map((resp) => {
      const isLoggedIn = resp.message;

      if (isLoggedIn) {
        router.navigate(['/']);
        return false;
      }

      return true;
    }),
    catchError((err) => {
      return of(true);
    }),
  );
};
