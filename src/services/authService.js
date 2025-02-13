import { auth } from '../firebase/firebaseConfig';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

const handleError = (error) => {
  console.error(error.message);
  throw new Error(error.message);
};

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    handleError(error);
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    handleError(error);
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    handleError(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    handleError(error);
  }
};
