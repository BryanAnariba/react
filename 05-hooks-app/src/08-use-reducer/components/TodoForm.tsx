import { Todo } from "../interfaces";
import { useForm } from "../../hooks";

interface TodoInitialState {
  description: string;
}

interface TodoFormProps {
  onSendNewTodoToTodoApp: (form: Todo) => void;
}

const initialFormState: TodoInitialState = {description: ''};

export const TodoForm = ({onSendNewTodoToTodoApp}: TodoFormProps) => {

  const {formState, onInputChange, onReset} = useForm(initialFormState);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.description.trim().length === 0) return;
    const newTodo: Todo = {
      id: new Date().getTime(),
      description: formState.description,
      done: false,
    };
    onSendNewTodoToTodoApp(newTodo);
    onReset();
  }

  return (
    <>
      <h4>Add Todo</h4>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="What do you want to do?" 
            className="form-control" 
            name="description"
            value={formState.description}
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-outline-primary mt-2">
            Add
          </button>
        </div>
      </form>
    </>
  )
}
