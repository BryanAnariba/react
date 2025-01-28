import { Todo } from "../interfaces"

interface TodoListItemProps {
  todo: Todo;
  onDeleteTodo: (todo: Todo) => void;
  onToggleTodo: (todo: Todo) => void;
}

export const TodoListItem = ({ todo, onDeleteTodo, onToggleTodo }: TodoListItemProps) => {

  return (
    <li className="list-group-item d-flex justify-content-between">
      <span 
        className={`align-self-center pointer ${todo.done ? 'text-decoration-line-through' : ''}`}
        onClick={() => onToggleTodo(todo)}
        aria-label="span"
      >
        {todo.description}
      </span>
      <button 
        className="btn btn-danger btn-sm"
        onClick={() => onDeleteTodo(todo)}
      >
        Delete
      </button>
    </li>
  )
}
