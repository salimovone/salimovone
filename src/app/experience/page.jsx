"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Experience = () => {
  const router = useRouter();

  useEffect(() => {
    const handleWheel = (event) => {
      const delta = event.deltaY;
      event.preventDefault();
      if (delta > 0) {
        router.push("/qmark");
      }
      if (delta < 0) {
        router.push("/skills");
      }
    };

    document.addEventListener("wheel", handleWheel);
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="h-screen w-full text-white flex justify-center items-center">
      <div className="experience_text jetbrains-mono text-[25px] max-md:text-[18px] max-md:px-6">
        <p className="mb-6">
          Work as a Frond-End developer for a Company that provides smart
          sensors and cloud Camera Solutions. <span className="text-sm">[2021 to 2023]</span>
        </p>
      </div>
    </div>
  );
};

export default Experience;
