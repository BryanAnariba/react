import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { useTodos } from "./hooks";

export const TodoApp = (): JSX.Element => {
  const { doneTodos, allTodos, todos, handleDeleteTodo, onHandleDoneTodo, onSendNewTodoToTodoApp } = useTodos();

  return (
    <>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-sm-12">
            <h1>Todos App <small>Total: ({allTodos})</small><small>Pending: ({doneTodos})</small></h1>
            <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onToggleTodo={onHandleDoneTodo} />
          </div>
          <div className="col-lg-5 col-sm-12">
            <TodoForm onSendNewTodoToTodoApp={onSendNewTodoToTodoApp} />
          </div>
        </div>
      </div>
    </>
  )
}