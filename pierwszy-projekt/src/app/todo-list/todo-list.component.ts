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
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as TodoListActions from './store/todo-list.action';
import {
  selectTodoListTodos,
  selectTodoListTodosState,
} from './store/todo-list.selector';

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
    private todoApiService: TodoApiService,
    private store: Store<AppState>
  ) {}
  // Inny sposób
  // todoService = inject(TodoService);
  // todos: Todo[] = this.todoService.todos;
  todos: Todo[] = [];
  errorMessage: null | string = '';
  sub!: Subscription;

  ngOnInit(): void {
    // this.sub = this.todoService.todoChanged.subscribe({
    //   next: (arrTodos) => (this.todos = arrTodos),
    // });
    this.store.dispatch(TodoListActions.fetchTodos());

    this.sub = this.store.select(selectTodoListTodosState).subscribe({
      next: ({ todos, errorMsg, loading }) => {
        console.log(todos);
        this.todos = [...todos];
        this.errorMessage = errorMsg;
        // loading
      },
    });
    // Lub
    // this.store.pipe(select(selectTodoListTodos))
  }

  addTodo(todo: string): void {
    // if (todo.length <= 3) {
    //   this.errorMessage = 'Zadanie powinno mieć conajmniej 4 znaki';
    //   return;
    // }
    // this.todoApiService.postTodo({ name: todo, isComplete: false }).subscribe({
    //   // next: (value) => {
    //   //   console.log(value);
    //   // },
    //   error: (err) => {
    //     this.errorMessage = 'Wystąpił błąd. Spróbuj ponownie.';
    //   },
    // });
    // this.todoService.addTodo(todo);
    // this.todos = this.todoService.todos;
    // const id = this.todos[this.todos.length - 1].id + 1;
    this.store.dispatch(
      TodoListActions.addTodo({ todo: { name: todo, isComplete: false } })
    );
  }

  clearErrorMessage(): void {
    this.errorMessage = '';
  }

  deleteTodo(id: number): void {
    // this.todoApiService.deleteTodo(id).subscribe({
    //   error: (err) => (this.errorMessage = 'Wystąpił błąd. Spróbuj ponownie.'),
    // });
    // this.todoService.deleteTodo(id);
    // this.todos = this.todoService.todos;
    this.store.dispatch(TodoListActions.deleteTodo({ id }));
  }

  changeTodoStatus(id: number, todo: Todo): void {
    // this.todoService.changeTodoStatus(id);
    // this.todoApiService
    //   .patchTodo(id, { isComplete: !todo.isComplete })
    //   .subscribe({
    //     error: (err) =>
    //       (this.errorMessage = 'Wystąpił błąd. Spróbuj ponownie.'),
    //   });
    // this.todos = this.todoService.todos;

    this.store.dispatch(TodoListActions.changeTodoStatus({ id }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
