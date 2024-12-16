import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout, onSignUp, RootState } from "../store";
import { SignInRequest } from "../../modules/auth/interfaces";
import calendarApp from '../api/calendar-app.api';
import { AuthResponse, SignUpRequest } from '../../modules/auth/interfaces/auth.interface';
import { onLogoutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const startSignIn = async (signInForm: SignInRequest) => {
    // console.log('startSignIn: ', signInForm);
    try {
        dispatch(onChecking());
        const response = await calendarApp.post('/auth/sign-in', signInForm);
        const data: AuthResponse = response.data;    
        setTokenInLocalStorage(data.token);
        dispatch(onLogin(data));
    } catch (error: any) {
        dispatch(onLogout((error.response.data.message) ? `${error.response.data.message}` : 'Not valid credentials.'));
        setTimeout(() => {
            dispatch(clearErrorMessage());
        }, 5000);
        throw error;
    }
  };

  const startSignUp = async (signUpForm: SignUpRequest) => {
    console.log('startSignUp: ', signUpForm);
    try {
        dispatch(onChecking());
        const response = await calendarApp.post('/auth/sign-up', signUpForm);
        const data:AuthResponse = response.data;
        // console.log(response.data);   
        setTokenInLocalStorage(data.token);
        dispatch(onSignUp(data));
    } catch (error: any) {
        dispatch(onLogout((error.response.data.message) ? `${error.response.data.message}` : 'Not valid credentials.'));
        setTimeout(() => {
            dispatch(clearErrorMessage());
        }, 5000);
        throw error;
    }
  }

  const startCheckAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout(''));
    try {
      const response = await calendarApp.get('/auth/refresh-jwt');
      const data: AuthResponse = response.data;
      setTokenInLocalStorage(data.token);
      console.log('Veryfing jwt and refreshing: ', data);
      dispatch(onLogin(data));
    } catch (error: any) {
      dispatch(onLogout(''));
      // setTimeout(() => {
      //   dispatch(clearErrorMessage());
      // }, 5000);
      throw error;
    }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(''));
    dispatch(onLogoutCalendar());
  }

  const setTokenInLocalStorage = (token: string): void => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('token-init-date', new Date().getTime().toString());
  }

  return {
    status,
    user,
    errorMessage,
    startSignIn,
    startSignUp,
    startCheckAuthToken,
    startLogout,
  };
};
