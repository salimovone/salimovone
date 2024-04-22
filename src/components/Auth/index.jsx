import { SlSocialGoogle } from "react-icons/sl"; 
import React, { useState } from "react";
import {auth} from '@/firebaseConfig.js'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup} from "firebase/auth"

const Auth = ({func}) => {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [user, setUser] = useState({})

  
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        "salimovone@gmail.com", //email address from input value
        "I51135g7", // new password from input value
      )
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  }
  const login = async () => {
    try {
      const aboutUser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      // func(aboutUser)
    } catch (err) {
      console.log(err.message);
    }
  }
  const logout = async () => {
    await signOut(auth)
  }
  
  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser)
    // func(user?.email)
  })
  
  if(user?.email){
    func(user.email)
  }

  return (
    <div className="w-screen h-screen bg-black text-white absolute z-[999] top-0 left-0 flex justify-center items-center">
      <div className="max-w-[400px] w-full p-1 relative">
        <input
          type="email"
          className="w-full bg-transparent border border-[var(--main-color)] h-6 p-4 px-6 mt-1 rounded-[10px] mb-2"
          placeholder="Email"
          value={loginEmail}
          onChange={(e)=>{setLoginEmail(e.target.value)}}
        />
        <input
          type="password"
          className="w-full bg-transparent border border-[var(--main-color)] h-6 rounded-[10px] py-4 px-6"
          placeholder="Password"
          value={loginPassword}
          onChange={(e)=>setLoginPassword(e.target.value)}
        />
        <div className="flex w-full justify-between items-center my-4">
          <span className="text-[var(--main-color)] text-sm">
            Forgot Password
          </span>
          <input
            type="submit"
            value={"send"}
            className={"rounded-[30px] border border-[var(--main-color)] px-5 py-1 active:bg-[var(--main-color)]"}
            //   onClick={saveData}
            onClick={()=>login()}
          />
        </div>
        <button disabled className="w-full opacity-30 text-[var(--main-color)] border border-[var(--main-color)] rounded-[10px] flex items-center justify-between px-10 py-1">
            <span>sign in with google</span>
            <SlSocialGoogle />
        </button>
      </div>
    </div>
  );
};

export default Auth;
