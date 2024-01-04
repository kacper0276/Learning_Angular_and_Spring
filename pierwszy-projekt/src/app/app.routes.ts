import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'todo', component: TodoListComponent },
];
