import { Component, Input } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  @Input() todo!: Todo;
  @Input() i!: number;

  changeTodoStatus(todo: Todo): void {
    todo.isComplete = !todo.isComplete;    
  }
}
