import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  //   { path: '', redirectTo: '/home', pathMatch: 'full' },
  //   { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'todo', component: TodoListComponent },
  { path: '**', component: PageNotFoundComponent },
];
