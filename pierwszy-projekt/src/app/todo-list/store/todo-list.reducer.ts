import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from '../../shared/interfaces/todo.interface';
import * as TodoListActions from './todo-list.action';

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

const _todoListReducer = createReducer(
  initialState,
  on(TodoListActions.addTodo, (state, action) => ({
    ...state,
    todos: state.todos.concat({ ...action.todo }),
  }))
);

export function todoListReducer(
  state: TodoListState | undefined,
  action: Action
) {
  return _todoListReducer(state, action);
}
