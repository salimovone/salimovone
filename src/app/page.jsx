"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (event) => {
      const delta = event.deltaY;
      event.preventDefault();
      if (delta > 0) {
        router.push("/contact");
      }
      if (delta < 0) {
        router.push("/qmark");
      }
    };

    document.addEventListener("wheel", handleWheel);
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="h-screen px-10 flex-col w-full text-white flex justify-center items-start">
      <div className="game_title">I Am a Web Developer</div>
      <p className="text-2xl">But <span className="text-[var(--main-color)]">Why?</span></p>
    </div>
  );
};

export default Home;
