import { useReducer } from "react";
import { InitialState, todoReducer } from "./todoReducer";



const initialState: InitialState[] = [
  {
    id: new Date().getTime().toString(),
    description: 'Recolectar la piedra del alma',
    done: false,
  },
  {
    id: new Date().getTime().toString(),
    description: 'Recolectar la piedra del doctor strange',
    done: false,
  },
]


export const TodoApp = () => {
  const [todos, dispatchTodo] = useReducer(todoReducer, initialState);
  return (
    <>
      <h1>Todo App</h1>
      <hr />
      <ul>
        <li>Item One</li>
        <li>Item Two</li>
        <li>Item Three</li>
      </ul>
    </>
  )
}