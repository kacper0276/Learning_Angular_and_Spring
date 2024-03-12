import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/models/product.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  quantityControl = new FormControl(1);
  product: Product | null = null;
  htmlContent: null | SafeHtml = null;
  parameters: { [key: string]: string } | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((paramMap) => {
          const [name, date] = (paramMap.get('id') as string).split('-');
          return this.productsService.getProduct(name, date);
        }),
      )
      .subscribe({
        next: (product) => {
          this.product = { ...product };
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(
            product.descHtml,
          );
          try {
            this.parameters = JSON.parse(product.parameters);
          } catch (e) {
            this.parameters = null;
          }
        },
      });
  }

  addToBasket() {
    console.log(this.quantityControl.value);
  }
}
