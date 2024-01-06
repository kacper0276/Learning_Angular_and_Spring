import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { AlertComponent } from '../shared/components/alert/alert.component';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from '../core/services/todo.service';
import { TestService } from '../core/services/test.service';
import { Subscription } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TodoApiService } from '../core/services/todo-api.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    AddTodoFormComponent,
    TodoComponent,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
//  implements AfterViewInit, AfterViewChecked
export class TodoListComponent implements OnInit, OnDestroy {
  // @ViewChild(TodoComponent) todoComp!: TodoComponent; // Złapie jeden selektor
  // @ViewChildren(TodoComponent) todoComps!: TodoComponent; // Złapie kilka selektorów

  // ngAfterViewInit(): void {
  //   console.log(this.todoComp);
  // }

  // ngAfterViewChecked(): void {
  //   console.log(this.todoComp);
  // }

  // Logiki nie wrzucamy do konstruktora
  constructor(
    private todoService: TodoService,
    // private testService: TestService
    private todoApiService: TodoApiService
  ) {}
  // Inny sposób
  // todoService = inject(TodoService);
  todos: Todo[] = this.todoService.todos;
  errorMessage = '';
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.todoService.todoChanged.subscribe({
      next: (arrTodos) => (this.todos = arrTodos),
    });

    if (this.todos.length === 0) {
      this.todoApiService.getTodos().subscribe({
        next: (todos) => {
          // this.todos = todos;
        },
      });
    }
  }

  addTodo(todo: string): void {
    if (todo.length <= 3) {
      this.errorMessage = 'Zadanie powinno mieć conajmniej 4 znaki';
      return;
    }

    this.todoService.addTodo(todo);
    // this.todos = this.todoService.todos;
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  deleteTodo(i: number): void {
    this.todoService.deleteTodo(i);
    // this.todos = this.todoService.todos;
  }

  changeTodoStatus(index: number): void {
    this.todoService.changeTodoStatus(index);
    // this.todos = this.todoService.todos;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
