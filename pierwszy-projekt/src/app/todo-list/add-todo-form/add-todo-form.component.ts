import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.css',
})
export class AddTodoFormComponent {
  @Output() addTodo = new EventEmitter<string>();
  todoName = '';

  addNewTodo() {
    this.addTodo.emit(this.todoName);
  }
}
