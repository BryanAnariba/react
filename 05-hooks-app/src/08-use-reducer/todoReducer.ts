import { TodoActionType } from "./enums";
import { Action, Todo } from "./interfaces";

export const todoReducer = (state: Todo[] = [], action: Action | null) => {
  switch (action?.type) {
    case TodoActionType.CREATE:
      return [...state, action!.payload];
    case TodoActionType.REMOVE:
      return state.filter(todo => todo.id !== action!.payload!.id);
    case TodoActionType.MARK_AS_DONE:
      return state.map(todo => {
        if (todo.id === action.payload!.id) {
          return {
            ...todo,
            done: !todo.done,
          }
        }
        return todo;
      });
    default:
      return state;
  }
}