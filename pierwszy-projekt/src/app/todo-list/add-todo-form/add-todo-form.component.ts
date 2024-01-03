import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-todo-form',
  standalone: true,
  imports: [FormsModule, AlertComponent, CommonModule],
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.css',
})
export class AddTodoFormComponent implements AfterViewInit {
  @Output() addTodo = new EventEmitter<string>();
  @ViewChild('form') todoForm!: NgForm;
  todoName = '';

  ngAfterViewInit(): void {
    console.log(this.todoForm);
  }

  addNewTodo(form: NgForm) {
    console.log(form);
    this.addTodo.emit(this.todoName);
  }
}
