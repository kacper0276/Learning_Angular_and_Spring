import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authMatchGuard } from './modules/core/guards/auth-match.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home-routing').then((m) => m.ROUTES_HOME),
  },
  {
    path: 'klienci',
    loadChildren: () =>
      import('./modules/clients/clients-routing').then((m) => m.ROUTES_CLIENTS),
    canMatch: [authMatchGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
