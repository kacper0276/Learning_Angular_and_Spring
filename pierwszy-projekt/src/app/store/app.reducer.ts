import { TodoListState } from '../todo-list/store/todo-list.reducers';

export interface AppState {
  todos: TodoListState;
}
