"use client";
import React, { useState } from "react";
import SocialMedia from "@/components/SocialMedia";
import axios from "axios";

const botToken = "6037601781:AAESaw4N5lS0RDWfEBePNMuc-Zg2P8S6oTI";
const baseURL = `https://api.telegram.org/bot${botToken}`;
const sardor = 1179267491; //telegram chat_id

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const saveData = async () => {
    if (message)
      await axios
        .get(`${baseURL}/sendMessage`, {
          params: {
            chat_id: sardor,
            text: `${name}\n${email}\n${message}`,
          },
        })
        .catch(function (error) {
          console.clear();
          console.log(error);
        });
  };

  return (
    <div className="h-screen w-full text-white flex justify-center flex-col items-center">
      <form action="#" className="max-w-[400px] w-full h-[300px] p-1 relative">
        <input
          type="text"
          className="w-full bg-transparent border border-[var(--main-color)] h-14 rounded-t-[30px] p-6"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          className="w-full bg-transparent border border-[var(--main-color)] h-6 p-4 px-6 my-1"
          placeholder="Telegram username or email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <textarea
          type="text"
          className={`w-full bg-transparent h-[196px] border border-[var(--main-color)] p-4 px-6 rounded-b-[30px] bg-black text-[aqua]`}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          required
          maxLength={3950}
        />
        <input
          type="submit"
          value={"send"}
          className={
            "scroll absolute bottom-[2px] right-[4px] rounded-br-[30px] rounded-tl-[30px] bg-[var(--main-color)] px-12 py-2 "
          }
          onClick={saveData}
        />
      </form>
      <SocialMedia />
    </div>
  );
};

export default Contact;
