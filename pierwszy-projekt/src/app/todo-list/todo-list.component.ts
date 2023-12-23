import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: string[] = [];

  addTodo(todo: string): void {
    if(todo.length <= 3) {
      alert('Zadanie powinno mieć conajmniej 4 znaki')
      return;
    }

    this.todos.push(todo);
    console.log("Aktualna lista todo: ", this.todos)
  }
}
