import { ReactNode, useReducer } from "react"
import { AuthContext } from "./AuthContext";
import { authReducer, AuthReducerAction, AuthReducerInitialState } from "./authReducer";
import { AuthEnum } from "../enums";

export interface UserProviderProps {
  children: ReactNode;
}

const authReducerInitialState: AuthReducerInitialState = {
  logged: false,
  name: '',
}

const init = (): AuthReducerInitialState => {
  const authReducerInitialState: AuthReducerInitialState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : {logged: false, name: ''};
  return authReducerInitialState;
}

export const AuthProvider = ({ children }: UserProviderProps) => {
  const [authState, dispatch] = useReducer(authReducer, authReducerInitialState, init);

  const logIn = (name: string): void => {
    const action: AuthReducerAction = {
      type: AuthEnum.AUTH_LOGIN,
      payload: { logged: true, name: name },
    };
    localStorage.setItem('user', JSON.stringify(action.payload));
    dispatch(action);
  }

  const logOut = (): void => {
    const action: AuthReducerAction = {
      type: AuthEnum.AUTH_LOGOUT,
      payload: { logged: false, name: '' },
    };
    localStorage.removeItem('user');
    dispatch(action);
  }

  return (
    <AuthContext.Provider value={{ 
      authState, 
      logIn, 
      logOut 
    }}>
      {children}
    </AuthContext.Provider>
  )
}
