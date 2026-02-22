// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDq2fl8XWB634t0CiZLtCuxb8OT5uZMHwM",
  authDomain: "lab06-expense-d6fab.firebaseapp.com",
  projectId: "lab06-expense-d6fab",
  storageBucket: "lab06-expense-d6fab.firebasestorage.app",
  messagingSenderId: "132277135541",
  appId: "1:132277135541:web:3126d50454cfafd571f6fc",
  measurementId: "G-V50QYVQPB5"
};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  ConfirmationResult,
  RecaptchaVerifier
} from "firebase/auth";

import {
  AuthUser,
  IAuthService,
  EmailPasswordCredentials,
  PhoneCredentials
} from "./auth-interface";

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

function mapUser(u: any): AuthUser {
  return {
    uid: u.uid,
    email: u.email,
    displayName: u.displayName,
    photoUrl: u.photoURL,
  };
}

let verifier: RecaptchaVerifier | null = null;
let confirmationResult: ConfirmationResult | null = null;

// div สำหรับ reCAPTCHA ในหน้า login ต้องมี id="recaptcha-container"
const recaptchaContainerId: string = "recaptcha-container";

export function getRecaptchaVerifier(
  containerId: string
): RecaptchaVerifier {
  if (!verifier) {
    verifier = new RecaptchaVerifier(
      firebaseAuth,
      containerId,
      {
        size: "invisible",
      }
    );
  }
  return verifier;
}

export class FirebaseWebAuthService implements IAuthService {
  async getCurrentUser() {
    return firebaseAuth.currentUser
      ? mapUser(firebaseAuth.currentUser)
      : null;
  }

  async loginWithEmailPassword(creds: EmailPasswordCredentials) {
    const r = await signInWithEmailAndPassword(
      firebaseAuth,
      creds.email,
      creds.password
    );
    return mapUser(r.user);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const r = await signInWithPopup(firebaseAuth, provider);
    return mapUser(r.user);
  }

  async logout() {
    await firebaseAuth.signOut();
  }

  async startPhoneLogin(
    creds: PhoneCredentials
  ): Promise<{ verificationId: string }> {
    const verifier = getRecaptchaVerifier(recaptchaContainerId);
    confirmationResult = await signInWithPhoneNumber(
      firebaseAuth,
      creds.phoneNumberE164,
      verifier
    );
    return { verificationId: confirmationResult.verificationId };
  }

  async confirmPhoneCode(payload: { verificationId: string; verificationCode: string }): Promise<AuthUser> {
    if (!confirmationResult) {
      throw new Error("No confirmation result");
    }
    const r = await confirmationResult.confirm(payload.verificationCode);
    return mapUser(r.user);
  }
}
