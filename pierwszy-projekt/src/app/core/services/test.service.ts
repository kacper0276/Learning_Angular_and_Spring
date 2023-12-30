import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private todoService: TodoService) {
    this.todoService.log();
   }
}
