import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { selectAuthUser } from '../../auth/store/auth.selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store = inject(Store<AppState>);

  return authService.isLoggedIn().pipe(
    take(1), // Ogranicza ilośc zaputań
    switchMap((resp) => {
      const isLoggedIn = resp.message;

      if (isLoggedIn) {
        return store.select(selectAuthUser).pipe(
          map((user) => {
            if (user && user.role === 'ADMIN') {
              return true;
            }

            return false;
          }),
        );
      }

      return of(false);
    }),
    catchError((err) => {
      return of(false);
    }),
  );
};
