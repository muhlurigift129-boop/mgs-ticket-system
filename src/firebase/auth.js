import { auth } from "./config"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"

export async function registerUser(
  email,
  password
) {

  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

}

export async function loginUser(
  email,
  password
) {

  return signInWithEmailAndPassword(
    auth,
    email,
    password
  )

}

export async function logoutUser() {

  return signOut(auth)

}
