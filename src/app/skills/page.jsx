"use client";
import ProgressBar from "@/components/Progress";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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

  return (
    <div className="h-screen w-full text-white flex items-center px-5">
      <div className="w-full">
        <ProgressBar
          duration={5000}
          name={"HTML"}
          percent={80}
        />
        <ProgressBar
          duration={5000}
          name={"JS"}
          percent={90}
          color={"yellow"}
        />
      </div>
    </div>
  );
};

export default Skills;
