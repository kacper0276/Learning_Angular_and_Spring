import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() errorMessage!: string; // Input z rodzica do dziecka, Output z dziecka do rodzica
  @Output() clearMessage = new EventEmitter<void>();
  @Input() showButton = false;

  clearErrorMessage() {
    this.clearMessage.emit();
  }
}
