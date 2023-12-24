import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { AlertComponent } from '../shared/components/alert/alert.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: Todo[] = [];
  errorMessage = "";

  addTodo(todo: string): void {
    if(todo.length <= 3) {
      this.errorMessage = 'Zadanie powinno mieć conajmniej 4 znaki';
      return;
    }

    this.todos.push({ name: todo, isComplete: false });
    console.log("Aktualna lista todo: ", this.todos)
  }

  changeTodoStatus(todo: Todo): void {
    todo.isComplete = !todo.isComplete;    
  }

  clearErrorMessage(): void {
    this.errorMessage = "";
  }
}
