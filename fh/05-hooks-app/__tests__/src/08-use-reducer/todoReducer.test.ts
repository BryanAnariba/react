import { TodoActionType } from '../../../src/08-use-reducer/enums';
import { Action, Todo } from '../../../src/08-use-reducer/interfaces/todo.interface';
import { todoReducer } from '../../../src/08-use-reducer/todoReducer';

describe('Testing in todoReducer.ts', () => {
  const todoInitialState: Todo[] = [{
    id: 1,
    description: 'Demo Todo',
    done: false,
  }];

  test('Should to return the initial state.', () => {
    const newState = todoReducer(todoInitialState, null);
    expect(newState).toBe(todoInitialState);
  });

  test('Should to add a new todo.', () => {
    const action: Action = {
      payload: {
        id: 2,
        description: 'Demo todo two',
        done: false
      },
      type: TodoActionType.CREATE,
    };

    const newState = todoReducer(todoInitialState, action);
    expect(newState.length).toBe(2);
    expect(newState).toContain(action.payload);
  });

  test('Should to remove a todo.', () => {
    const action: Action = {
      payload: {
        id: 1,
        description: 'Demo Todo',
        done: false,
      },
      type: TodoActionType.REMOVE
    }
    const newState = todoReducer(todoInitialState, action);
    expect(newState.length).toBe(0);
  });

  test('Should to mark as done the todo.', () => {
    const action: Action = {
      payload: {
        id: 1,
        description: 'Demo Todo',
        done: false,
      },
      type: TodoActionType.MARK_AS_DONE
    }
    const newState = todoReducer(todoInitialState, action);
    expect(newState).toContainEqual({
      id: 1,
      description: 'Demo Todo',
      done: true
    });
  });
});