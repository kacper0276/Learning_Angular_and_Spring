import { Action, createReducer } from '@ngrx/store';
import { Todo } from '../../shared/interfaces/todo.interface';

export interface TodoListState {
  todos: Todo[];
}

const initialState: TodoListState = {
  todos: [
    {
      id: 1,
      isComplete: true,
      name: 'Umyj naczynia',
    },
    {
      id: 2,
      isComplete: false,
      name: 'Wyjdź z psem',
    },
    {
      id: 3,
      isComplete: false,
      name: 'Jakieś zadanie',
    },
  ],
};

const _todoListReducer = createReducer(initialState);

export function todoListReducer(
  state: TodoListState | undefined,
  action: Action
) {
  return _todoListReducer(state, action);
}
