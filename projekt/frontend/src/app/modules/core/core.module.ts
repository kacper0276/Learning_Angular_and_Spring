import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { errorHandlingInterceptor } from './interceptors/error-handling.interceptor';

@NgModule({
  declarations: [HeaderComponent],
  imports: [RouterLink, RouterLinkActive, SharedModule, HttpClientModule],
  exports: [HeaderComponent],
  providers: [provideHttpClient(withInterceptors([errorHandlingInterceptor]))],
})
export class CoreModule {}
