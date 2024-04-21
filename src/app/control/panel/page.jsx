"use client";
import { FiArrowRightCircle } from "react-icons/fi";
import React, { useState } from "react";
import styles from "./controlPanel.module.css";
import { pages } from "./helper";
import Game from "@/components/control/Game";

const ControlPanel = () => {
  const [page, setPage] = useState(<Game />);
  const [active, setActive] = useState(0);
  return (
    <div
      className={
        "text-white absolute z-[999] top-0 left-0 w-screen h-screen grid grid-cols-12 " +
        styles.main
      }
    >
      <div className="col-span-2 border-r border-[val(--main-color)] max-md:hidden">
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

      {/* second area */}
      <div className="md:col-span-10 col-span-12 px-5 pt-3">{page}</div>
    </div>
  );
};

export default ControlPanel;
