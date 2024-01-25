import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { Client } from '../../../../core/models/client.model';
import { ClientsService } from '../../../../core/services/clients.service';
import { Router } from '@angular/router';
import { ClientFormComponent } from '../../client-form/client-form.component';

@Component({
    selector: 'app-edit-client-dialog',
    templateUrl: './edit-client-dialog.component.html',
    styleUrl: './edit-client-dialog.component.scss',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        ClientFormComponent,
    ],
})
export class EditClientDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private clientsService: ClientsService,
    private router: Router,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
