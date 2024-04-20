"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./skills.module.css";

const Skills = () => {
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (event) => {
      const delta = event.deltaY;
      event.preventDefault();
      if (delta > 0) {
        router.push("/experience");
      }
      if (delta < 0) {
        router.push("/me");
      }
    };

    document.addEventListener("wheel", handleWheel);
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  let skills = [
    {
      id: 1,
      value: "salom1",
    },
    {
      id: 2,
      value: "salom2",
    },
    {
      id: 3,
      value: "salom3",
    },
    {
      id: 4,
      value: "salom4",
    },
    {
      id: 5,
      value: "salom5",
    },
    {
      id: 6,
      value: "salom6",
    },
    {
      id: 7,
      value: "salom7",
    },
    {
      id: 8,
      value: "salom8",
    },
    {
      id: 9,
      value: "salom9",
    },
    {
      id: 10,
      value: "salom10",
    },
  ];

  return (
    <div className="h-screen w-full text-white flex items-center px-5">
      <ul className={`${styles.ul}`}>
        {skills.map((item) => (
          <li key={item.id} className={`${styles.li}`}>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
