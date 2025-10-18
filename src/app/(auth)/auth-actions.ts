"use client";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export type UserProfile = {
  fullName?: string;
  phoneNumber?: string;
  vehicleType?: "car" | "bike";
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
};

export async function signupWithEmail(
  email: string,
  password: string,
  profile?: UserProfile
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    ...profile,
    createdAt: serverTimestamp(),
  });
  return cred;
}

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
