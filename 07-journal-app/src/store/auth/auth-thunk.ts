import { Dispatch } from "@reduxjs/toolkit";
import { AuthStatus, checkingCredentials, login, logout } from "./auth-slice";
import { loginUserWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../common";

export const chekingAuthentication = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout({
      status: AuthStatus.NOT_AUTHENTICATED,
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      errorMessage: `${result.errorMessage}`,
    }));

    return dispatch(login({
      status: (result.ok) ? AuthStatus.AUTHENTICATED : AuthStatus.NOT_AUTHENTICATED,
      uid: result.uid,
      email: result.email!,
      displayName: result.displayName!,
      photoURL: result.photoURL!,
      errorMessage: result.errorMessage,
    }));
  }
}

export const startCreatingUserWithEmailPassword = (email: string, password: string, displayName: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
    const firebaseResponse = await registerUserWithEmailPassword(email, password, displayName);
    if (!firebaseResponse.ok) return dispatch(logout({
      status: AuthStatus.NOT_AUTHENTICATED,
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      errorMessage: `${firebaseResponse.errorMessage}`,
    }));

    dispatch(login({
      status: (firebaseResponse.ok) ? AuthStatus.AUTHENTICATED : AuthStatus.NOT_AUTHENTICATED,
      uid: firebaseResponse.uid,
      email: firebaseResponse.email!,
      displayName: firebaseResponse.displayName!,
      photoURL: firebaseResponse.photoURL!,
      errorMessage: firebaseResponse.errorMessage,
    }))
  }
}

export const startLoggingWithEmailPassword = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(checkingCredentials());
    const firebaseResponse = await loginUserWithEmailAndPassword(email, password);
    if (!firebaseResponse.ok) return dispatch(logout({
      status: AuthStatus.NOT_AUTHENTICATED,
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      errorMessage: `${firebaseResponse.errorMessage}`,
    }));

    return dispatch(login({
      status: (firebaseResponse.ok) ? AuthStatus.AUTHENTICATED : AuthStatus.NOT_AUTHENTICATED,
      uid: firebaseResponse.uid,
      email: firebaseResponse.email!,
      displayName: firebaseResponse.displayName!,
      photoURL: firebaseResponse.photoURL!,
      errorMessage: firebaseResponse.errorMessage,
    }));
  }
}

export const startLogOut = () => {
  return async (dispatch: Dispatch) => {
    await logoutFirebase();
    return dispatch(logout({
      status: AuthStatus.NOT_AUTHENTICATED,
      uid: '',
      email: '',
      displayName: '',
      photoURL: '',
      errorMessage: '',
    }));
  }
}