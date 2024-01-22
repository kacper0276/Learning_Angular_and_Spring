import { CanDeactivateFn } from '@angular/router';
import { ClientFormComponent } from '../../clients/components/client-form/client-form.component';

export const clientFormDeactivateGuard: CanDeactivateFn<ClientFormComponent> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  if (component.clientForm.dirty) {
    return window.confirm('Czy na pewno chcesz opuścić ten widok?');
  } else {
    return true;
  }
};
