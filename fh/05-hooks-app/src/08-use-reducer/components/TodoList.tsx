import { Todo } from "../interfaces"
import { TodoListItem } from "./TodoListItem";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (todo: Todo) => void;
  onToggleTodo: (todo: Todo) => void;
}

export const TodoList = ({ todos, onDeleteTodo, onToggleTodo }: TodoListProps) => {

  return (
    <ul className="list-group">
      {
        todos.map(todo => (
          <TodoListItem  key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo}/>
        ))
      }
    </ul>
  )
}
