import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStatus, LoggedUser } from "../../modules/auth";

export interface AuthSlice {
  status: AuthStatus;
  loggedUser: LoggedUser | null;
  errorMessage: string;
}

const initialState: AuthSlice = {
  status: AuthStatus.CHECKING,
  loggedUser: null,
  errorMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    onChecking: (state) => {
      state.status = AuthStatus.CHECKING;
      state.loggedUser = null;
      state.errorMessage = "";
    },
    onSignIn: (state, action: PayloadAction<LoggedUser>) => {
      state.status = AuthStatus.AUTHENTICATED;
      state.errorMessage = '';
      state.loggedUser = action.payload;
    },
    onSignUp: (state, action: PayloadAction<LoggedUser>) => {
      state.status = AuthStatus.AUTHENTICATED;
      state.errorMessage = '';
      state.loggedUser = action.payload;
    },
    onLogOut: (state, action: PayloadAction<string>) => {
      state.status = AuthStatus.NOT_AUTHENTICATED;
      state.errorMessage = action.payload;
      state.loggedUser = null;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = '';
    },
  },
});

export const { onChecking, onSignIn, onSignUp, onLogOut } = authSlice.actions;
