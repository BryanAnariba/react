import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus } from '../../../modules/auth/enums/auth-status.enum';

export interface AuthSlice {
  status: string,
  user: User | null;
  errorMessage: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
}

const initialState: AuthSlice = {
  status: AuthStatus.CHECKING,
  user: null,
  errorMessage: '',
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    onChecking: (state) => {
      state.status = AuthStatus.CHECKING;
      state.user = null;
      state.errorMessage = '';
    },
    onLogin: (state, action: PayloadAction<{token: string, user: User}>) => {
      state.status = AuthStatus.AUTHENTICATED;
      state.user = action.payload.user;
      state.errorMessage = '';
    },
    onSignUp: (state, action: PayloadAction<{token: string, user: User}>) => {
      state.status = AuthStatus.AUTHENTICATED;
      state.user = action.payload.user;
      state.errorMessage = '';
    },
    onLogout: (state, action: PayloadAction<string>) => {
      state.status = AuthStatus.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = '';
    },
  },
});

export const { onChecking, onLogin, onSignUp, onLogout, clearErrorMessage } = authSlice.actions;
