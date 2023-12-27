import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class TodoComponent implements OnChanges {
  @Input() todo!: Todo;
  @Input() i!: number;
  @Output() delete = new EventEmitter<void>();
  openModal = false;

  changeTodoStatus(todo: Todo): void {
    todo.isComplete = !todo.isComplete;    
  }

  toogleModal(): void {
    this.openModal = !this.openModal;
  }

  deleteTodo(): void {
      this.delete.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }
}
