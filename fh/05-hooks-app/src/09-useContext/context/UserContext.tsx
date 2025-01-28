import { createContext, Dispatch, SetStateAction } from "react";

export interface UserContextInitState {
  user: User | null;
  setUser:  Dispatch<SetStateAction<User | null>>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const userInitialState: UserContextInitState = {
  user: null,
  setUser: () => {}
}

export const UserContext = createContext(userInitialState);