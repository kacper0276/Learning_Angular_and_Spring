import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { StoreModule, provideStore } from '@ngrx/store';
import { todoListReducer } from './todo-list/store/todo-list.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(),
    importProvidersFrom(
      StoreModule.forRoot({ todos: todoListReducer }),
      EffectsModule.forRoot([])
    ),
    provideEffects(),
  ],
};
