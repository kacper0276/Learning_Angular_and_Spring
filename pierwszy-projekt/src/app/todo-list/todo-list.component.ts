import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, AlertComponent, AddTodoFormComponent, TodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent
//  implements AfterViewInit, AfterViewChecked 
 {
  // @ViewChild(TodoComponent) todoComp!: TodoComponent; // Złapie jeden selektor
  // @ViewChildren(TodoComponent) todoComps!: TodoComponent; // Złapie kilka selektorów
  todos: Todo[] = [];
  errorMessage = "";

  // ngAfterViewInit(): void {
  //   console.log(this.todoComp);
  // }

  // ngAfterViewChecked(): void {
  //   console.log(this.todoComp);
  // }

  addTodo(todo: string): void {
    if(todo.length <= 3) {
      this.errorMessage = 'Zadanie powinno mieć conajmniej 4 znaki';
      return;
    }

    this.todos.push({ name: todo, isComplete: false });
    console.log("Aktualna lista todo: ", this.todos)
  }

  clearErrorMessage(): void {
    this.errorMessage = "";
  }

  deleteTodo(i: number): void {
    this.todos = this.todos.filter((todo: Todo, index: number) => index !== i);
  }

  changeTodoStatus(index: number): void {
    this.todos[index] = {
      ...this.todos[index],
      isComplete: !this.todos[index].isComplete
    }
  }
}
