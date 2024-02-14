import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { PasswordRecoveryFormComponent } from './components/password-recovery-form/password-recovery-form.component';
import { unauthGuard } from '../core/guards/unauth.guard';

const routes: Routes = [
  {
    path: 'logowanie',
    component: LoginComponent,
    canActivate: [unauthGuard],
  },
  {
    path: 'rejestracja',
    component: RegisterComponent,
    canActivate: [unauthGuard],
  },
  {
    path: 'aktywuj/:uid',
    component: AccountActivationComponent,
  },
  {
    path: 'odzyskaj-haslo',
    component: PasswordRecoveryComponent,
  },
  {
    path: 'odzyskaj-haslo/:uid ',
    component: PasswordRecoveryFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
