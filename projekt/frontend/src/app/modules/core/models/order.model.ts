import { Address } from './address.model';
import { Customer } from './customer.model';
import { PostDelivery } from './delivery.model';

export interface PostOrder {
  customerDetails: Customer;
  address: Address;
  deliver: PostDelivery;
}
