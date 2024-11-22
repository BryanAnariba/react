import { TodoActionType } from "../enums";

export interface Todo {
  id: number;
  description: string;
  done: boolean;
}

export interface Action {
  payload: Todo;
  type: TodoActionType;
}