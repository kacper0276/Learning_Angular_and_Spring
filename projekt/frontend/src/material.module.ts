import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatAutocompleteModule,
  ],
})
export class MaterialModule {}
