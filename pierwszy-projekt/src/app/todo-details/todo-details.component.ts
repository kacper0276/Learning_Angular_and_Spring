import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css',
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo | undefined;
  id!: number;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  navigateToNextTodo() {
    this.router.navigate(['/todo', this.id + 1]);
  }
}
