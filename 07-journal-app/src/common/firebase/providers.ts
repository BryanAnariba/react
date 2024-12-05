import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";

// SI quieres usar firebase ite aqui
// https://console.firebase.google.com/u/0/?hl=es-419

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName, 
      email, 
      photoURL, 
      uid,
      errorMessage: '',
    };
  } catch (error: any) {
    console.error(`Sometime went wrong sign in with google: ${error}`);
    return {
      ok: false,
      displayName: '', 
      email: '', 
      photoURL: '', 
      uid: '',
      errorMessage: error.message
    };
  }
}

export const registerUserWithEmailPassword = async (email: string, password: string, displayName: string) => {
  try {
    const res = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const {uid, photoURL} = res.user;
    await updateProfile(firebaseAuth.currentUser!, {displayName: displayName});
    return {
      ok: true,
      displayName, 
      email, 
      photoURL, 
      uid,
      errorMessage: '',
    };
  } catch (error: any) {
    console.error(`Sometime went wrong sign in with google: ${error}`);
    return {
      ok: false,
      displayName: '', 
      email: '', 
      photoURL: '', 
      uid: '',
      errorMessage: error.message
    };
  }
}

export const loginUserWithEmailAndPassword = async (userEmail: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(firebaseAuth, `${userEmail}`, password);
    const {uid, email, displayName, photoURL} = res.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
      errorMessage: '',
    };
  } catch (error: any) {
    console.error(`Sometime went wrong sign in with google: ${error}`);
    return {
      ok: false,
      displayName: '', 
      email: '', 
      photoURL: '', 
      uid: '',
      errorMessage: error.message
    };
  }
}

export const logoutFirebase = async () => {
  return await firebaseAuth.signOut();
}