import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import * as AuthActions from '../app/modules/auth/store/auth.actions';
import { BasketService } from './modules/core/services/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private store: Store<AppState>,
    private basketService: BasketService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());

    this.basketService.getBasketProducts().subscribe({
      error: () => {
        // do nothing
      },
    });
  }
}
