"use client";
import React, { useState } from "react";
import SocialMedia from "@/components/SocialMedia";
// import app from "@/firebaseConfig";
// import { getDatabase, push, ref, set } from "firebase/database";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // const saveData = async () => {
  //   const db = getDatabase(app);
  //   const newDocRef = push(ref(db, "income/messages"));
  //   set(newDocRef, {
  //     name,
  //     email,
  //     message,
  //   })
  //     .then(() => {
  //       setEmail("");
  //       setName("");
  //       setMessage("");
  //       console.log("message sent");
  //     })
  //     .catch((error) => {
  //       console.error(error?.message);
  //     });
  // };

  return (
    <div className="h-screen w-full text-white flex justify-center flex-col items-center">
      <div className="max-w-[400px] w-full h-[300px] p-1 relative">
        <input
          type="text"
          className="w-full bg-transparent border border-[var(--main-color)] h-14 rounded-t-[30px] p-6"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          className="w-full bg-transparent border border-[var(--main-color)] h-6 p-4 px-6 my-1"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <textarea
          type="text"
          className={`w-full bg-transparent h-[196px] border border-[var(--main-color)] p-4 px-6 rounded-b-[30px] bg-black text-[aqua]`}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <input
          type="submit"
          value={"send"}
          className={
            "scroll absolute bottom-[2px] right-[4px] rounded-br-[30px] rounded-tl-[30px] bg-[var(--main-color)] px-12 py-2 "
          }
          // onClick={saveData}
        />
      </div>
      <SocialMedia />
    </div>
  );
};

export default Contact;
