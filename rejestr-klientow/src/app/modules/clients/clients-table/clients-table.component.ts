import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClientsService } from '../../core/services/clients.service';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../../core/models/client.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, merge, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.scss',
})
export class ClientsTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'lp',
    'firstname',
    'surname',
    'email',
    'buttons',
  ];
  dataSource!: MatTableDataSource<Client>;
  totalCount = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientsService: ClientsService) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const pageIndex = this.paginator.pageIndex + 1;
          const itemsPerPage = this.paginator.pageSize;
          const sortDirection = this.sort.direction;
          const sortColumnName = this.sort.active;

          return this.clientsService.getClients(
            pageIndex,
            itemsPerPage,
            sortDirection,
            sortColumnName,
          );
        }),
        map((data) => {
          this.totalCount = data.totalCount;
          return data.clients;
        }),
      )
      .subscribe(
        (clients) =>
          (this.dataSource = new MatTableDataSource<Client>(clients)),
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
