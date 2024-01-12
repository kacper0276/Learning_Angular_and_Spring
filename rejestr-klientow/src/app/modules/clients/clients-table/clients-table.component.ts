import { AfterViewInit, Component } from '@angular/core';
import { ClientsService } from '../../core/services/clients.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
})
export class ClientsTableComponent implements AfterViewInit {
  constructor(private clientsService: ClientsService) {}

  ngAfterViewInit(): void {
    this.clientsService.getClients().subscribe({
      next: (clients) => {
        console.log(clients);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
