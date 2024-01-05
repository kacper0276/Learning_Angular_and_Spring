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

  ngOnInit(): void {
    // this.id = +this.route.snapshot.params['id'];
    // this.todo = this.todoService.getTodo(this.id);

    // this.route.params.subscribe((params) => {
    //   console.log(params);
    //   this.id = +params['id'];
    //   this.todo = this.todoService.getTodo(this.id);
    // });

    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.todo = this.todoService.getTodo(this.id);
    });

    this.route.queryParams.subscribe((queryParams) => {
      console.log(queryParams);
    });
  }

  navigateToNextTodo() {
    this.router.navigate(['/todo', this.id + 1]);
  }
}
