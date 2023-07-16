import { auth } from "./Firebase"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { useState } from "react";

export default function Auth(){
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    console.log(auth?.currentUser?.email)
    const signin = async () => {
        await createUserWithEmailAndPassword(auth, email, pass)
    }
    const logout = async () => {
      await signOut(auth)
    }
  return (
    <>
        <label>Email: </label>
        <input type={'email'} onChange={(e)=>setEmail(e.target.value)}></input>
        <label>Password: </label>
        <input type={'password'} onChange={(e)=>setPass(e.target.value)}></input>
        <button onClick={signin}>sign in</button>
        <button onClick={logout}>log out</button>
    </>
  );
};
