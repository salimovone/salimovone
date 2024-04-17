"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Contact = () => {
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (event) => {
      const delta = event.deltaY;
      event.preventDefault();
      if (delta > 0) {
        router.push("/me");
      }
      if (delta < 0) {
        router.push("/");
      }
    };

    document.addEventListener("wheel", handleWheel);
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="h-screen w-full text-white flex justify-center items-center">
      <form className="max-w-[400px] w-full h-[400px] p-1 relative">
        <input
          type="text"
          className="w-full bg-transparent border border-[var(--main-color)] h-14 rounded-t-[30px] p-6"
          placeholder="Name"
          />
        <input
          type="email"
          className="w-full bg-transparent border border-[var(--main-color)] h-6 p-4 px-6 my-1"
          placeholder="Email"
        />
        <textarea
          type="text"
          className="w-full bg-transparent h-[296px] border border-[var(--main-color)] p-4 px-6 rounded-b-[30px]"
          placeholder="Message"
        />
        <input type="submit" value={"send"} className="absolute bottom-[2px] right-[4px] rounded-br-[30px] rounded-tl-[30px] bg-sky-600 px-12 py-2" />
      </form>
    </div>
  );
};

export default Contact;
