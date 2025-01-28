import { Dispatch } from "@reduxjs/toolkit";
import { onChecking, onLogOut, onSignIn, onSignUp } from "./auth.slice";
import inventoryApp from "../../modules/core/api/inventory-app.api";
import { AuthResponse, SignInForm, SignUpData } from '../../modules/auth/interfaces/auth.interface';
import { AxiosError } from "axios";

export const startCheckingAuthentication = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(onChecking());
  }
}

export const startSignIn = (signInForm: SignInForm) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(onChecking());
      const response = await inventoryApp.post('/auth/sign-in', signInForm);
      const data: AuthResponse = response.data;
      setTokenInLocalStorage(data.token);
      return dispatch(onSignIn({
          _id: data.user._id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        },
      ));
    } catch (error) {
      if (error instanceof AxiosError) return dispatch(onLogOut(`${error.response?.data.message}`));
      return dispatch(onLogOut(`${error}`));
    }
  }
}

export const startSignUp = (signUpForm: SignUpData) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(onChecking());
      const response = await inventoryApp.post('/auth/sign-up', signUpForm);
      const data: AuthResponse = response.data;
      setTokenInLocalStorage(data.token);
      return dispatch(onSignUp({
          _id: data.user._id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        },
      ));
    } catch (error) {
      if (error instanceof AxiosError) return dispatch(onLogOut(`${error.response?.data.message}`));
      return dispatch(onLogOut(`${error}`));
    }
  }
}

export const startRefreshToken = () => {
  return async (dispatch: Dispatch) => {
    dispatch(onChecking());
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogOut(''));
    try {
      const response = await inventoryApp.get('/auth/validate-jwt');
      const data: AuthResponse = response.data;
      setTokenInLocalStorage(data.token);
      console.log('Veryfing jwt and refreshing: ', data);
      return dispatch(onSignIn({
          _id: data.user._id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        },
      ));
    } catch (error) {
      // Si descomento esto lanzara el sweet alert con el mensaje de expiracion de token, por eso limpio el errorMessage
      // if (error instanceof AxiosError) return dispatch(onLogOut(`${error.response?.data.statusCode + ' - ' + error.response?.data.message}`));
      // dispatch(onLogOut(`${error}`));
      dispatch(onLogOut(``));
      throw error
    }
  }
}

export const startLoggout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(onLogOut(''));
    localStorage.clear();
  }
}

const setTokenInLocalStorage = (token: string): void => {
  localStorage.setItem('token', JSON.stringify(token));
}