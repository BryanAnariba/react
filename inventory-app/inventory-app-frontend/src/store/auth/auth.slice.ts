import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStatus } from "../../modules/auth/enums";
import { LoggedUser } from "../../modules/auth/interfaces";

interface AuthSlice {
  authStatus: AuthStatus;
  loggedUser: LoggedUser | null;
  errorMessage: string;
}

const authSliceInitialState: AuthSlice = {
  authStatus: AuthStatus.CHECKING,
  loggedUser: null,
  errorMessage: '',
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: authSliceInitialState,
  reducers: {
    onChecking: (state: AuthSlice) => {
      state.authStatus = AuthStatus.CHECKING;
      state.loggedUser = null;
      state.errorMessage = '';
    },
    onSignIn: (state: AuthSlice, action: PayloadAction<LoggedUser>) => {
      state.authStatus = AuthStatus.AUTHENTICATED;
      state.errorMessage = '';
      state.loggedUser = action.payload;
    },
    onSignUp: (state: AuthSlice, action: PayloadAction<LoggedUser>) => {
      state.authStatus = AuthStatus.AUTHENTICATED;
      state.errorMessage = '';
      state.loggedUser = action.payload;
    },
    onLogOut: (state: AuthSlice, action: PayloadAction<string>) => {
      state.authStatus = AuthStatus.NOT_AUTHENTICATED;
      state.errorMessage = action.payload;
      state.loggedUser = null;
    },
    onClearErrorMessage: (state: AuthSlice) =>{
      state.errorMessage = '';
    },
  },
});

export const {
  onChecking,
  onSignIn,
  onSignUp,
  onLogOut,
  onClearErrorMessage,
} = authSlice.actions;