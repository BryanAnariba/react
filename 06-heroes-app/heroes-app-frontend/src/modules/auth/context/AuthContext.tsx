import { createContext } from "react"
import { AuthReducerInitialState } from "./authReducer";

interface AuthContextInitialState {
  authState: AuthReducerInitialState,
  logIn: (name: string) => void;
  logOut: () => void;
}

export const AuthContext = createContext({} as AuthContextInitialState);