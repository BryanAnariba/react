
export interface InitialState {
  id: string;
  description: string;
  done: boolean;
}

export interface Action {
  type: string;
  payload: any;
}

export const todoReducer = (initialState: InitialState[] = [], action: Action) => {
  switch (action.type) {
    case 'ABC':
      throw new Error('Action.type ' + action.type + ' not implemented yet.');
    default:
      return initialState;
  }
}