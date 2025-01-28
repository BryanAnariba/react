import { AuthEnum } from "../enums"

export interface AuthReducerInitialState {
  logged: boolean;
  name: string;
}

export interface AuthReducerAction {
  type: AuthEnum,
  payload: AuthReducerInitialState
}

export const authReducer = (state: AuthReducerInitialState, action: AuthReducerAction): AuthReducerInitialState => {
  switch (action.type) {
    case AuthEnum.AUTH_LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case AuthEnum.AUTH_LOGOUT:
      return {
        ...state,
        logged: false,
        name: '',
      };
    default:
      return state;
  }
}