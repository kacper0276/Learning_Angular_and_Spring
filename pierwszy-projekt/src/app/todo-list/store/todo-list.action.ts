import { createAction, props } from '@ngrx/store';
import { Todo } from '../../shared/interfaces/todo.interface';

export const addTodo = createAction(
  '[Todo List] Add Todo',
  props<{ todo: Todo }>()
);
