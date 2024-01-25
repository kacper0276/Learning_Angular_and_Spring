import { Routes } from '@angular/router';
import { authMatchGuard } from './modules/core/guards/auth-match.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'klienci',
    loadChildren: () =>
      import('./modules/clients/clients-routing').then((m) => m.ROUTES_CLIENTS),
    canMatch: [authMatchGuard],
  },
];
