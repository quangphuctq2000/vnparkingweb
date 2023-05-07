import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  User,
  updateProfile,
} from "firebase/auth";
import { auth } from "./vueFire";

const provider = new GoogleAuthProvider();
export function continueWithGoogle() {
  return signInWithPopup(auth, provider);
}

export function loginWithEmailPassword(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUpWithEmailPassword(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
