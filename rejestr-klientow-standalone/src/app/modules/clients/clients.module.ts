import { NgModule } from '@angular/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';

import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientComponent } from './components/client/client.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { DeleteClientDialogComponent } from './components/client/delete-client-dialog/delete-client-dialog.component';
import { EditClientDialogComponent } from './components/client/edit-client-dialog/edit-client-dialog.component';
import { HighlightDirective } from '../shared/directives/highlight.directive';

@NgModule({
    imports: [ClientsRoutingModule, HighlightDirective, ClientsComponent,
    ClientsTableComponent,
    ClientComponent,
    ClientFormComponent,
    DeleteClientDialogComponent,
    EditClientDialogComponent],
    exports: [],
})
export class ClientsModule {}
