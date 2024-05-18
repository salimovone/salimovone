"use client";
import Loader from "@/components/Loader";
import app from "@/firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "data/experience");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setExperience(Object.values(snapshot?.val()));
      setLoading(false);
    } else {
      console.log("no data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="h-screen w-full text-white flex justify-center items-start mt-[250px]">
      <div className="experience_text scroll jetbrains-mono overflow-y-auto max-h-[80%] text-[25px] max-md:text-[18px] max-md:px-6">
        {experience.map((item, index) => (
          <div className="mb-6 font-bold" key={index}>
            {item?.name}
            <span className="text-xs text-green-600">
              {" "}
              [{item?.year?.begin} to {item?.year?.end}]
            </span>
            <p className="font-normal text-base text-slate-400">
              {item?.about}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
