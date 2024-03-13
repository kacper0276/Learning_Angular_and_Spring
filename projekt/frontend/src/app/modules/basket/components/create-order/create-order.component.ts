import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { DeliveryFormComponent } from './delivery-form/delivery-form.component';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent implements OnInit {
  @ViewChild(CustomerFormComponent) customerFormComp!: CustomerFormComponent;
  @ViewChild(AddressFormComponent) addressFormComp!: AddressFormComponent;
  @ViewChild(DeliveryFormComponent) deliveryFormComp!: DeliveryFormComponent;

  // Dzięki location możemy odbierać state który wysyłamy
  constructor(
    private location: Location,
    private router: Router,
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
      // wykonywac zapytanie http - dodawanie nowego zamowienia
    }
  }
}
