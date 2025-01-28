interface Todo {
  id: number;
  todo: string;
  done: boolean;
}

interface Actions {
  type: string;
  payload?: Todo;
}

const initialState: Todo[] = [{ id: 1, todo: 'Recolectar la piedra del Alma', done: false }];

const todoReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.payload];
    default:
      return state;
  }
}

const newTodo: Todo = { id: 2, todo: 'Pelear por la gema de strange', done: false };
const todoActions: Actions = {
  type: 'CREATE',
  payload: newTodo,
}

const todos = todoReducer(initialState, todoActions);

// Agregamos un todo nuevo
console.log(todos);



