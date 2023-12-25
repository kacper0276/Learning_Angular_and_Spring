import { Component, Input } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Input() i!: number;
  openModal = false;

  changeTodoStatus(todo: Todo): void {
    todo.isComplete = !todo.isComplete;    
  }

  toogleModal(): void {
    this.openModal = !this.openModal;
  }
}
