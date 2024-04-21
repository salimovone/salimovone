import React from 'react'
import { TbBrandTelegram } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";

const SocialMedia = () => {
  return (
    <div className="max-w-[400px] w-full mt-5 flex justify-center gap-2 p-1 border border-[var(--main-color)] rounded">
        <a
          href="https://www.instagram.com/sardor20.05/"
          className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white"
        >
          <IoLogoInstagram />
        </a>
        <a
          href="https://t.me/sardor2005"
          className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white"
        >
          <TbBrandTelegram />
        </a>
        <a
          href="https://github.com/salimovone/"
          className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/salimovone/"
          className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white"
        >
          <AiFillLinkedin />
        </a>
        <a
          href="mailto: salimovone@gmail.com"
          className="border text-[var(--main-color)] rounded-md h-10 w-10 flex justify-center items-center text-2xl border-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-white"
        >
          <HiOutlineMail />
        </a>
      </div>
  )
}

export default SocialMedia