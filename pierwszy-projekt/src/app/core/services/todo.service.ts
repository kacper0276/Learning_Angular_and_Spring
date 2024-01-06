import { Injectable } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  //   private _todos: Todo[] = JSON.parse(localStorage.getItem('todos')!) ?? [];
  private _todos: Todo[] = [];
  todoChanged = new Subject<Todo[]>();

  constructor() {}

  log() {
    console.log('Test');
  }

  public get todos() {
    return this._todos.slice(); // Przez slice zwracamy nową referencję, bez slice cały czas tą samą referencję zwracamu
  }

  public set todos(arrTodos: Todo[]) {
    this._todos = [...arrTodos];
    this.todoChanged.next(this.todos);
  }

  getTodo(index: number): Todo | undefined {
    return this.todos[index];
  }

  addTodo(name: string): void {
    // this._todos.push({ name, isComplete: false });
    this.saveToLocalStorage();
    this.todoChanged.next(this.todos);
  }

  deleteTodo(i: number): void {
    this._todos = this.todos.filter((todo: Todo, index: number) => index !== i);
    this.saveToLocalStorage();
    this.todoChanged.next(this.todos);
  }

  changeTodoStatus(index: number): void {
    this._todos[index] = {
      ...this.todos[index],
      isComplete: !this.todos[index].isComplete,
    };
    this.saveToLocalStorage();
    this.todoChanged.next(this.todos);
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
