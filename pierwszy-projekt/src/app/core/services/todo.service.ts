import { Injectable } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todos: Todo[] = JSON.parse(localStorage.getItem('todos')!) ?? [];

  constructor() { }

  log() {
    console.log('Test');
  }

  public get todos() {
    return this._todos.slice(); // Przez slice zwracamy nową referencję, bez slice cały czas tą samą referencję zwracamu
  }

  addTodo(name: string): void {
    this._todos.push({ name, isComplete: false });
    this.saveToLocalStorage();
  }

  deleteTodo(i: number): void {
    this._todos = this.todos.filter((todo: Todo, index: number) => index !== i);
    this.saveToLocalStorage();
  }

  changeTodoStatus(index: number): void {
    this._todos[index] = {
      ...this.todos[index],
      isComplete: !this.todos[index].isComplete
    }
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
