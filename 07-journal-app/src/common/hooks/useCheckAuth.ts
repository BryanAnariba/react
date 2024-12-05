import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { AuthStatus, login, logout } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { firebaseAuth } from "../firebase";
import { startLoadNotesFromFirestore } from "../../store/journal";

export const useCheckAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      // console.log(user);
      
      if (!user) return dispatch(logout({
        status: AuthStatus.NOT_AUTHENTICATED,
        uid: '',
        email: '',
        displayName: '',
        photoURL: '',
        errorMessage: '',
      }));

      dispatch(login({
        status: AuthStatus.AUTHENTICATED,
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName!,
        photoURL: user.photoURL!,
        errorMessage: '',
      }));

      dispatch(startLoadNotesFromFirestore());
    });
  }, []);

  return {
    status,
  }
}