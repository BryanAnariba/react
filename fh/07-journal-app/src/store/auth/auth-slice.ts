import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum AuthStatus {
  CHECKING='CHECKING',
  NOT_AUTHENTICATED='NOT_AUTHENTICATED',
  AUTHENTICATED='AUTHENTICATED',
}

export interface AuthInitialState {
  status: AuthStatus;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  errorMessage: string;
}

const authInitialState: AuthInitialState = { 
  status: AuthStatus.AUTHENTICATED,
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
  errorMessage: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    login: (state, action: PayloadAction<AuthInitialState>) => {
      state.status = action.payload.status;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.errorMessage = action.payload.errorMessage;
    },
    logout: (state, action: PayloadAction<AuthInitialState>) => {
      state.status = action.payload.status;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.errorMessage = action.payload.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = AuthStatus.CHECKING;
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;