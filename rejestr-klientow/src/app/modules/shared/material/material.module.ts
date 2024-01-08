import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  // imports: [MatToolbarModule, MatButtonModule], - importujemy jeśli używamy w naszym module inaczej nie musimy
  exports: [MatToolbarModule, MatButtonModule],
})
export class MaterialModule {}
