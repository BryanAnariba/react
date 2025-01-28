import { useEffect, useReducer } from "react";
import { TodoActionType } from "../enums";
import { Action, Todo } from "../interfaces";
import { todoReducer } from "../todoReducer";

const loadPreviusTodos = () => {
  if (!localStorage.getItem('todos')) return [];
  return JSON.parse(localStorage.getItem('todos')!);
}

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], loadPreviusTodos);

  const onSendNewTodoToTodoApp = (todo: Todo): void => {
    console.log('Todo receive from TodoForm component and ready to save: ', todo);
    const createTodoAction: Action = { type: TodoActionType.CREATE, payload: todo };
    dispatch(createTodoAction);
  }

  const handleDeleteTodo = (todo: Todo): void => {
    console.log('Todo ready to delete: ', todo);
    dispatch({
      type: TodoActionType.REMOVE,
      payload: todo,
    });
  }

  const onHandleDoneTodo = (todo: Todo): void => {
    console.log('Todo ready to make done: ', todo);
    dispatch({
      type: TodoActionType.MARK_AS_DONE,
      payload: todo,
    });
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return {
    todos,
    onSendNewTodoToTodoApp,
    handleDeleteTodo,
    onHandleDoneTodo,
    allTodos: todos.length,
    doneTodos: todos.filter(todo => todo.done === true).length,
  };
}