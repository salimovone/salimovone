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

  let experience = [
    {
      id: 1,
      name: "codemy",
      year: {
        begin: "2022",
        end: "now",
      },
      about:
        "Work as a Frond-End developer for a Company that provides smart sensors and cloud Camera Solutions.",
    },
    {
      id: 2,
      name: "test2",
      year: {
        begin: "2021",
        end: "2022",
      },
      about: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      name: "test3",
      year: {
        begin: "2020",
        end: "2021",
      },
      about:
        "Work as a Frond-End developer for a Company that provides smart sensors and cloud Camera Solutions.",
    },
  ];

  return (
    <div className="h-screen w-full text-white flex justify-center items-center">
      <div className="experience_text jetbrains-mono text-[25px] max-md:text-[18px] max-md:px-6">
        {experience.map((item) => (
          <div className="mb-6 font-bold" key={item.id}>
            {item.name}
            <span className="text-xs text-green-600"> [{item.year.begin} to {item.year.end}]</span>
            <p className="font-normal text-base text-slate-400">{item.about}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
