import { NgModule } from '@angular/core';

import { AdministrationRoutingModule } from './administration-routing.module';
import { CoreModule } from '../core/core.module';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { AddCategoryFormComponent } from './components/administrator/add-category-form/add-category-form.component';
import { ManageProductsComponent } from './components/administrator/manage-products/manage-products.component';

@NgModule({
  declarations: [
    AdministratorComponent,
    AddCategoryFormComponent,
    ManageProductsComponent,
  ],
  imports: [CoreModule, AdministrationRoutingModule],
})
export class AdministrationModule {}
