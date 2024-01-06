import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/interfaces/todo.interface';
import { TodoService } from '../core/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TodoApiService } from '../core/services/todo-api.service';
import { switchMap } from 'rxjs';
import { AlertComponent } from '../shared/components/alert/alert.component';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css',
})
export class TodoDetailsComponent implements OnInit {
  // console.log(this.location.getState());
  todo: Todo | undefined;
  id!: number;
  errorMessage!: string;

  constructor(
    private todoService: TodoService,
    private todoApiService: TodoApiService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
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
      // this.todo = this.todoService.getTodo(this.id);
    });

    this.route.paramMap
      .pipe(
        switchMap((params) =>
          this.todoApiService.getTodo(Number(params.get('id')))
        )
      )
      .subscribe({
        next: (todo) => (this.todo = { ...todo }),
        error: (err) => {
          if (err.status === 404) {
            this.errorMessage = 'Nie ma zadania o podanym  numerze id.';
          } else {
            this.errorMessage = 'Wystąpił błąd. Spróbuj ponownie';
          }
        },
      });

    // console.log(this.location.getState());

    this.route.queryParams.subscribe((queryParams) => {
      // console.log(queryParams);
    });
  }

  navigateToNextTodo() {
    this.router.navigate(['/todo', this.id + 1]);
  }

  navigateBack() {
    this.location.back();
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}
