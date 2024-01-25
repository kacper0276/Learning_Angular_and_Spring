import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authMatchGuard: CanMatchFn = (route, segments) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  return isLoggedIn ? isLoggedIn : inject(Router).createUrlTree(['/logowanie']);
};
