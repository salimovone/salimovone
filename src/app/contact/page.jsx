"use client";
import React from "react";
import styles from "./contact.module.css";
import { TbBrandTelegram } from "react-icons/tb"; 
import { IoLogoInstagram } from "react-icons/io";
import { FaGithub } from "react-icons/fa"; 
import { AiFillLinkedin } from "react-icons/ai"; 
import { HiOutlineMail } from "react-icons/hi"; 

const Contact = () => {
  return (
    <div className="h-screen w-full text-white flex justify-center flex-col items-center">
      <form className="max-w-[400px] w-full h-[300px] p-1 relative">
        <input
          type="text"
          className="w-full bg-transparent border border-[var(--main-color)] h-14 rounded-t-[30px] p-6"
          placeholder="Name"
        />
        <input
          type="email"
          className="w-full bg-transparent border border-[var(--main-color)] h-6 p-4 px-6 my-1"
          placeholder="Email"
          required
        />
        <textarea
          type="text"
          className={
            "w-full bg-transparent h-[196px] border border-[var(--main-color)] p-4 px-6 rounded-b-[30px] " +
            styles.textarea
          }
          placeholder="Message"
        />
        <input
          type="submit"
          value={"send"}
          className={
            "absolute bottom-[2px] right-[4px] rounded-br-[30px] rounded-tl-[30px] bg-sky-600 px-12 py-2 "
          }
        />
      </form>

      <div className="max-w-[400px] w-full mt-5 flex justify-center gap-2 p-1 border border-[var(--main-color)] rounded">
        <a href="https://www.instagram.com/sardor20.05/" className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white">
          <IoLogoInstagram />
        </a>
        <a href="https://t.me/sardor2005" className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white">
          <TbBrandTelegram />
        </a>
        <a href="https://github.com/salimovone/" className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/salimovone/" className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white">
          <AiFillLinkedin />
        </a>
        <a href="mailto: salimovone@gmail.com" className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white">
          <HiOutlineMail />
        </a>
      </div>
    </div>
  );
};

export default Contact;
