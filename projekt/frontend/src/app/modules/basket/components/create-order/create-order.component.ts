import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent implements OnInit {
  errorMsg: string | null = null;

  @ViewChild(CustomerFormComponent) customerFormComp!: CustomerFormComponent;
  @ViewChild(AddressFormComponent) addressFormComp!: AddressFormComponent;
  @ViewChild(DeliveryFormComponent) deliveryFormComp!: DeliveryFormComponent;

  // Dzięki location możemy odbierać state który wysyłamy
  constructor(
    private location: Location,
    private router: Router,
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    const locationState = this.location.getState() as {
      summaryPrice: undefined | number;
      navigationId: number;
    };

    if (!locationState.summaryPrice) {
      this.router.navigate(['']);
    }
  }

  order() {
    if (
      this.customerFormComp.customerForm.valid &&
      this.addressFormComp.addressForm.valid &&
      this.deliveryFormComp.deliveryForm.valid
    ) {
      this.ordersService
        .addOrder({
          address: this.addressFormComp.addressForm.getRawValue(),
          deliver: this.deliveryFormComp.deliveryForm.getRawValue(),
          customerDetails: this.customerFormComp.customerForm.getRawValue(),
        })
        .subscribe({
          error: (err) => {
            this.errorMsg = err;
          },
        });
    }
  }
}
