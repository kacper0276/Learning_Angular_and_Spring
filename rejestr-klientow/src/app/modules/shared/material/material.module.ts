import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  // imports: [MatToolbarModule, MatButtonModule], - importujemy jeśli używamy w naszym module inaczej nie musimy
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
