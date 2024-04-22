"use client";
import { FiArrowRightCircle } from "react-icons/fi";
import React, { useState } from "react";
import styles from "./controlPanel.module.css";
import { pages } from "./helper";
import Game from "@/components/control/Game";
import Auth from "@/components/Auth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const ControlPanel = () => {
  const [page, setPage] = useState(<Game />);
  const [active, setActive] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const logChange = (signedUser) => {
    setUser(signedUser);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return isLoggedIn ? (
    <div
      className={
        "text-white absolute z-[999] top-0 left-0 w-screen h-screen grid grid-cols-12 grid-rows-12 " +
        styles.main
      }
    >
      <div className="col-span-2 border-r h-screen border-[val(--main-color)] max-md:hidden">
        <ul className="w-full px-5 mt-4">
          {pages.map((item, index) => (
            <li
              key={index + 1}
              onClick={() => {
                setPage(item.element);
                setActive(index);
              }}
              className={`${styles.li} ${
                active === index && "border"
              } px-2 py-1 rounded active:border mb-2`}
            >
              <div className={"flex justify-between items-center "}>
                <span>{item.name}</span>
                <span>
                  <FiArrowRightCircle />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-b mt-5 col-span-12 h-fit border-[val(--main-color)] md:hidden row-span-1">
       

        <ul className="w-full px-5 grid grid-cols-3 gap-x-2">
          {pages.map((item, index) => (
            <li
              key={index + 1}
              onClick={() => {
                setPage(item.element);
                setActive(index);
              }}
              className={`${styles.li} ${
                active === index && "border"
              } px-2 py-1 rounded active:border mb-2`}
            >
              <div className={"flex justify-between items-center "}>
                <span>{item.name}</span>
                <span>
                  <FiArrowRightCircle />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* second area */}
      <div className="md:col-span-10 col-span-12 px-5 pt-3 max-md:mt-16 max-md:row-span-11">
        {page}
      </div>
    </div>
  ) : (
    <Auth func={logChange} />
  );
};

export default ControlPanel;
