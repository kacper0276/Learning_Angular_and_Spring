import { Address } from './address.model';
import { Customer } from './customer.model';
import { PostDelivery } from './delivery.model';

export interface PostOrder {
  customerDetails: Customer;
  address: Address;
  deliver: PostDelivery;
}

export interface PostOrderResponse {
  status: {
    statusCode: string;
  };
  redirectUri: string;
  orderId: string;
  extOrderId: string;
}
