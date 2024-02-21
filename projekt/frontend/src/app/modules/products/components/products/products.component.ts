import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { PrimitiveProduct } from '../../../core/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  products: PrimitiveProduct[] = [];
  totalCount = 0;
  errorMessage: string | null = null;
  sub = new Subscription();

  searchControl = new FormControl<string>('');
  filteredOptions!: Observable<PrimitiveProduct[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(), // Jeśli wartośc się nie zmieniła to nie ma ponownego zapytania
      switchMap((value) => this.productsService.getProducts(1, 10, value)),
      map(({ products }) => {
        return [...products];
      }),
    );
  }

  ngAfterViewInit(): void {
    // this.productsService.getProducts().subscribe({
    //   next: ({ products, totalCount }) => {
    //     this.products = [...products];
    //     this.totalCount = totalCount;
    //   },
    // });

    this.route.queryParamMap
      .pipe(
        switchMap((queryMap) => {
          const pageIndex = queryMap.get('strona')
            ? Number(queryMap.get('strona'))
            : 1;
          const itemsPerPage = queryMap.get('limit')
            ? Number(queryMap.get('limit'))
            : this.paginator.pageSize;

          const productName = queryMap.get('nazwa')
            ? queryMap.get('nazwa')
            : null;

          return this.productsService.getProducts(
            pageIndex,
            itemsPerPage,
            productName,
          );
        }),
        map(({ products, totalCount }) => {
          this.totalCount = totalCount;
          this.products = [...products];
        }),
      )
      .subscribe({
        error: (err) => {
          this.errorMessage = err;
        },
      });

    this.sub.add(
      this.paginator.page.subscribe({
        next: () => {
          const pageIndex = this.paginator.pageIndex + 1;
          const itemsPerPage = this.paginator.pageSize;

          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
              strona: pageIndex,
              limit: itemsPerPage,
              nazwa: encodeURIComponent(this.searchControl.value as string),
            },
          });
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  searchProducts() {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        strona: this.paginator.pageIndex + 1,
        limit: this.paginator.pageSize,
        nazwa: encodeURIComponent(this.searchControl.value as string),
      },
    });
  }
}
