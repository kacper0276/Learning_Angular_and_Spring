import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/products/product/product.component';

@NgModule({
  declarations: [ProductsComponent, ProductComponent],
  imports: [SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
