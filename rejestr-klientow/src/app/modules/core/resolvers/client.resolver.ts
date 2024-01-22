import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import { Client } from '../models/client.model';

export const clientResolver: ResolveFn<Client> = (route, state) => {
  return inject(ClientsService).getClient(1);
};
