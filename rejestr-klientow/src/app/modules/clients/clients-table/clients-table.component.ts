import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClientsService } from '../../core/services/clients.service';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../core/models/client.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
})
export class ClientsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['lp', 'firstname', 'surname', 'email', 'buttons'];
  dataSource!: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientsService: ClientsService) {}

  ngAfterViewInit(): void {
    this.clientsService.getClients().subscribe({
      next: (clients) => {
        this.dataSource = new MatTableDataSource<Client>(clients);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
