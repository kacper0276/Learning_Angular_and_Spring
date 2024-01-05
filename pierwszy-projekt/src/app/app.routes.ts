import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { ChildAComponent } from './todo-list/child-a/child-a.component';
import { ChildBComponent } from './todo-list/child-b/child-b.component';

export const routes: Routes = [
  //   { path: '', redirectTo: '/home', pathMatch: 'full' },
  //   { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'todo',
    component: TodoListComponent,
    title: 'Dodaj zadanie!',
    children: [
      { path: 'child-a', component: ChildAComponent },
      { path: 'child-b', component: ChildBComponent },
    ],
  },
  {
    path: 'todo/:id',
    component: TodoDetailsComponent,
    title: 'Szczegóły zadania',
  },
  { path: '**', component: PageNotFoundComponent, title: 'Page not found' },
];
