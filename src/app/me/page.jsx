"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Me = () => {
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (event) => {
      const delta = event.deltaY;
      event.preventDefault();
      if (delta > 0) {
        router.push("/skills");
      }
      if (delta < 0) {
        router.push("/contact");
      }
    };

    document.addEventListener("wheel", handleWheel);
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="h-screen w-full text-white flex justify-center items-center">
      <div className="me_text jetbrains-mono text-[25px] max-md:text-[18px] max-md:px-6">
        <p className="mb-6">
          Hi, <br /> I am Salimov Sardor
        </p>
        <p className="mb-6">
          I always want to make programs to solve Technical problems because I
          love to Automate things.
        </p>
        <p className="mb-6">People say I'm a Quiet person when I am working on something.</p>
      </div>
    </div>
  );
};

export default Me;
