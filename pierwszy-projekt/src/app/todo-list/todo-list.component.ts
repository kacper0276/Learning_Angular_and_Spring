import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: Todo[] = [];

  addTodo(todo: string): void {
    if(todo.length <= 3) {
      alert('Zadanie powinno mieć conajmniej 4 znaki')
      return;
    }

    this.todos.push({ name: todo, isComplete: false });
    console.log("Aktualna lista todo: ", this.todos)
  }
}
